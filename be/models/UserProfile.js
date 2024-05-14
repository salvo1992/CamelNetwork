const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    imageUrl: { type: String, required: true }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('UserProfileModel', userProfileSchema, 'UserProfile');




