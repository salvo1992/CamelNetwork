const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

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
        public_id: (req, file) => file.originalname
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
        const userId = req.user.id;
        const updates = {};

        if (req.files['profileImage']) {
            updates.profileImage = req.files['profileImage'][0].path;
        }
        if (req.files['bannerImage']) {
            updates.bannerImage = req.files['bannerImage'][0].path;
        }

        const updatedProfile = await UserProfile.updateOne({ _id: userId }, { $set: updates });
        console.log('Immagini aggiornate con successo');
        res.json({ message: 'Immagini aggiornate con successo', profile: updatedProfile });
    } catch (error) {
        console.error('Errore nell aggiornamento delle immagini:', error);
        res.status(500).send({ message: 'Errore durante l aggiornamento delle immagini', error });
    }
});

router.get('/userProfile', verifyToken, async (req, res) => {
    console.log('Richiesta di profilo utente ricevuta');
    try {
        const userId = req.user.id;
        const userProfile = await UserProfile.findOne({ userId });
        if (!userProfile) {
            console.log('Profilo utente non trovato');
            return res.status(404).json({ message: 'Profilo utente non trovato' });
        }
        console.log('Dati del profilo inviati con successo');
        res.json(userProfile);
    } catch (error) {
        console.error('Errore nel caricamento dei dati del profilo:', error);
        res.status(500).json({ message: 'Errore nel caricamento dei dati del profilo' });
    }
});


module.exports = router;




