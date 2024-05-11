const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
  
    photo: {
        type: String,
        required: false,
        default: "https://picsum.photos/600/400"
    },
}, { timestamps: true, strict: true })

module.exports = mongoose.model('photoModel', photoSchema, 'photo');
