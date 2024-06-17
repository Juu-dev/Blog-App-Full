const User = require("../models/User");
const bcrypt = require("bcrypt");

const CLIENT_ID = process.env.CLIENT_ID;

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();

  // Lấy thông tin người dùng từ payload
  const userid = payload["sub"];
  const email = payload["email"];
  const name = payload["name"];
  const picture = payload["picture"];

  return { email, name, picture };
}

class AuthController {
  // [POST]
  // path =  /register
  async authRegister(req, res) {
    try {
      console.log("Registering new user...");

      const { username, email, password } = req.body;

      // Kiểm tra xem người dùng đã tồn tại với email hoặc username đã cho hay chưa
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });

      if (existingUser) {
        return res.status(400).json("Username or email already exists");
      }

      // Tạo một salt để mã hóa mật khẩu
      const salt = await bcrypt.genSalt(10);

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, salt);

      // Tạo người dùng mới
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Lưu người dùng vào cơ sở dữ liệu
      const savedUser = await newUser.save();

      console.log("Create new user successfully!");

      // Trả về thông tin người dùng đã đăng ký
      res.status(200).json(savedUser);
    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).json(err.message);
    }
  }

  // [POST]
  // path =  /login
  async authLogin(req, res) {
    try {
      console.log("Logging in...");
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json("Missing username or password!");
      }

      // Tìm người dùng bằng username
      const user = await User.findOne({ username });

      // Nếu không tìm thấy người dùng
      if (!user) {
        console.log("Login failed!");
        return res.status(400).json("Wrong credentials! Username is wrong!");
      }

      // So sánh mật khẩu đã mã hóa
      const passwordMatch = await bcrypt.compare(password, user.password);

      // Nếu mật khẩu không khớp
      if (!passwordMatch) {
        return res.status(400).json("Wrong credentials! Password is wrong!");
      }

      // Loại bỏ mật khẩu khỏi thông tin người dùng
      const { password: _, ...userData } = user._doc;

      console.log("Login successfully!");

      // Trả về thông tin người dùng đã đăng nhập
      res.status(200).json(userData);
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json(err.message);
    }
  }

  // [POST]
  // path = /loginGoogle
  async authLoginGoogle(req, res) {
    try {
      console.log("Logging in with Google...");
      const { tokenId } = req.body;

      // Xác minh token ID
      const { email, name, picture } = await verify(tokenId);

      let user = await User.findOne({ email });

      // Nếu không tìm thấy người dùng, tạo người dùng mới
      if (!user) {
        user = new User({
          username: name,
          email: email,
          profilePic: picture,
          password: "_google_",
          // Xác định thêm các trường dữ liệu cần thiết
        });
        await user.save();
      }

      // Loại bỏ mật khẩu khỏi thông tin người dùng
      const { password: _, ...userData } = user._doc;

      console.log("Google login successfully!");

      // Trả về thông tin người dùng đã đăng nhập
      res.status(200).json(userData);
    } catch (err) {
      console.error("Error during Google login:", err);
      res.status(500).json(err.message);
    }
  }
}

module.exports = new AuthController();
