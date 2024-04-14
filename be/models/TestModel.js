const mongoose = require('mongoose')

const Comments = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true, strict: true })

const Posts = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    comments: [Comments]
}, {timestamps: true})
