const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: null
  }
}, {
  timestamps: true 
});

blogSchema.index({ title: 'text', body: 'text', category: 'text' });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;