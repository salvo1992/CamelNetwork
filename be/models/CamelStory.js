// models/CamelStory.js

const mongoose = require('mongoose');

const camelStorySchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 172800  // Questo campo fa sì che il documento venga eliminato dopo 48 ore
  }
},{ timestamps: true, strict: true });

module.exports = mongoose.model('camelStoryModel',camelStorySchema, 'CamelStory');
