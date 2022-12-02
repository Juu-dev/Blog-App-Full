const express = require("express");

const uploadFileController = require("../app/controllers/uploadFileController");
const { upload } = require("../config/uploadFile");

const router = express.Router();

// UPLOAD FILE
router.post("/", upload.single("file"), uploadFileController.uploadFile);

module.exports = router;
