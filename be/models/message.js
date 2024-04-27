const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

    conversationId: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Conversation'
         },

    senderId: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User'
         },

    text: {
         type: String,
          required: true 
        },

    timestamp: {
         type: Date,
          default: Date.now
         },

    attachments: {
         type: [String]
         } // URLs to images or other files

},{ timestamps: true, strict: true });;

module.exports= mongoose.model('messageModel',messageSchema,'Message');
 
