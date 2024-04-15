import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import ErrorAlert from '../alerts/errorAlert';
import NewpostCard from '../NewPostCard/NewPostCard';
import useSession from '../../hooks/useSession';
import AddNewPostModal from '../AddPostModal/AddPostModal';
import { nanoid } from '@reduxjs/toolkit';
import styles from './MainContent.module.css';

const MainContent = () => {
    const session = JSON.parse(localStorage.getItem('auth'));
    const isAuthenticated = useSession();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [Newpost, setNewpost] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const onChangePageSize = (e) => {
        setPageSize(+e.target.value);
    };

    useEffect(() => {
    const getNewpost = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_BASE_URL}/newpost?page=${page}&pageSize=${pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        "authorization": session,
                    },
                }
            );
            const data = await response.json();
            // Assicurati che newposts sia un array
            if (Array.isArray(data.newposts)) {
                setNewpost(data.newposts);
            } else {
                console.error("Errore: newposts non è un array", data.newposts);
                setError("Errore: newposts non è un array");
            }
        } catch (e) {
            console.error("Errore durante la chiamata API:", e);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    getNewpost();
}, [page, pageSize, session]);


    return (
        <div className={`container pt-5 pb-5 ${styles.pageContainer}`}>
            <div className="row">
                <div className="col pb-4">
                    <select value={pageSize} onChange={onChangePageSize}>
                        <option value={4}>Quattro</option>
                        <option value={7}>Sette</option>
                        <option value={10}>Dieci</option>
                    </select>
                </div>
            </div>
            <div className="row">
                {isLoading && <LoadingIndicator />}
                {!isLoading && error && (
                    <ErrorAlert
                        message="Oops! Qualcosa è andato storto durante il caricamento dei dati"
                    />
                )}
{isAuthenticated && !isLoading && !error && (
    <>
        {Newpost.map((post) => {
            console.log('Dati utente:', post.Users); // Verifica i dati degli utenti
            console.log('Data di creazione:', post.createdAt); // Mostra la data di creazione
            console.log('Data di aggiornamento:', post.updatedAt); // Mostra la data di aggiornamento
            const formattedDate = new Date(post.createdAt).toLocaleDateString('it-IT');
            return (
                <div key={nanoid()} className={`col-12 col-md-6 col-lg-4 col-xl-3 mb-3 ${styles.cardWrapper}`}>
                    <div className={`card ${styles.card}`}> {/* Applica il CSS della card */}
                        <img src={post.cover} className={`card-img-top ${styles.cardImage}`} alt="Cover" /> {/* Immagine */}
                        <div className={`card-body ${styles.cardBody}`}>
                            <h2 className={`card-title ${styles.title}`}>{post.title}</h2> {/* Titolo */}
                            <p className={`card-text ${styles.description}`}>{post.description}</p> {/* Descrizione */}
                            <p className={`card-text ${styles.date}`}>Data di creazione: {formattedDate}</p> {/* Data di creazione */}
                        </div>
                        <div className={`card-footer ${styles.cardFooter}`}>
                            <p className={`text-success ${styles.username}`}>{post.firstName} {post.lastName || 'Not found'}</p> {/* Nome utente */}
                        </div>
                    </div>
                </div>
            );
        })}
    </>
)}


            </div>
            <div className="d-flex justify-content-between">
                <button onClick={() => setPage(prev => prev - 1)} className="btn btn-primary">
                    Precedente
                </button>
                <button onClick={() => setPage(prev => prev + 1)} className="btn btn-primary">
                    Successivo
                </button>
            </div>
            <AddNewPostModal />
        </div>
    );
};

export default MainContent;
