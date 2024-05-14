const express = require('express');
const router = express.Router();
const UserProfileModel = require('../models/UserProfile');
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Setup for Cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CamelNetwork/UserProfile',
        public_id: (req, file) =>file.name  // Ensuring unique file names
    }
});

const cloudUpload = multer({ storage: cloudStorage });

// Route to upload/update profile image
router.post('/UserProfile/cloudUploadImg', cloudUpload.single('uploadImg'), async (req, res) => {
    console.log("Starting file upload process");
    
    try {
        console.log("Request received. Checking file...");
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        console.log("File received:", req.file);
        console.log("File path:", req.file.path);

        res.status(200).json({ source: req.file.path });
    } catch (e) {
        console.log("Error during file upload process:", e);
        res.status(500).send({
            statusCode: 500,
            message: 'File Upload Error'
        });
    }
});

// Fetch all user photos
router.get('/UserProfile/latest', async (req, res) => {
    try {
        console.log("Inizio recupero ultima immagine caricata da Cloudinary...");

        // Utilizza l'API di Cloudinary per recuperare l'ultima immagine caricata
        const result = await cloudinary.search
            .expression('folder:UserProfile')
            .sort_by('created_at', 'desc')
            .max_results(1)
            .execute();

        if (result.resources.length === 0) {
            console.error("Nessuna immagine trovata.");
            return res.status(404).json({ message: 'Nessuna immagine trovata' });
        }

        const latestImage = result.resources[0];
        console.log("Ultima immagine trovata:", latestImage.secure_url);
        res.status(200).json({ payload: latestImage.secure_url });
    } catch (error) {
        console.error("Errore nel recupero dell'immagine da Cloudinary:", error);
        res.status(500).json({ message: 'Errore interno del server' });
    }
});



module.exports = router;
