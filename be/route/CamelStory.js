const express = require('express');
const mongoose = require('mongoose');
const CamelStory = require('../models/CamelStory');
const UserModel = require('../models/users');
require('dotenv').config();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const verifyToken = require('../middlewares/verifyToken');
const router = require('./newpost');

// Rotte
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'CamelNetwork',
        public_id: (req, file) => file.name
    }
});

const cloudUpload = multer({ storage: cloudStorage });


router.get('/videos', async (req, res) => {
  try {
    const stories = await CamelStory.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/upload', async (req, res) => {
  const { firstName, videoUrl } = req.body;
  const story = new CamelStory({ firstName, videoUrl });

  try {
    const newStory = await story.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/videos/:id', async (req, res) => {
  try {
    const story = await CamelStory.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: 'Video not found' });
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports =router