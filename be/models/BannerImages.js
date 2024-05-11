const mongoose = require('mongoose');

const BannerImagesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model that this ID reference
    },
    BannerImages: {
        type: String,
        default: '',
    }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('BannerImagesModel', BannerImagesSchema, 'BannerImages');