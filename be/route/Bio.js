const express = require('express');
const router = express.Router();
const BioModel = require('../models/Bio');
const verifyToken = require('../middlewares/verifyToken'); // Assuming this is already implemented

// Fetch bio entry for a specific user
router.get('/bio/:userId', verifyToken, async (req, res) => {
    try {
        const bio = await BioModel.findOne({ users: req.params.userId });
        if (!bio) {
            return res.status(404).json({ message: "No bio found for this user" });
        }
        res.status(200).json(bio);
    } catch (error) {
        console.error("Error fetching bio:", error);
        res.status(500).json({ message: "Error retrieving bio data" });
    }
});

// Create a new bio entry
router.post('/bio/create', async (req, res) => {
    const { userId, text } = req.body;
    if (!userId || !text) {
        return res.status(400).json({ message: "Missing user ID or text" });
    }

    try {
        const newBio = new BioModel({
            user, // Changed 'users' to 'user' to match your schema
            text
        });
        const BioToSave=await newBio.save();
        res.status(201).json({ message: "Bio created successfully", bio: newBio });
    } catch (error) {
        console.error("Error creating bio:", error);
        res.status(500).json({ message: "Error saving bio data" });
    }
});

// Update an existing bio entry
router.put('/bio/:userId', verifyToken, async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: "Text is required for updating bio" });
    }

    try {
        const updatedBio = await BioModel.findOneAndUpdate(
            { users: req.params.userId },
            { $set: { text: text }},
            { new: true }
        );
        if (!updatedBio) {
            return res.status(404).json({ message: "Bio not found for this user" });
        }
        res.status(200).json({ message: "Bio updated successfully", bio: updatedBio });
    } catch (error) {
        console.error("Error updating bio:", error);
        res.status(500).json({ message: "Error updating bio data" });
    }
});

module.exports = router;
