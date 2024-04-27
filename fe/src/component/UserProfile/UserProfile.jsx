import React, { useState, useEffect } from 'react';
import styles from './UserProfile.module.css';
import useAuthToken from '../../hooks/useAuthToken';
import { decodeToken } from 'react-jwt';
import useSession from '../../hooks/useSession';

function UserProfile() {
    const token = useAuthToken(); // Ottieni il token che contiene le informazioni dell'utente
    const decodedToken = decodeToken(token); // Decodifica il token per ottenere dettagli come firstName e lastName
    const userSession = useSession(); // Informazioni di sessione (potrebbe includere dati aggiuntivi)
    const [profileImage, setProfileImage] = useState('/assets/camel_logo.jpg');
    const [bannerImage, setBannerImage] = useState('/assets/banner_camel2.webp');
    const [userPosts, setUserPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const profileResponse = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/userProfile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (profileResponse.status === 403) {
                    throw new Error("Accesso negato: forse il token è scaduto o non valido.");
                }
                if (profileResponse.status === 404) {
                    throw new Error("Profilo utente non trovato.");
                }
                if (!profileResponse.ok) {
                    throw new Error(`Errore HTTP: ${profileResponse.status}`);
                }
                const profileData = await profileResponse.json();
                // Imposta i dati del profilo
            } catch (error) {
                console.error('Errore nel caricamento dei dati del profilo:', error.message);
            }
        };
    
        loadProfileData();
    }, [token]); // Aggiunge token come dipendenza per ricaricare i dati quando cambia
    
    useEffect(() => {
        // Carica i post dell'utente, se necessario
        // Questo codice è commentato per evitare interferenze durante il debugging
        /* const loadUserPosts = async () => {
            if (!decodedToken) {
                return;
            }
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/newpost?page=${page}&pageSize=${pageSize}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserPosts(data.newposts || []);
            }
        };

        loadUserPosts(); */
    }, [token, decodedToken, page, pageSize]); // Aggiunge le dipendenze necessarie

    const handleImageChange = async (e, setImage, fieldName) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append(fieldName, file);

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/updateProfileImages`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante il caricamento dell\'immagine');
            }

            const data = await response.json();
            setImage(data.imageUrl);
        } catch (error) {
            console.error('Errore durante l\'aggiornamento dell\'immagine:', error);
        }
    };

    const handleBannerImageChange = (e) => {
        handleImageChange(e, setBannerImage, 'bannerImage');
    };

    const handleProfileImageChange = (e) => {
        handleImageChange(e, setProfileImage, 'profileImage');
    };


    return (
        <div className={styles.userProfile}>
            <div className={styles.profileBanner}>
                <img src={bannerImage} alt="Banner" />
                <input type="file" onChange={(e) => handleBannerImageChange(e)} accept="image/*" />
            </div>
            <div className={styles.profileContent}>
                <div className={styles.profileSidebar}>
                    <img src={profileImage} alt="Profile" className="rounded-circle" />
                    <input type="file" onChange={(e) => handleProfileImageChange(e)} accept="image/*" />
                    <h1>{userSession.firstName} {userSession.lastName}</h1>
                    <p>Breve descrizione o biografia dell'utente.</p>
                </div>
                <div className={styles.profileMain}>
                    <h2>Ultimi Post</h2>
                    <div className={styles.posts}>
                        {userPosts.map((post) => (
                            <div key={post.id}> {/* Assicurati che post.id sia unico */}
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;




