const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoute');
const cors = require('cors')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: [
      'https://search-blog-frontend-0b06.onrender.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Access-Control-Allow-Origin'
    ]
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: 'admin',
    ssl: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/blogs', blogRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;