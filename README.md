# Blog app with Reactjs

This project is not my idea.

I learned from a pro dev who named **Lama dev**.

This is his youtube channel: (https://www.youtube.com/c/LamaDev)

## Several convention about how to folder/file named

-   FrontEnd:

    -   Folder named by camelcase contain directly file .jsx and .scss. This folder has the same name as the file inside.
    -   Folder named by lowercase is only contained folder
    -   File .js and .scss in same folder must same name. They combine to form component of Blog

    -   components: contain file with extension is .jsx and .scss
    -   pages: contain file with extension is .jsx and .scss

-   BackEnd:

    -   Folder named by lowercase is only contained folder
    -   File in models folder named with first letter uppercase
    -   Other files named by lowercase

    -   Folder routes: file named by camelcase
    -   Folder controllers: file named by camelcase
    -   Folder models: file named with the first letter is uppercase

## Technologies and props

-   FrontEnd:
    -   React.js
    -   react-router-dom
    -   Sass/Scss (module)
    -   Axios
    -   Web-vitals
-   BackEnd:
    -   express (minimalist web framework for node)
    -   mongoose (Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks)
    -   nodemon (Automatically restarting the node application when file changes in the directory are detected)
    -   multer (used for uploading files)
    -   dotenv (Supports environment variable)
-   Database:
    -   MongoDB

## Structuring file/folder of project

```
|-- node-blog
|           |-- app
|                   |-- controllers
|                               |-- authController.js
|                               |-- categoriesController.js
|                               |-- postsController.js
|                               |-- uploadFileController.js
|                               |-- usersController.js
|                   |-- models
|                               |-- Categories.js
|                               |-- Post.js
|                               |-- User.js
|           |-- config
|                   |-- database
|                               |-- index.js (**)
|                   |-- uploadFile
|                               |-- index.js (**)
|           |-- public
|                   |-- images
|           |-- src
|                   |-- routes
|                               |-- authRouter.js
|                               |-- categoriesRouter.js
|                               |-- indexRouter.js (**)
|                               |-- postsRouter.js
|                               |-- uploadFileRouter.js
|                               |-- usersRouter.js
|                   |-- index.js (***)
|           |-- .env
|
|
|-- react-blog
|           |-- public
|                   |-- index.html
|           |-- src
|                   |-- component
|                             |-- Categories
|                                         |-- Categories.jsx
|                                         |-- Categories.module.scss
|                             |-- Header
|                                         |-- Header.jsx
|                                         |-- Header.module.scss
|                             |-- Post
|                                         |-- Post.jsx
|                                         |-- Post.module.scss
|                             |-- Posts
|                                         |-- Posts.jsx
|                                         |-- Posts.module.scss
|                             |-- SideBar
|                                         |-- SideBar.jsx
|                                         |-- SideBar.module.scss
|                             |-- SinglePost
|                                         |-- SinglePost.jsx
|                                         |-- SinglePost.module.scss
|                             |-- TopBar
|                                         |-- TopBar.jsx
|                                         |-- TopBar.module.scss
|                   |-- GlobalStyles
|                             |-- GlobalStyles.jsx
|                             |-- GlobalStyles.scss
|                   |-- pages
|                             |-- HomePage
|                                         |-- HomePage.jsx
|                                         |-- HomePage.module.scss
|                             |-- Login
|                                         |-- Login.jsx
|                                         |-- Login.module.scss
|                             |-- Register
|                                         |-- Register.jsx
|                                         |-- Register.module.scss
|                             |-- Settings
|                                         |-- Settings.jsx
|                                         |-- Settings.module.scss
|                             |-- Single
|                                         |-- Single.jsx
|                                         |-- Single.module.scss
|                             |-- Write
|                                         |-- Write.jsx
|                                         |-- Write.module.scss
|                   |-- index.js
|                   |-- .gitignore
|-- README.md
```
