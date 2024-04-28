const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // ID automatico generato da Mongoose
    firstName: {
        type: String,
        required: true,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    age: {
        type: Number,
        required: false,
        default: 0
    }
}, { timestamps: true, strict: true });


module.exports = mongoose.model('userModel', UserSchema, 'users')
