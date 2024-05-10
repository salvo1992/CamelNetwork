const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const UserProfile = require('../models/UserProfile');
const verifyToken = require('../middlewares/verifyToken'); // Assuming this middleware is set up for authentication
const router = express.Router();

// Setup for Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorageProfile = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'UserProfileImages',
        public_id: (req, file) => 'user_profile_' + req.user.id + '_' + Date.now(), // Unique public ID for profile image
    }
});

const cloudStorageBanner = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'UserProfileImages',
        public_id: (req, file) => 'user_banner_' + req.user.id + '_' + Date.now(), // Unique public ID for banner image
    }
});

const uploadProfile = multer({ storage: cloudStorageProfile });
const uploadBanner = multer({ storage: cloudStorageBanner });

// Route to upload/update profile image
router.post('/uploadProfileImage', verifyToken, uploadProfile.single('profileImage'), async (req, res) => {
    try {
        const result = await UserProfile.findOneAndUpdate(
            { userId: req.user.id },
            { profileImageUrl: req.file.path }, // Using Cloudinary URL
            { new: true, upsert: true }
        );
        res.status(200).json({ message: "Profile image updated successfully", url: req.file.path });
    } catch (error) {
        console.error("Error updating profile image:", error);
        res.status(500).json({ message: "Failed to update profile image" });
    }
});

// Route to upload/update banner image
router.post('/uploadBannerImage', verifyToken, uploadBanner.single('bannerImage'), async (req, res) => {
    try {
        const result = await UserProfile.findOneAndUpdate(
            { userId: req.user.id },
            { bannerImageUrl: req.file.path }, // Using Cloudinary URL
            { new: true, upsert: true }
        );
        res.status(200).json({ message: "Banner image updated successfully", url: req.file.path });
    } catch (error) {
        console.error("Error updating banner image:", error);
        res.status(500).json({ message: "Failed to update banner image" });
    }
});

router.post('/saveProfileImageUrl', verifyToken, async (req, res) => {
    const { url } = req.body;
    const result = await UserProfile.findOneAndUpdate(
        { userId: req.user.id },
        { profileImageUrl: url },
        { new: true, upsert: true }
    );
    res.status(200).json({ message: "Profile image URL saved to MongoDB", profileImageUrl: result.profileImageUrl });
});

// POST route to save banner image URL to MongoDB
router.post('/saveBannerImageUrl', verifyToken, async (req, res) => {
    const { url } = req.body;
    const result = await UserProfile.findOneAndUpdate(
        { userId: req.user.id },
        { bannerImageUrl: url },
        { new: true, upsert: true }
    );
    res.status(200).json({ message: "Banner image URL saved to MongoDB", bannerImageUrl: result.bannerImageUrl });
});

// GET route to fetch profile image URL from MongoDB
router.get('/getProfileImageUrl/:userId', async (req, res) => {
    const userProfile = await UserProfile.findOne({ userId: req.params.userId });
    if (!userProfile || !userProfile.profileImageUrl) {
        return res.status(404).json({ message: "Profile image URL not found" });
    }
    res.status(200).json({ profileImageUrl: userProfile.profileImageUrl });
});

// GET route to fetch banner image URL from MongoDB
router.get('/getBannerImageUrl/:userId', async (req, res) => {
    const userProfile = await UserProfile.findOne({ userId: req.params.userId });
    if (!userProfile || !userProfile.bannerImageUrl) {
        return res.status(404).json({ message: "Banner image URL not found" });
    }
    res.status(200).json({ bannerImageUrl: userProfile.bannerImageUrl });
});



module.exports = router;