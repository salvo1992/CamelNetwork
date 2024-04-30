const express = require('express');
const router = express.Router();
const UserProfileModel = require('../models/UserProfile');
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configurazione di Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurazione di multer con Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CamelNetwork',
        format: async (req, file) => 'png',
        public_id: (req, file) => `${req.user.firstName}_${req.user.lastName}_${Date.now()}`,
    },
    onError: (err, next) => {
        console.error("Errore durante il caricamento su Cloudinary:", err);
        next(err);
    }
});

const parser = multer({ storage: storage });

// Endpoint per caricare le immagini su Cloudinary
router.post('/UserProfile/cloudUploadImg', verifyToken, parser.single('uploadImg'), async (req, res) => {
    try {
        if (!req.file) {
            console.log("File non fornito");
            return res.status(400).json({ message: "File non fornito" });
        }

        // Recupera il nome e il cognome dall'oggetto utente nel token
        const { firstName, lastName } = req.user;
        const public_id = `${firstName}_${lastName}_${Date.now()}`;
        console.log("File caricato:", req.file);
        console.log("Pubblic ID generato:", public_id);
        res.status(200).json({ source: req.file.path, public_id });
    } catch (e) {
        console.log("Errore durante l'upload del file:", e);
        res.status(500).send({
            statusCode: 500,
            message: 'File Upload Error'
        });
    }
});


// Endpoint per aggiornare le immagini del profilo
router.post('/UserProfile/create', async (req, res) => {
    try {
        const { firstName, lastName, email, profileImage, bannerImage, biography } = req.body;
        const newUserProfile = new UserProfileModel({
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            profileImage:req.body.profileImage,
            bannerImage:req.body.banner,
            biography:req.body.biography
        });
        await newUserProfile.save();
        res.status(201).json(newUserProfile);
    } catch (error) {
        console.error('Errore nella creazione del profilo utente:', error);
        res.status(400).json({ message: 'Errore nella creazione del profilo utente', error: error.message });
    }
});

// Endpoint per recuperare il profilo dell'utente
router.get('/UserProfile', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await UserProfile.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: 'Utente non trovato' });
        }
        res.send({
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.profileImage,
            bannerImage: user.bannerImage,
            bio: user.bio
        });
    } catch (error) {
        res.status(500).send({ message: 'Errore interno del server', error: error.message });
    }
});

module.exports = router;
