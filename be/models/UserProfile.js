const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true // Mantieni la richiesta per il nome, generalmente necessaria
    },
    lastName: {
        type: String,
        required: true // Mantieni la richiesta per il cognome
    },
    email: {
        type: String,
        required: true, // L'email è spesso un campo richiesto e utile per identificare univocamente l'utente
        unique: true, // Assicura che l'email sia unica nel database
    },
    profileImage: {
        type: String,
        required:true,
        default: 'URL_PREDEFINITO_DI_CLOUDINARY_PER_IMMAGINE_DEL_PROFILO'
    },
    bannerImage: {
        type: String,
        required:true,
        default: 'URL_PREDEFINITO_DI_CLOUDINARY_PER_IMMAGINE_DEL_BANNER'
    },
    biography: {
        type: String,
        default: 'Biografia non disponibile'
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('UserProfileModel', userProfileSchema, 'UserProfile');




