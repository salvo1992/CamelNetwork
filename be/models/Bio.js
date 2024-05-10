const mongoose = require('mongoose');

const BioSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  // Using ObjectId to reference another document,
        required:true,
        max:255,
        ref: 'Users'
    }, 
    text:{
        type:String,
        required:true,
        max:255,
    } 
},{ timestamps: true, strict: true });;

module.exports= mongoose.model('BioModel',BioSchema,'Bio');