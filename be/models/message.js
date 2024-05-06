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
        firstName: {
          type: String,
          required: true // Mantieni la richiesta per il nome, generalmente necessaria
        },
        lastName: {
          type: String,
          required: true // Mantieni la richiesta per il cognome
        },
     attachments: {
         type: Array,
         default: []
         } // URLs to images or other files

},{ timestamps: true, strict: true });;

module.exports= mongoose.model('messageModel',messageSchema,'Message');
 
