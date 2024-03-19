const express = require("express");
const blogPosts = express.Router();
const BlogPostModel = require("../models/blogPosts");

// GET
blogPosts.get("/blogPosts", async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  try {
    const blogPosts = await BlogPostModel.find()
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort({ author: -1 });

    const totalBlogPosts = await BlogPostModel.countDocuments();

    res.status(200).send({
      currentPage: page,
      pageSize,
      totalPages: Math.ceil(totalBlogPosts / pageSize),
      blogPosts,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// POST
blogPosts.post("/blogPosts/create", async (req, res) => {
  const newBlogPost = new BlogPostModel({
    title: req.body.title,
    category: req.body.category,
    content: req.body.content,
    cover: req.body.cover,
    readTime: Number(req.body.readTime),
    author: req.body.author,
  });

  try {
    await newBlogPost.save();
    res.status(201).send({
      statusCode: 201,
      payload: "post add successfully",
    });
  } catch (error) {}
});
module.exports = blogPosts;
