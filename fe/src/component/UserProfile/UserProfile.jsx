import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import styles from './UserProfile.module.css';

const UserProfile = () => {
    const [bio, setBio] = useState('');
    const [userBio, setUserBio] = useState('');
    const [bannerImage, setBannerImage] = useState('/fe/public/assets/banner camel2.webp'); // Placeholder for default image
    const [userImage, setUserImage] = useState('/fe/public/assets/camel_network_logo.png'); // Placeholder for default user image

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const submitBio = () => {
        setUserBio(bio);
    };

    const handleBannerChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setBannerImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUserImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUserImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <h1>Camel network 
                User Profile
                </h1>
            <div className={styles.banner} style={{ backgroundImage: `url(${bannerImage})` }}>
                <label className={styles.imageUploader}>
                    <input type="file" onChange={handleBannerChange} className={styles.imageInput} />
                    <span></span>
                </label>
                <label className={styles.userLogo} style={{ backgroundImage: `url(${userImage})` }}>
                    <input type="file" onChange={handleUserImageChange} className={styles.imageInput} />
                    <span className={styles.changePhoto}></span>
                </label>
            </div>
            <div className={styles.bioInputArea}>
                <input type="text" value={bio} onChange={handleBioChange} placeholder="Write your biography here..." />
                <button onClick={submitBio}>Submit Bio</button>
            </div>
            {userBio && <div className={styles.userBio}>{userBio}</div>}
            <div className={styles.photoGallery}>
                <p>Photos</p>
                {/* Placeholder for photo upload and display logic */}
            </div>
            <div className={styles.iconTray}>
                <span>👤</span> {/* Additional user icon as requested */}
                <span>👥</span>
                <span>🎨</span>
                <span>💬</span>
                <span>⚙️</span>
                <span>🚪</span>
                <span>👣</span>
                <span>🔔</span>
                <span>✏️</span>
            </div>
        </div>
    );
};


export default UserProfile;
