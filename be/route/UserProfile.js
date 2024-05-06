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

const internalStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${Date.now()}.${fileExtension}`);
    }
});

// Configurazione di multer con Cloudinary
const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CamelNetwork',
        format: async (req, file) => 'png',
        public_id: (req, file) => `${req.user.firstName}_${req.user.lastName}_${req.user.email}_${Date.now()}`,
    },
    onError: (err, next) => {
        console.error("Errore durante il caricamento su Cloudinary:", err);
        next(err);
    }
});

const upload = multer({ storage: internalStorage });
const cloudUpload = multer({ storage: cloudStorage });

// Endpoint per caricare le immagini su Cloudinary
router.post('/UserProfile/cloudUploadImg', verifyToken, cloudUpload.single('uploadImg'), async (req, res) => {
    try {
        if (!req.file) {
            console.log("File non fornito");
            return res.status(400).json({ message: "File non fornito" });
        }

        // Recupera il nome e il cognome dall'oggetto utente nel token
        const { firstName, lastName, email } = req.user;
        const public_id = `${firstName}_${lastName}_${email}_${Date.now()}`;
        console.log("File caricato:", req.file);
        console.log("Public ID generato:", public_id);
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
router.post('/UserProfile/uploadImg',upload.fields('uploadImg'), async (req, res) => { 
    console.log("Dati ricevuti:", req.body); 
    try {
        const { firstName, lastName, email, profileImage, bannerImage } = req.body;

        if (!firstName || !lastName || !email || (!profileImage && !bannerImage)) {
            return res.status(400).send({
                message: 'Missing required fields or image',
                requiredFields: ['firstName', 'lastName', 'email'],
                requiredImage: ['profileImage', 'bannerImage']
            });
        }
       
        const newUserProfile = new UserProfileModel({
            firstName,
            lastName,
            email,
            profileImage,
            bannerImage,
            biography:req.body.biography
        });
     
        await newUserProfile.save();
        res.status(201).send({
            statusCode: 201,
            payload: 'New userprofile saved successfully'
        });
    } catch (e) {
        // Gestisci eventuali errori
        console.error('Errore nella creazione del profilo utente:', e);
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error: e.message
        });
    }
})

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
