const mongoose = require('mongoose');

const BioSchema = new mongoose.Schema({
    Bio:{
        type:String,
        required:true,
    } 
},{ timestamps: true, strict: true });;

module.exports= mongoose.model('BioModel',BioSchema,'Bio');