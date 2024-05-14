import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UserProfile.module.css';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const UserProfile = () => {
    const defaultBanner = `/assets/banner_camel2.webp`;
    const defaultUserImage = `/assets/camelutente.png`;

    const [Bio, setBio] = useState('');
    const [userBio, setUserBio] = useState('');
    const [BannerImages, setBannerImage] = useState(defaultBanner);
    const [UserProfileImage, setUserProfileImage] = useState(defaultUserImage);
    const [userPhotos, setUserPhotos] = useState([]);
    const [token, setToken] = useState('');
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
   
    useEffect(() => {
        const storedToken = localStorage.getItem('auth');
        if (storedToken) {
            // Decodifica del token per verificare la validità
            const decodedToken = jwtDecode(storedToken);
            setToken(storedToken);  // Imposta il token originale decodificato nello stato

            // Usa direttamente il token per fare chiamate API
            fetchBio(storedToken);
            fetchUserPhotos();
            fetchLatestBannerImage(); 
            fetchLatestUserProfileImage();
        }
    }, []);
    const handleFileUpload = async (type, event) => {
        const file = event.target.files[0];
        if (type === 'banner') {
            await uploadBannerImage(file);
        } else if (type === 'profile') {
            await uploadProfileImage(file);
        }
    };

    

    const fetchLatestUserProfileImage = async () => {
        try {
      
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/UserProfile/latest`);
            const data = await response.json();
            if (response.ok) {
                console.log("Immagine trovata:", data.payload);
                setUserProfileImage(data.payload); // Assume che il server restituisca un URL dell'immagine
            } else {
                throw new Error(data.message || "Si è verificato un errore durante il recupero dell'immagine");
            }
        } catch (error) {
            console.error("Errore nel recupero dell'immagine:", error.message);
        }
    };
    
    const uploadProfileImage = async (file,token) => {
        console.log("Starting uploadProfileImage function");
        const fileData = new FormData();
        fileData.append('uploadImg', file);
    
        console.log("FormData prepared");
    for (let [key, value] of fileData.entries()) {
        console.log(`${key}:`, value);
    }
    
        try {
            console.log("Sending POST request to:", `${process.env.REACT_APP_SERVER_BASE_URL}/UserProfile/cloudUploadImg`);
            console.log("Authorization token:", token);
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/UserProfile/cloudUploadImg`, {
                method: 'POST',
                body: fileData,
                headers: {
                    'Authorization': token
                }
            });
    
            console.log("Response received:", response);
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Response JSON parsed:", data);
            return data;
        } catch (e) {
            console.error("Error uploading profile image:", e.message);
            return null;
        }
    };
    
    
   

   
   //banner
   const fetchLatestBannerImage = async () => {
    try {
      
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/BannerImages/latest`);
        const data = await response.json();
        if (response.ok) {
            console.log("Immagine trovata:", data.payload);
            setBannerImage(data.payload); // Assume che il server restituisca un URL dell'immagine
        } else {
            throw new Error(data.message || "Si è verificato un errore durante il recupero dell'immagine banner");
        }
    } catch (error) {
        console.error("Errore nel recupero dell'immagine banner:", error.message);
    }
};




const uploadBannerImage = async (file, token) => {
    console.log("Starting uploadBannerImage function");
    const fileData = new FormData();
    fileData.append('uploadImg', file);

    console.log("FormData prepared");
    for (let [key, value] of fileData.entries()) {
        console.log(`${key}:`, value);
    }

    try {
        console.log("Sending POST request to:", `${process.env.REACT_APP_SERVER_BASE_URL}/BannerImages/cloudUploadImg`);
        console.log("Authorization token:", token);
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/BannerImages/cloudUploadImg`, {
            method: 'POST',
            body: fileData,
            headers: {
                'Authorization': token
            }
        });

        console.log("Response received:", response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response JSON parsed:", data);
        return data;
    } catch (e) {
        console.error("Error uploading banner image:", e.message);
        return null;
    }
};
  

// Fetch bio
const fetchBio = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/bio`, );
        setUserBio(response.data.Bio);  // Assicurati di accedere a 'Bio' se questo è il formato di risposta
    } catch (error) {
        console.error("Error fetching bio:", error);
    }
};



// Submit bio
const handleBioChange = (event) => {
    setBio(event.target.value);
};

const submitBio = async (e) => {
    e.preventDefault(); // Previene il comportamento di default del form submission
console.log(Bio);
    try {
         await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/bio/create`, { 
              Bio,
              
          });
        // Aggiunto per vedere la risposta del server
        // Pulisci l'input dopo un invio riuscito
        setBio(''); 
    } catch (error) {
        console.error("Errore nell'invio del bio:", error.response ? error.response.data : error);
    }
};


// Edit bio
const editBio = async (newBio, e) => {
    try {
         await axios.put(`${process.env.REACT_APP_SERVER_BASE_URL}/bio`, { bio: newBio }, {
           Bio,
        });
        setUserBio(newBio); // Aggiorna lo stato locale
    } catch (error) {
        console.error("Error updating bio:", error);
    }
};
const PhotoGallery = ({ UserPhotos, DeletePhoto, onChangeHandleFile, submitnewphoto }) => {}
const fetchUserPhotos = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/photo`, {
            headers: {
                'Authorization': token  // Assicurati di includere il token di autenticazione se necessario
            }
        });
        const data = await response.json();
        if (response.ok) {
            setUserPhotos(data.payload);  // Assumi che il server restituisca un oggetto con una chiave 'payload'
        } else {
            throw new Error(data.message || "An error occurred while fetching photos");
        }
    } catch (error) {
        console.error("Error fetching user photos:", error.message);
    }
};


    const onChangeHandleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const onChangeHandleInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const uploadFile = async () => {
        const fileData = new FormData();
        fileData.append('uploadImg', file);  // Assicurati che 'uploadImg' sia il nome atteso dal server
    
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/photo/cloudUploadImg`, {
                method: 'POST',
                body: fileData,
                headers: {
                    'Authorization': token  // Assicurati che 'token' sia correttamente definito
                }
            });
            console.log("Risposta dall'upload:", response);
            const data = await response.json(); // Salviamo i dati in una variabile
            return data; // Ritorniamo i dati
        } catch (e) {
            console.error("Error uploading file:", e.message);
            return null; // Gestire l'errore ritornando null o un altro valore appropriato
        }
    };

    const submitnewphoto = async (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().slice(0, 10);  // Usa slice(0, 10) per ottenere solo la data
        setFormData({
            ...formData,
            pubDate: currentDate,
            firstName: token.firstName,
            lastName: token.lastName
        });
        if (file) {
            try {
                const uploadedFile = await uploadFile();
                    console.log("File caricato:", uploadedFile);
                    const bodyToSend = {
                        ...formData,
                        photo:  uploadedFile.source,  // Assumi che 'url' sia la chiave corretta
                       
                    };
                    const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/photo/create`, {
                      
                        headers: {
                            'Content-Type': 'application/json',
                          
                        },
                        body: JSON.stringify(bodyToSend),
                    });
                    console.log("Risposta dalla creazione del post:", response);
                    return  await response.json();
                
            } catch (e) {
                console.error("Error submitting new photo:", e.message);
            }
        }
    };

    const DeletePhoto = async (photoId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/photo/${photoId}`, {
               
                headers: {
                    'Authorization': token  // Assicurati che il token sia disponibile
                }
            });
            if (response.status === 200) {
                setUserPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== photoId));
            } else {
                throw new Error('Failed to delete the photo');
            }
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };


 return (
    <div className={styles.container}>
    <h1 className={styles.title}>Camel Network User Profile</h1>
    <div className={styles.banner} style={{ backgroundImage: `url(${BannerImages})` }}>
        <label className={styles.imageUploader}>
            <input type="file" onChange={(e) => handleFileUpload('banner', e)} className={styles.imageInput} />
            <span>Change Banner</span>
        </label>
        <label className={styles.userLogo} style={{ backgroundImage: `url(${UserProfileImage})` }}>
            <input type="file" onChange={(e) => handleFileUpload('profile', e)} className={styles.imageInput} />
            <span>Change Profile Image</span>
        </label>
    </div>


            <div className={styles.bioInputArea}>
            <form onSubmit={submitBio}>  {/* Utilizzo di onSubmit per gestire il submit del form */}
            <textarea value={Bio} onChange={handleBioChange} placeholder="Write your biography here..."></textarea>
                <button type="submit" className={styles.submitBioButton}>
                    <i className="fas fa-upload"></i> Submit Bio
                </button>
            </form>
            {userBio && <div className={styles.userBio}>{userBio}</div>}
        </div>
        <div className={styles.photoGallery}>
            <h2>Photos</h2>
            <div className={styles.photosContainer}>
                {userPhotos.map(photo => (
                    <div key={photo._id} className={styles.photoItem}>
                        <img src={photo.photo || 'path/to/default/image.jpg'} alt="User Photo" className={styles.photo} />
                        <button onClick={() => DeletePhoto(photo.photo || 'path/to/default/image.jpg')} className="btn btn-danger">
                            Delete
                        </button>
        </div>
    ))}
</div>

            <div>
                <form encType="multipart/form-data" className="d-flex flex-column gap-3" onSubmit={submitnewphoto}>
                    <input
                        onChange={onChangeHandleFile}
                        type="file"
                        className="form-control"
                        name="uploadImg"
                    />
                    <button type="submit" className="btn btn-secondary pt-2">
                        Add photo
                    </button>
                </form>
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
