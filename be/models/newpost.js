const mongoose = require('mongoose');

const newpostchema = new mongoose.Schema({
    Users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
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

module.exports = mongoose.model('NewpostModel',newpostchema, 'newpost')