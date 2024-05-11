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
router.post('/UserProfile/cloudUploadImg',  cloudUpload.single('uploadImg'), async (req, res) => {
    try {
        res.status(200).json({ source: req.file.path });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            message: 'File Upload Error'
        });
    }
});

// Fetch all user photos
router.get('/UserProfile', async (req, res) => {
    try {
        const UserProfile = await UserProfileModel.find();  // Trova tutte le foto nel database
        res.status(200).json({
            statusCode: 200,
            payload: UserProfile,
            message: "UserProfile fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching UserProfile:", error);
        res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message  // Includi il messaggio di errore per un debugging più facile
        });
    }
});
router.post('/UserProfile/create', async (req, res) => {
    console.log('Dati ricevuti nella richiesta POST:', req.body);
    try {
         const UserProfile = new UserProfileModel({
            UserProfile: req.body.UserProfile,
        });

        // Salva il nuovo post
        await UserProfile.save();
        
        // Invia la risposta di successo
        res.status(201).send({
            statusCode: 201,
            payload: 'New UserProfile saved successfully'
        });
    } catch (e) {
        // Gestisci eventuali errori
        console.error(e);
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});






module.exports = router;

