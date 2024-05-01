import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import styles from './UserProfile.module.css';

function UserProfile() {
    const [token, setToken] = useState('');
    const [profileFile, setProfileFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [profileData, setProfileData] = useState({
        email:'email',
        bannerImage: '/banner',
        profileImage: '/profileimage',
        firstName: 'Nome',
        lastName: 'Cognome',
        bio: 'Biografia non disponibile'
    });
    useEffect(() => {
        const storedToken = localStorage.getItem('auth');
        if (storedToken) {
            const decoded = JSON.parse(storedToken);
            setToken(decoded);
            console.log("Token recuperato dal localStorage:", decoded);
        }
    }, []);

    const onChangeHandleBannerFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerFile(file); // Aggiorna il file del banner
        }
    };

    const onChangeHandleProfileFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileFile(file); // Aggiorna il file del profilo
        }
    };


    const uploadFile = async (file, fileType) => {
        const fileData = new FormData();
        fileData.append('uploadImg', file);
        const decodedToken = decodeToken(token); // Decodifica il token per ottenere le informazioni
        if (decodedToken) {
            fileData.append('firstName', decodedToken.firstName);
            fileData.append('lastName', decodedToken.lastName);
            fileData.append('email', decodedToken.email);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/UserProfile/cloudUploadImg`, {
                method: 'POST',
                body: fileData,
                headers: {
                    'Authorization': token
                }
            });
            const result = await response.json();
            console.log(`Risposta dall'upload del file ${fileType}:`, result);
            return result.source;
        } catch (e) {
            console.log(e.message);
            return null;
        }
    };
    useEffect(() => {
        const uploadBanner = async () => {
            if (bannerFile) {
                const uploadedBannerUrl = await uploadFile(bannerFile, 'banner');
                if (uploadedBannerUrl) {
                    setProfileData(prevState => ({
                        ...prevState,
                        bannerImage: uploadedBannerUrl
                    }));
                }
            }
        };

        const uploadProfile = async () => {
            if (profileFile) {
                const uploadedProfileUrl = await uploadFile(profileFile, 'profile');
                if (uploadedProfileUrl) {
                    setProfileData(prevState => ({
                        ...prevState,
                        profileImage: uploadedProfileUrl
                    }));
                    submitUserProfile(); // Assumi che vuoi ancora inviare dopo il caricamento del profilo
                }
            }
        };

        uploadBanner();
        uploadProfile();
    }, [bannerFile, profileFile]); // Assicurati di rimuovere token da questa lista di dipendenze

   

    const submitUserProfile = async () => {
     
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('email', profileData.email); // Assumi che il token decodificato contenga email
            formDataToSend.append('firstName', profileData.firstName);
            formDataToSend.append('lastName', profileData.lastName);
            formDataToSend.append('profileImage', profileData.profileImage);
            formDataToSend.append('bannerImage', profileData.bannerImage);
            formDataToSend.append('biography', profileData.bio);
                
   // Qui possiamo visualizzare i valori inviati, ma FormData non è direttamente visualizzabile
   for (let pair of formDataToSend.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
}

            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/UserProfile/create`, {
                
                method: 'POST',
                headers: {
                   
                    'Authorization': token
                },
                body: formDataToSend,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log("Profilo creato con successo", responseData);
            } else {
                console.log("Errore durante la creazione del post:", response.statusText);
            }
        } catch (e) {
            console.log("Errore durante la creazione del post:", e.message);
        }
    };

    useEffect(() => {
        if (token) {
            axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/UserProfile`, {
                headers: {
                    'Authorization': `Bearer ${token}` }
            }).then(response => {
                if (response.status === 200) {
                    console.log("Dati del profilo ricevuti:", response.data);
                    setProfileData(prevState => ({ ...prevState, ...response.data }));
                } else {
                    console.log("Errore nel recupero dei dati utente. Stato HTTP:", response.status);
                }
            }).catch(error => {
                console.error('Errore nel recupero dei dati utente:', error.message);
            });
        }
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
