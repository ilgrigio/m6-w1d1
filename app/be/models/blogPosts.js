const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      avatar: String,
      ref: 'userModel',
    },
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
      default: 'http://picsum.photos/600/400',
    },
    readTime: {
      value: {
        type: Number,
        required: false,
      },
      unit: {
        type: String,
        required: false,
      },
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true }
);
module.exports = mongoose.model('blogPostModel', BlogPostSchema, 'blogPost');
