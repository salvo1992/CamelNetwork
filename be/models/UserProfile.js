const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    firstName: {
         type: String,
          required: true
         },
    lastName: {
         type: String,
          required: true
         },
    
    profileImage: {
        type: String,
        default: '/assets/default_profile.jpg'
    },
    bannerImage: {
        type: String,
        default: '/assets/default_banner.jpg'
    },
    biography:{
        type:String
    }

}, { timestamps: true, strict:true })

module.exports = mongoose.model('UserProfileModel', userProfileSchema,'UserProfile');


