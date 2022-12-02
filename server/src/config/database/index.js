const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connect() {
    try {
        await mongoose.connect("mongodb://localhost:27017/Blog", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect successfully!");
    } catch (error) {
        console.log("Connect Failure!");
    }
}

module.exports = { connect };
