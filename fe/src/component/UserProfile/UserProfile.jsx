import React, { useState, useEffect } from 'react';
import styles from './UserProfile.module.css';
import useAuthToken from '../../hooks/useAuthToken';
import { decodeToken } from 'react-jwt';
import useSession from '../../hooks/useSession';

function UserProfile() {
    const token = useAuthToken();
    const decodedToken = decodeToken(token);
    const userSession = useSession();
    const [profileImage, setProfileImage] = useState('/assets/camel logo.jpg');
    const [bannerImage, setBannerImage] = useState('/assets/banner camel2.webp');
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        // Load profile data and user posts
    }, [token, decodedToken, profileImage, bannerImage]);

    const handleImageChange = async (e, setImage) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
    
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/updateProfileImages`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`, // Assicurati che il token sia incluso correttamente
                },
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                setImage(data.imageUrl);
            } else {
                throw new Error(data.message || 'Errore durante il caricamento dell\'immagine');
            }
        } catch (error) {
            console.error('Errore durante l\'aggiornamento dell\'immagine:', error);
        }
    };

    const handleBannerImageChange = (e) => handleImageChange(e, setBannerImage);
    const handleProfileImageChange = (e) => handleImageChange(e, setProfileImage);

    return (
        <div className={styles.userProfile}>
            <div className={styles.profileBanner}>
                <img src={bannerImage} alt="Banner" />
                <input type="file" onChange={handleBannerImageChange} accept="image/*" />
            </div>
            <div className={styles.profileContent}>
                <div className={styles.profileSidebar}>
                    <div className={styles.profileImage}>
                        <img src={profileImage} alt="Profile" className="rounded-circle" />
                        <input type="file" onChange={handleProfileImageChange} accept="image/*" />
                    </div>
                    <h1>{userSession.firstName} {userSession.lastName}</h1>
                    <p>Breve descrizione o biografia dell'utente.</p>
                    <div className={styles.socialLinks}>
                        <a href="https://twitter.com/" className={styles.socialLink}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1DA1F2" viewBox="0 0 16 16">
                                ...
                            </svg>
                        </a>
                    </div>
                </div>
                <div className={styles.profileMain}>
                    <h2>Ultimi Post</h2>
                    <div className={styles.posts}>
                        {userPosts.map((post) => (
                            <div key={post.id}>
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


