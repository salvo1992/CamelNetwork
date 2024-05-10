const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
    Users: {
        type: String, // Modifica il tipo del campo Users in String
        required: true
    },
    url:{
         type:String,
         required: true,
        },// URL of the photo as stored on Cloudinary
    cloudinaryId:{
         type:String,
         require:false,
          } // Cloudinary ID for the photo for easy access and management
}, { timestamps: true, strict: true })

module.exports = mongoose.model('photoModel', photoSchema, 'photo');
