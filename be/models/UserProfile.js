const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profileImage: {
        type: String,
        default: '/assets/default_profile.jpg'
    },
    bannerImage: {
        type: String,
        default: '/assets/default_banner.jpg'
    },
    biography: String
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
