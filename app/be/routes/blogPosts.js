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

// GET ID
blogPosts.get("/getBlogPost/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blogPost = await BlogPostModel.findById(id); // .find ritorno tutto quello che c'è nella collection 'users'

    if (!blogPost) {
      res.status(404).send({
        statusCode: 404,
        message: "The requested post doesn't exist",
      });
    }
    res.status(200).send(blogPost);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// POST
blogPosts.post("/blogPost/create", async (req, res) => {
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

// PATCH
blogPosts.patch("/updateBlogPost/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blogPost = await BlogPostModel.findById(id);
    if (!blogPost) {
      res.status(404).send({
        statusCode: 404,
        message: "The requested post doesn't exist",
      });
    }

    const updatedData = req.body;
    // Quando il documento è stato aggiornato ci ritorni le ultime modifiche fatte
    const options = { new: true }; // Ritorna il nuovo documento
    const result = await BlogPostModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

// DELETE
blogPosts.delete("/deleteAuthor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogPost = await BlogPostModel.findByIdAndDelete(id);
    if (!blogPost) {
      res.status(404).send({
        statusCode: 404,
        message: "The requested post doesn't exist",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: `Post with id ${id} successfully remove`,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});

module.exports = blogPosts;
