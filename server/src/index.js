const express = require("express");
const cors = require("cors");
const path = require("path");
// const dotenv = require("dotenv");

// Configuration cors

const database = require("./config/database");
const router = require("./routes/indexRouter");

// connect database
database.connect();

// environment variables
// dotenv.config();

const app = express();

// take content of folder build in client
const buildPath = path.join(__dirname, "..", "client", "build");
app.use(express.static(buildPath));

app.use(cors());

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/public/images")));

// Router init
router(app);

app.listen(5000, () => {
    console.log("Backend is running.");
});
