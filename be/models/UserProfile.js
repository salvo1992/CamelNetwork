const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model that this ID references
    },
    profileImageUrl: {
        type: String,
        default: '',
    },
    bannerImageUrl: {
        type: String,
        default: '',
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('UserProfileModel', userProfileSchema, 'UserProfile');




