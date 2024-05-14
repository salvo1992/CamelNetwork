const mongoose = require('mongoose');

const BannerImagesSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    imageUrl: { type: String, required: true }
}, { timestamps: true, strict: true });

module.exports = mongoose.model('BannerImagesModel', BannerImagesSchema, 'BannerImages');