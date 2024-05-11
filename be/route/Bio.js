const express = require('express');
const router = express.Router();
const BioModel = require('../models/Bio');
const verifyToken = require('../middlewares/verifyToken'); // Assuming this is already implemented
require('dotenv').config();



// Fetch bio entry for a specific user
router.get('/bio', async (req, res) => {
    try {
        // Trova l'ultima biografia inserita nel database
        const latestBio = await BioModel.findOne().sort({ createdAt: -1 });  // Utilizza il timestamp di creazione per trovare l'ultima
        if (!latestBio) {
            return res.status(404).json({ message: "No bio found" });
        }
        res.status(200).json({ Bio: latestBio.Bio });  // Assumi che il campo si chiami 'Bio' nel modello
    } catch (error) {
        console.error("Error fetching bio:", error);
        res.status(500).json({ message: "Error retrieving bio data" });
    }
});

// Create a new bio entry
router.post('/bio/create', async (req, res) => {
    console.log(req.body);
    const { Bio } = req.body;

    if (!Bio) {
        return res.status(400).json({ message: "Text for bio is required" });
    }

    try {
        // Utilizza l'ID utente dal token
        const newBio = new BioModel({ Bio });

        // Salva la nuova biografia nel database
        const savedBio = await newBio.save();;
console.log(savedBio);
        // Rispondi con lo stato 201 Created e l'oggetto biografia salvato
        res.status(201).json(savedBio);
    } catch (error) {
        console.error("Error creating bio:", error);
        res.status(500).json({ message: "Error saving bio data", error: error.message });
    }
});

// Update an existing bio entry
router.put('/bio', async (req, res) => {
    const {Bio } = req.body;

    if (!Bio) {
        return res.status(400).json({ message: "Text is required for updating bio" });
    }

    try {
        const updatedBio = await BioModel.findOneAndUpdate( 
            { $set: { Bio: Bio }},
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
