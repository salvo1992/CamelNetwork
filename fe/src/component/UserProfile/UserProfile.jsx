import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import styles from './UserProfile.module.css';

function UserProfile() {
    const [formData, setFormData] = useState({});
    const [token, setToken] = useState('');
    const [profileFile, setProfileFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [profileData, setProfileData] = useState({
        bannerImage: '/default_banner.jpg',
        profileImage: '/default_profile.jpg',
        firstName: 'Nome',
        lastName: 'Cognome',
        bio: 'Biografia non disponibile'
    });

    useEffect(() => {
        const storedToken = localStorage.getItem('auth');
        if (storedToken) {
            setToken(JSON.parse(storedToken));
            console.log("Token recuperato dal localStorage:", JSON.parse(storedToken));
        }
    }, []);

    const onChangeHandleBannerFile = async (e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setBannerFile(selectedFile); // Aggiorna il file del banner
        }
    };

    const onChangeHandleProfileFile = async (e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setProfileFile(selectedFile); // Aggiorna il file del profilo
        }
    };

    const uploadFile = async (file, fileType) => {
        const fileData = new FormData();
        fileData.append('uploadImg', file);
        fileData.append('firstname', token.firstName); // Aggiungi firstName al FormData
        fileData.append('lastname', token.lastName); // Aggiungi lastName al FormData

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/UserProfile/cloudUploadImg`, {
                method: 'POST',
                body: fileData,
                headers: {
                    'Authorization': token
                }
            });
            console.log(`Risposta dall'upload del file ${fileType}:`, response);
            return await response.json();
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        const uploadFiles = async () => {
            if (bannerFile) {
                const uploadedBanner = await uploadFile(bannerFile, 'banner');
                console.log("Banner caricato:", uploadedBanner);
                setProfileData(prevState => ({
                    ...prevState,
                    bannerImage: uploadedBanner.source
                }));
            }

            if (profileFile) {
                const uploadedProfile = await uploadFile(profileFile, 'profile');
                console.log("Profile caricato:", uploadedProfile);
                setProfileData(prevState => ({
                    ...prevState,
                    profileImage: uploadedProfile.source
                }));

                // Aggiungi una chiamata a submitUserProfile qui
                submitUserProfile();
            }
        };
        uploadFiles();
    }, [bannerFile, profileFile, token]);

    const submitUserProfile = async () => {
        try {
            const currentDate = new Date().toISOString().slice(0, 16);
            const decodedToken = decodeToken(token); // Decodifica il token per ottenere le informazioni
            const { email, firstName, lastName } = decodedToken; // Estrai le informazioni necessarie dal token
            const formDataToSend = new FormData();
            formDataToSend.append('pubDate', currentDate);
            formDataToSend.append('email', email);
            formDataToSend.append('imageType', 'profile');
            formDataToSend.append('firstName', firstName);
            formDataToSend.append('lastName', lastName);
            formDataToSend.append('profileImage', profileData.profileImage);
            formDataToSend.append('bannerImage', profileData.bannerImage);
    
            console.log("Dati del formData da inviare al server:", formDataToSend);
    
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/UserProfile/create`, {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body: formDataToSend,
            });
    
            console.log("Risposta dalla creazione del post:", response);
    
            if (response.ok) {
                const responseData = await response.json();
                // Gestisci la risposta come necessario
            } else {
                console.log("Errore durante la creazione del post:", response.statusText);
                // Gestisci gli errori di rete o del server
            }
        } catch (e) {
            console.log("Errore durante la creazione del post:", e.message);
            // Gestisci altri tipi di errori
        }
    };
    
    
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/UserProfile`);
                if (response.status === 200) {
                    console.log("Dati del profilo ricevuti:", response.data);
                    setProfileData(prevState => ({ ...prevState, ...response.data }));
                } else {
                    console.log("Errore nel recupero dei dati utente. Stato HTTP:", response.status);
                }
            } catch (error) {
                console.error('Errore nel recupero dei dati utente:', error.message);
            }
        };

        fetchUserData();
    }, [token]);

    return (
        <div className={styles.userProfile}>
            <div className={styles.profileBanner}>
            {profileData.bannerImage && <img src={profileData.bannerImage} alt="Banner" />}
                <input type="file" onChange={onChangeHandleBannerFile} accept="image/*" />
            </div>
            <div className={styles.profileContent}>
                <div className={styles.profileSidebar}>
                {profileData.profileImage && <img src={profileData.profileImage} alt="Profile" className="rounded-circle" />}
                    <input type="file" onChange={onChangeHandleProfileFile} accept="image/*" />
                    <h1>{profileData.firstName} {profileData.lastName}</h1>
                    <p>{profileData.bio}</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
