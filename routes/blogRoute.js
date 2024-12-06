const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

router.get("/search", async (req, res) => {
  try {
    const { keyword = "", category = "", page = 1, limit = 10 } = req.query;

    // query builder
    const searchQuery = {};

    if (keyword) {
      searchQuery.$text = {
        $search: keyword,
      };
    }

    // category filter
    if (category) {
      searchQuery.category = category.toLowerCase();
    }

    // Pagination
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skipCount = (pageNumber - 1) * limitNumber;

    const blogs = await Blog.find(searchQuery)
      .skip(skipCount)
      .limit(limitNumber)
      .sort({ date: -1 }); // Sort by most recent first

    const totalBlogs = await Blog.countDocuments(searchQuery);

    res.json({
      blogs,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalBlogs / limitNumber),
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error searching blogs",
      error: error.message,
    });
  }
});

// Create a new blog
router.post("/", async (req, res) => {
  const { title, category, body, image } = req.body;
  try {
    const newBlog = new Blog({
      title,
      category,
      body,
      image,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({
      message: "Error creating blog",
      error: error.message,
    });
  }
});

module.exports = router;
