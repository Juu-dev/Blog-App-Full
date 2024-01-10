const Comment = require("../models/Comment");
const User = require("../models/User");

class commentController {
  // POST
  // path = /api/commentS
  commentCreate = async (req, res) => {
    const newComment = new Comment(req.body);

    console.log(req.body);
    try {
      const comment = await newComment.save();
      res.status(200).json(comment);

      // log
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  // GET
  // path = /api/comments/:post_id
  commentGet = async (req, res) => {
    try {
      const comments = await Comment.find({ post_id: req.params.post_id });
      const userPromises = comments.map(async (item) => {
        const user = await User.findById(item.user_id);
        return { ...item.toObject(), user };
      });

      const result = await Promise.all(userPromises);

      console.log("comments: ", result);
      res.status(200).json(result);

      // log
      console.log("Get comment successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // DELETE
  // path = /api/comment/:id
  commentDelete = async (req, res) => {
    try {
      const cats = await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment has been deleted...");

      // log
      console.log("Delete comment successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

module.exports = new commentController();
