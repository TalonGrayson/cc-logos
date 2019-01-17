const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LogoSchema = new Schema({
  streamer: {
    type: String,
    required: true
  },
  image_url: {
    type: String,
    required: true
  }
});

module.exports = Logo = mongoose.model('logos', LogoSchema);