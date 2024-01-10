const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

class usersController {
  // PUT
  // path = /api/users/:id
  userUpdate = async (req, res) => {
    console.log(req.body.userId);

    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);

        // log
        console.log("Update user successfully!");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your account!");
    }
  };

  // DELETE
  // path = /api/users/:id
  userDelete = async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);

          res.status(200).json("User has been deleted...");

          // log
          console.log("Delete user successfully!");
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.status(404).json("User not found!");
      }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  };

  // GET
  // path = /api/users/:id
  userGet = async (req, res) => {
    try {
      console.log(req.params.id);

      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;

      // log
      console.log("Get user successfully!");

      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // GET ALL
  // path = /api/users/
  userGetAll = async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);

      // log
      console.log("Get all user successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

module.exports = new usersController();
