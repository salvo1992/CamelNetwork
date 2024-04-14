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

    const next = () => {
        setPage((prev) => prev + 1);
    };

    const prev = () => {
        setPage((prev) => prev - 1);
    };

    const getNewpost = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/Newpost?page=${page}&pageSize=${pageSize}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        "authorization": session,
                    },
                }
            );
            const data = await response.json();
            setNewpost(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getNewpost();
    }, [page, pageSize]);

    return (
        <div className={`container pt-5 pb-5 ${styles.pageContainer}`}>
            <div className="row">
                <div className="col pb-4">
                <select value={pageSize} onChange={onChangePageSize}>
                   <option value={4}>Quattro</option>
                   <option value={7}>Sette</option>
                   <option value={10}>Dieci</option> {/* Rimuovi selected */}
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
                    Newpost.Newpost &&
                    Newpost.Newpost.map((Newpost) => (
                        <div key={nanoid()} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                            <NewpostCard
                                title={Newpost.title}
                                description={Newpost.description}
                                cover={Newpost.cover}
                                Users={Newpost.Users.firstName || 'not found'}
                                isFeatured={Newpost.isFeatured}
                                pubDate={Newpost.pubDate}
                            />
                        </div>
                    ))
                )}
            </div>
            <div className="d-flex justify-content-between">
                <button onClick={prev} className="btn btn-primary">
                    Precedente
                </button>
                <button onClick={next} className="btn btn-primary">
                    Successivo
                </button>
            </div>
            <AddNewPostModal />
        </div>
    );
};

export default MainContent;
