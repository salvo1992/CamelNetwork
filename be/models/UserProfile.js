const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: 'URL_PREDEFINITO_DI_CLOUDINARY_PER_IMMAGINE_DEL_PROFILO'
    },
    bannerImage: {
        type: String,
        default: 'URL_PREDEFINITO_DI_CLOUDINARY_PER_IMMAGINE_DEL_BANNER'
    },
    biography: {
        type: String,
        default: 'Biografia non disponibile'
    }

}, { timestamps: true, strict:true })

module.exports = mongoose.model('UserProfileModel', userProfileSchema, 'UserProfile');



