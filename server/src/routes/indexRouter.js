const authRouter = require("./authRouter");
const usersRouter = require("./usersRouter");
const postsRouter = require("./postsRouter");
const categoriesRouter = require("./categoriesRouter");
const uploadFileRouter = require("./uploadFileRouter");

function router(app) {
    app.use("/api/auth", authRouter);
    app.use("/api/users", usersRouter);
    app.use("/api/posts", postsRouter);
    app.use("/api/categories", categoriesRouter);
    app.use("/api/upload", uploadFileRouter);
}

module.exports = router;
