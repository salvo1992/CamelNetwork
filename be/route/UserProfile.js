const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Users = require('../models/users');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CamelNetwork/UserProfile',
        format: async (req, file) => 'png', 
        public_id: (req, file) => 'user_' + req.user.id + '_' + Date.now(),
    },
});

const parser = multer({ storage: storage });


router.post('/updateProfileImages', verifyToken, parser.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 }
]), async (req, res) => {
    console.log('Richiesta di aggiornamento immagini ricevuta');
    console.log(req.files);
    try {
        const userId = req.user.id; // Assicurati che l'ID utente sia incluso nel token
        console.log('ID utente:', userId); // Aggiungi questo log per verificare l'ID utente ricevuto
        
        const updates = {};

        if (req.files['profileImage']) {
            updates.profileImageId = req.files['profileImage'][0].path; // Salva l'URL dell'immagine di Cloudinary
        }
        if (req.files['bannerImage']) {
            updates.bannerImageId = req.files['bannerImage'][0].path; // Salva l'URL dell'immagine di Cloudinary
        }

        console.log('Aggiornamenti:', updates); // Aggiungi questo log per verificare gli aggiornamenti prima dell'aggiornamento del profilo

        const updatedProfile = await UserProfile.findOneAndUpdate({ userId }, { $set: updates }, { new: true });
        console.log('Profilo aggiornato:', updatedProfile); // Aggiungi questo log per verificare se il profilo è stato aggiornato correttamente
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profilo utente non trovato' });
        }

        console.log('Immagini aggiornate con successo', updatedProfile);
        res.json({ message: 'Immagini aggiornate con successo', profile: updatedProfile });
    } catch (error) {
        console.error('Errore nell aggiornamento delle immagini:', error);
        res.status(500).send({ message: 'Errore durante l aggiornamento delle immagini', error });
    }
});


router.get('/userProfile', verifyToken, async (req, res) => {
    const userId = req.user.id;
    console.log('ID utente:', userId); // Aggiungi questo log per verificare l'ID utente ricevuto

    try {
        const userProfile = await UserProfile.findOne({ userId: userId });
        console.log('Profilo utente trovato:', userProfile); // Aggiungi questo log per verificare se il profilo utente è stato trovato

        if (!userProfile) {
            return res.status(404).json({ message: 'Profilo utente non trovato' });
        }

        const profileImageUrl = userProfile.profileImageId ? cloudinary.url(userProfile.profileImageId, { secure: true }) : '';
        const bannerImageUrl = userProfile.bannerImageId ? cloudinary.url(userProfile.bannerImageId, { secure: true }) : '';

        res.json({
            profileImage: profileImageUrl,
            bannerImage: bannerImageUrl,
            biography: userProfile.biography
        });
    } catch (error) {
        res.status(500).json({ message: 'Errore nel caricamento dei dati del profilo', error: error.toString() });
    }
});


module.exports = router;




