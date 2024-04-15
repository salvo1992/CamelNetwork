const mongoose = require('mongoose');

const newpostSchema = new mongoose.Schema({
    Users: {
        type: String, // Modifica il tipo del campo Users in String
        required: true
    },
    firstName: {
        type: String, // Aggiungi il campo firstName
        required: true
    },
    lastName: {
        type: String, // Aggiungi il campo lastName
        required: true
    },
    title: {
        type: String,
        required: true,
        max: 150
    },
    cover: {
        type: String,
        required: false,
        default: "https://picsum.photos/600/400"
    },
    description: {
        type: String,
        required: true,
    },
    pubDate: {
        type: Date,
        required: false,
    },
    isFeatured: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true, strict: true })

module.exports = mongoose.model('NewpostModel', newpostSchema, 'newpost');
