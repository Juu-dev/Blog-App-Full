const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title_post: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

PostSchema.index({ user_id: 1, title_post: 1 }, { unique: true });

module.exports = mongoose.model("Post", PostSchema);
