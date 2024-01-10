class uploadFileController {
  // POST
  // path = /api/upload
  uploadFile = (req, res, next) => {
    console.log(req.file);
    try {
      const file = req.file;
      if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
      }
      //   res.send(file)

      res.status(200).json("File has been uploaded");
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

module.exports = new uploadFileController();
