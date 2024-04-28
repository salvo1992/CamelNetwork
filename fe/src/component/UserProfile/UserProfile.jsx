import React, { useState, useEffect } from 'react';
import styles from './UserProfile.module.css';
import useAuthToken from '../../hooks/useAuthToken';  
import { decodeToken } from 'react-jwt';
import useSession from '../../hooks/useSession';
import axios from 'axios';


function UserProfile() {
    const [profileData, setProfileData] = useState({
        bannerImage: '/default_banner.jpg',  
        profileImage: '/default_profile.jpg', 
        firstName: 'Nome',
        lastName: 'Cognome',
        bio: 'Biografia non disponibile'
    });
    const [token, setToken] = useState('');
   


    useEffect(() => {
        const storedToken = localStorage.getItem('auth');
        if (storedToken) {
            const cleanedToken = storedToken.replace(/ /g, ''); 
            setToken(cleanedToken);
            console.log("Token recuperato e pulito dal localStorage:", cleanedToken);
        } else {
            console.error("Token non disponibile.");
        }
    }, []);

    useEffect(() => {
        if (!token) return; 

        const loadUserData = async () => {
            try {
                console.log("ID utente:", decodeToken(token).userId); // Aggiungi questo log per l'ID utente
                const profileResponse = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/userProfile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (profileResponse.ok) {
                    const data = await profileResponse.json();
                    console.log("Dati del profilo ricevuti:", data);
                    setProfileData({ ...profileData, ...data });
                } else {
                    console.log("Stato HTTP ricevuto da '/userProfile':", profileResponse.status);
                }
            } catch (error) {
                console.error('Errore nel caricamento dei dati del profilo:', error.message);
            }
        };

        loadUserData();
    }, [token]); 

    const handleImageChange = async (e, imageType) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append(imageType, file);

        try {
            console.log("ID utente:", profileData.id); // Log dell'ID utente
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/updateProfileImages`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Aggiungi il tipo di contenuto per la richiesta
                },
                body: JSON.stringify({
                    userId: profileData.id, // Includi l'ID utente
                    [imageType]: file // Includi l'immagine come file
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Errore durante l aggiornamento dell immagine');
            }

            const updatedData = await response.json();
            setProfileData({ ...profileData, ...updatedData });
        } catch (error) {
            console.error('Errore durante l aggiornamento dell immagine:', error);
        }
    };

    return (
        <div className={styles.userProfile}>
            <div className={styles.profileBanner}>
                <img src={profileData.bannerImage} alt="Banner" />
                <input type="file" onChange={(e) => handleImageChange(e, 'bannerImage')} accept="image/*" />
            </div>
            <div className={styles.profileContent}>
                <div className={styles.profileSidebar}>
                    <img src={profileData.profileImage} alt="Profile" className="rounded-circle" />
                    <input type="file" onChange={(e) => handleImageChange(e, 'profileImage')} accept="image/*" />
                    <h1>{profileData.firstName} {profileData.lastName}</h1>
                    <p>{profileData.bio}</p>
                </div>
                <div className={styles.profileMain}>
                    <h2>Ultimi Post</h2>
                    {/* Componente o codice per visualizzare i post dell'utente, se presenti */}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;

