const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 150,
    },
    cover: {
      type: String,
      required: false,
      default: "http://picsum.photos/600/400",
    },
    readTime: {
      type: Number,
      required: false,
      //   unit: ``,
    },
    author: {
      type: String,
      // avatar: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, strict: true }
);
module.exports = mongoose.model("blogPostModel", BlogPostSchema, "blogPost");
