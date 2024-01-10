const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const User = require("../../app/models/User");
const Post = require("../../app/models/Post");
const Comment = require("../../app/models/Comment");

dotenv.config();

const seedData = async () => {
  try {
    // Xóa tất cả dữ liệu hiện có trước khi ghi đè
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    // Tạo người dùng mẫu
    const salt = await bcrypt.genSalt(10);

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash("123456", salt);

    const user1 = new User({
      username: "user1",
      email: "user1@example.com",
      password: hashedPassword,
    });

    const user2 = new User({
      username: "user2",
      email: "user2@example.com",
      password: hashedPassword,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    const user1_response = await user1.save();
    const user2_response = await user2.save();

    // Tạo bài viết mẫu
    const post1 = new Post({
      user_id: user1_response._id,
      title_post: "My Today",
      desc: "This is a test post description.",
      photo: "1664472977773java-script.jpg",
      username: user1_response.username,
      categories: ["category1", "category2"],
    });

    const post2 = new Post({
      user_id: user2_response._id,
      title_post: "My Today",
      desc: "This is a test post description.",
      photo: "1664472954323Dev.jpg",
      username: user2_response.username,
      categories: ["category1", "category2"],
    });

    // Lưu bài viết vào cơ sở dữ liệu
    const post1_response = await post1.save();
    const post2_response = await post2.save();

    // Tạo bình luận mẫu
    const comment1 = new Comment({
      post_id: post1_response._id,
      user_id: user1_response._id,
      content: "This is a test comment.",
    });

    const comment2 = new Comment({
      post_id: post2_response._id,
      user_id: user2_response._id,
      content: "This is a test comment.",
    });

    console.log("Seed data successfully created!");
  } catch (error) {
    console.error("Seed data creation failed:", error);
  }
};

async function connect() {
  try {
    // format: mongodb://localhost:27017/database_name
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connect database successfully!");
  } catch (error) {
    console.log("Connect database Failure!");
  }
}

module.exports = { connect, seedData };
