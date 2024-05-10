const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Photo = require('../models/photo');
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
        public_id: (req, file) => 'photo_' + Date.now()  // Ensuring unique file names
    }
});

const cloudUpload = multer({ storage: cloudStorage });

// Upload image to Cloudinary and save URL to user's document
router.post('/photo/cloudUploadImg', verifyToken, cloudUpload.single('uploadImg'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    try {
        const newPhoto = new Photo({
            userId: req.user.id,
            url: req.file.path,
            cloudinaryId: req.file.filename  // Assuming the Cloudinary response provides filename
        });
        await newPhoto.save();
        res.status(200).json({ message: "File uploaded successfully", source: req.file.path });
    } catch (error) {
        console.error("File Upload Error:", error);
        res.status(500).send({ statusCode: 500, message: 'File Upload Error' });
    }
});

// Fetch all user photos
router.get('/photo', verifyToken, async (req, res) => {
    try {
        const photos = await Photo.find({ userId: req.user.id });
        res.status(200).json(photos);
    } catch (error) {
        console.error("Error fetching photos:", error);
        res.status(404).json({ message: "Photos not found" });
    }
});

// Delete image from Cloudinary and user profile
router.delete('/photo/:photoId', verifyToken, async (req, res) => {
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
