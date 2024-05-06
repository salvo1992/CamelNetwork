const express = require('express');
const mongoose = require('mongoose');
const camelStoryModel = require('../models/CamelStory');
require('dotenv').config();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const router = express.Router();

// Configurazione di Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Setup di multer per l'archiviazione su Cloudinary
const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CamelNetwork/video',
        allowed_formats: ['mp4'],
        resource_type: "video",
    }
});

const cloudUpload = multer({storage: cloudStorage});

// Route per il recupero dei video
router.get('/videos', async (req, res) => {
    try {
        const stories = await camelStoryModel.find();
        res.status(200).json(stories);
    } catch (error) {
        console.error('Errore durante il recupero delle storie:', error);
        res.status(500).json({message: error.message});
    }
});

// Route per l'upload dei video su Cloudinary
router.post('/upload/clouduploadmp4', cloudUpload.single('video'), async (req, res) => {
    console.log(req.file)
    try {
        res.status(200).send({source: req.file.path});
    } catch (error) {
        console.error('Errore durante il salvataggio della storia:', error);
        res.status(500).send({message: 'Internal Server Error', details: error.message});
    }
});

router.post('/videos/create', async (req, res) => {
    try {
        const newVideo = new camelStoryModel({
            firstName: req.body.firstName,
            videoUrl: req.body.videoUrl,
        })
        await newVideo.save();
        res.status(200).send(newVideo);
    } catch (error) {
        console.error('Errore durante il salvataggio della storia:', error);
        res.status(500).json({message: 'Internal Server Error', details: error.message});
    }
})

// Route per eliminare i video
router.delete('/videos/:id', async (req, res) => {
    try {
        const story = await CamelStory.findByIdAndDelete(req.params.id);
        if (!story) return res.status(404).json({message: 'Video non trovato'});
        res.status(200).json({message: 'Eliminato con successo'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;
