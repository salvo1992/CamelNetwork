import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import styles from './UserProfile.module.css';
import { Link } from 'react-router-dom';
const UserProfile = () => {
    const defaultBanner = `/assets/banner_camel2.webp`; // Percorso corretto con la root del progetto
const defaultUserImage = `/assets/camelutente.png`; // Percorso corretto con la root del progetto

    const [bio, setBio] = useState('');
    const [userBio, setUserBio] = useState('');
    const [bannerImage, setBannerImage] = useState(defaultBanner); // Utilizzo l'immagine predefinita
    const [userImage, setUserImage] = useState(defaultUserImage); // Utilizzo l'immagine predefinita
    const [userPhotos, setUserPhotos] = useState([]);  // Stato per le foto dell'utente

    useEffect(() => {
        // Simuliamo il recupero delle foto dell'utente da un server
        const fetchUserPhotos = async () => {
            try {
                const response = await axios.get('/api/user/photos');  // Aggiorna con il tuo endpoint API
                setUserPhotos(response.data.photos);
            } catch (error) {
                console.error("Errore nel recupero delle foto dell'utente:", error);
            }
        };

        fetchUserPhotos();
    }, []);


    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const submitBio = () => {
        setUserBio(bio);
    };

    const handleImageChange = (setImage) => (event) => {
        const file = event.target.files[0];
        if (file) { // Verifica che un file sia stato selezionato
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Camel Network User Profile</h1>
            <div className={styles.banner}style={{ backgroundImage: `url(${bannerImage})` }}>
    {/* Input per cambiare il banner */}
    <label className={styles.imageUploader}>
        <input type="file" onChange={handleImageChange(setBannerImage)} className={styles.imageInput} />
        <span>Change Banner</span>
    </label>
    {/* Input per cambiare l'immagine utente */}
    <label className={styles.userLogo} style={{ backgroundImage: `url(${userImage})` }}>
        <input type="file" onChange={handleImageChange(setUserImage)} className={styles.imageInput} />
        <span className={styles.changePhoto}></span>
    </label>
</div>

<div className={styles.bioInputArea}>
    <input
        type="text"
        value={bio}
        onChange={handleBioChange}
        placeholder="Write your biography here..."
        className={styles.bioInput}
    />
    <button onClick={submitBio} className={styles.submitBioButton}>
        <i className="fas fa-upload"></i> Submit Bio
    </button>
</div>
            {userBio && <div className={styles.userBio}>{userBio}</div>}
            
<div className={styles.photoGallery}>
    <h2 className={styles.galleryTitle}>Photos</h2>
    <div className={styles.photosContainer}>
        {userPhotos.map(photo => (
            <img key={photo.id} src={photo.url} alt="User Photo" className={styles.photo} />
        ))}
    </div>
</div>

            <div className={styles.iconTray}>
            <Link to="/Userprofile"><span className="fas fa-user"></span></Link> {/* Icona utente */}
    <Link to="/Camelfriend"><span className="fas fa-users"></span></Link> {/* Icona gruppo utenti */}
    <Link to="/Camelartist"><span className="fas fa-paint-brush"></span></Link> {/* Icona pittura */}
    <Link to="/Camelchat"><span className="fas fa-comments"></span></Link> {/* Icona chat */}
    <Link to="/settings"><span className="fas fa-cog"></span></Link> {/* Icona ingranaggio */}
    <Link to="/#"><span className="fas fa-door-open"></span></Link> {/* Icona porta */}
    <Link to="/walk"><span className="fas fa-walking"></span></Link> {/* Icona passi */}
    <Link to="/notificationsSettings"><span className="fas fa-bell"></span></Link> {/* Icona campanello */}
    <Link to="/CamelMusic"><span className="fas fa-music"></span></Link> {/* Icona matita */}
 
            </div>
        </div>
    );
};

export default UserProfile;
