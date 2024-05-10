import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import styles from './UserProfile.module.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const defaultBanner = `/assets/banner_camel2.webp`;
    const defaultUserImage = `/assets/camelutente.png`;

    const [bio, setBio] = useState('');
    const [userBio, setUserBio] = useState('');
    const [bannerImage, setBannerImage] = useState(defaultBanner);
    const [userImage, setUserImage] = useState(defaultUserImage);
    const [userPhotos, setUserPhotos] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('auth');
        if (storedToken) {
            setToken(JSON.parse(storedToken));
        }
        fetchBio();
        fetchUserPhotos();
    }, []);

    const handleImageUpload = async (file, type) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_preset_here'); // Set this to your Cloudinary preset

        const urlMap = {
            'banner': `${process.env.REACT_APP_CLOUDINARY_URL}/banner`,
            'profile': `${process.env.REACT_APP_CLOUDINARY_URL}/profile`,
            'photo': `${process.env.REACT_APP_CLOUDINARY_URL}/photo/cloudUploadImg`
        };

        try {
            const response = await axios.post(urlMap[type], formData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data.url; // Assuming API returns the URL of the uploaded image
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
        }
    };

    const handleImageChange = (type) => async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = await handleImageUpload(file, type);
            if (type === 'banner') setBannerImage(imageUrl);
            else if (type === 'profile') setUserImage(imageUrl);
            else fetchUserPhotos(); // Re-fetch photos if a new photo was uploaded
        }
    };

    const fetchBio = async (userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/bio/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUserBio(response.data.bio);
        } catch (error) {
            console.error("Error fetching bio:", error);
        }
    };
    

    const submitBio = async () => {
        console.log(token); // Good for debugging
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/bio/create`, { userId: "yourUserId", text: bio }, { // Ensure you have a valid userId here
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserBio(bio); // Update local state
            fetchBio("yourUserId"); // Again, ensure you pass the correct userId
        } catch (error) {
            console.error("Error submitting bio:", error);
        }
    };
    const editBio = async (userId, newBio) => {
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/bio/${userId}`, { bio: newBio }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUserBio(newBio); // Update local state
        } catch (error) {
            console.error("Error updating bio:", error);
        }
    };
    const fetchUserPhotos = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_CLOUDINARY_URL}/photo`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUserPhotos(response.data.photos);
        } catch (error) {
            console.error("Error fetching user photos:", error);
        }
    };

 return (
        <div className={styles.container}>
            <h1 className={styles.title}>Camel Network User Profile</h1>
            <div className={styles.banner} style={{ backgroundImage: `url(${bannerImage})` }}>
                <label className={styles.imageUploader}>
                    <input type="file" onChange={handleImageChange('banner')} className={styles.imageInput} />
                    <span>Change Banner</span>
                </label>
                <label className={styles.userLogo} style={{ backgroundImage: `url(${userImage})` }}>
                    <input type="file" onChange={handleImageChange('profile')} className={styles.imageInput} />
                    <span>Change Profile Image</span>
                </label>
            </div>
            <div className={styles.bioInputArea}>
                <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write your biography here..." className={styles.bioInput} />
                <button onClick={submitBio} className={styles.submitBioButton}>
                    <i className="fas fa-upload"></i> Submit Bio
                </button>
                {userBio && <div className={styles.userBio}>{userBio}</div>}
            </div>
            <div className={styles.photoGallery}>
                <h2 className={styles.galleryTitle}>Photos</h2>
                <div className={styles.photosContainer}>
                    {userPhotos.map(photo => (
                        <img key={photo.id} src={photo.url} alt="User Photo" className={styles.photo} />
                    ))}
                </div>
                <div>
                    <label>
                        <input type="file" onChange={handleImageChange('photo')} />
                        <button>Add Photo</button>
                    </label>
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
        </div>
    );
};

export default UserProfile;
