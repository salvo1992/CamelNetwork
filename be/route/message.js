const express = require('express');
const MessageModel = require('../models/message');
const router = express.Router()
require('dotenv').config();
const verifyToken = require('../middlewares/verifyToken');
const UserModel = require('../models/users');

router.post('/messages', async (req, res) => {
    const { conversationId, senderId, text, attachments } = req.body;
    try {
        const message = new Message({ conversationId, senderId, text, attachments });
        await message.save();
        res.status(201).send(message);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/messages', async (req, res) => {
    const { conversationId } = req.query;
    try {
        const messages = await Message.find({ conversationId });
        res.json(messages);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports =router;