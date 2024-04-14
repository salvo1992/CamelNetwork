const express = require('express');
const router = express.Router();
const newpostModel = require('../models/newpost');
const UserModel = require('../models/users');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
const verifyToken = require('../middlewares/verifyToken');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CamelNetwork',
        public_id: (req, file) => file.name
    }
});

const cloudUpload = multer({ storage: cloudStorage });

router.post('/newpost/cloudUploadImg', cloudUpload.single('uploadImg'), async (req, res) => {
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

router.get('/newpost', async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    try {
        const newposts = await newpostModel.find()
            .populate('Users', 'firstName')
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .sort({ pubDate: -1 });

        const totalNewposts = await newpostModel.countDocuments();

        res.status(200).send({
            currentPage: page,
            pageSize,
            totalPages: Math.ceil(totalNewposts / pageSize),
            newposts
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});

router.post('/newpost/create', verifyToken, async (req, res) => {
    console.log('Dati ricevuti nella richiesta POST:', req.body);
    try {
        // Recupera l'utente autenticato dal token
        const user = req.user;
        
        // Verifica se l'utente è presente
        if (!user) {
            return res.status(401).send({
                statusCode: 401,
                message: 'User not authenticated'
            });
        }

        // Crea il nuovo post utilizzando il nome dell'utente anziché l'ID
        const newpost = new newpostModel({
            Users: user.firstName, // Utilizza il nome dell'utente
            title: req.body.title,
            cover: req.body.cover,
            description: req.body.description,
            pubDate: req.body.pubDate,
            isFeatured: req.body.isFeatured
        });

        // Salva il nuovo post
        await newpost.save();
        
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

router.patch('/newpost/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const newpost = await newpostModel.findById(id);
        if (!newpost) {
            return res.status(404).send({
                statusCode: 404,
                message: `newpost with id ${id} not found!`
            });
        }

        const newpostToUpdate = req.body;
        const options = { new: true };
        const result = await newpostModel.findByIdAndUpdate(id, newpostToUpdate, options);

        res.status(200).send(result);
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});

router.delete('/newpost/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const newpost = await newpostModel.findByIdAndDelete(id);
        if (!newpost) {
            return res.status(404).send({
                statusCode: 404,
                message: 'The requested newpost does not exist!'
            });
        }

        res.status(200).send(`newpost with id ${id} successfully removed`);
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});

module.exports = router;
