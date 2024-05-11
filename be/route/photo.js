const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const photoModel = require('../models/photo');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

// Setup for Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CamelNetwork/photo',
        public_id: (req, file) =>file.name  // Ensuring unique file names
    }
});

const cloudUpload = multer({ storage: cloudStorage });

// Upload image to Cloudinary and save URL to user's document
router.post('/photo/cloudUploadImg',  cloudUpload.single('uploadImg'), async (req, res) => {
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
router.get('/photo', async (req, res) => {
    try {
        const photos = await photoModel.find();  // Trova tutte le foto nel database
        res.status(200).json({
            statusCode: 200,
            payload: photos,
            message: "Photos fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching photos:", error);
        res.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
            error: error.message  // Includi il messaggio di errore per un debugging più facile
        });
    }
});
router.post('/photo/create', async (req, res) => {
    console.log('Dati ricevuti nella richiesta POST:', req.body);
    try {
         const photo = new photoModel({
           photo: req.body.photo,
        });

        // Salva il nuovo post
        await photo.save();
        
        // Invia la risposta di successo
        res.status(201).send({
            statusCode: 201,
            payload: 'New post saved successfully'
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







// Delete image from Cloudinary and user profile
router.delete('/photo/:photoId', async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.photoId);
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        await cloudinary.uploader.destroy(photo.cloudinaryId);
        await photo.remove();
        res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
        console.error("Error deleting photo:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
