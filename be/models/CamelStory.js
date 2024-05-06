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
 
},{ timestamps: true, strict: true });

module.exports = mongoose.model('camelStoryModel',camelStorySchema, 'CamelStory');
