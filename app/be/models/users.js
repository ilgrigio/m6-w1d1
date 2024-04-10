const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      required: true,
    },
    postedPost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogPostModel',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);
module.exports = mongoose.model('userModel', userSchema, 'user');
