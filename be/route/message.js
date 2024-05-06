const express = require('express');
const MessageModel = require('../models/message');
const router = express.Router()
require('dotenv').config();
const verifyToken = require('../middlewares/verifyToken');
const UserModel = require('../models/users');

router.post('/messages', async (req, res) => {
    const { conversationId, text, firstName, lastName, attachments } = req.body;
    try {
        const message = new MessageModel({ 
            conversationId,
            text,
            firstName,
            lastName,
            attachments
        });
        const messageToSave = await message.save();
        res.status(201).send({
            statusCode: 201,
            payload: messageToSave
        });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error'
        });
    }
});


router.get('/messages', async (req, res) => {
    const { conversationId } = req.query;
    try {
      const messages = await MessageModel.find({ conversationId: conversationId }).populate('senderId');
      res.json(messages);
    } catch (error) {
      res.status(500).send(error);
    }
  });
module.exports =router;