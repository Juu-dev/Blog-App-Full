import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";

import { useEffect, useState, useContext, useRef, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import RenderHTML from "../RenderHTML/RenderHTML";
import Comments from "../Comments/Comments";

import styles from "./SinglePost.module.scss";

import { Context } from "../../context/Context";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random?wallpapers",
  imageText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const PF = "http://localhost:5000/images/";

  const [post, setPost] = useState({});
  const { user, isGoogle } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
    }),
    []
  );

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res?.data);
      setTitle(res?.data?.title_post);
      setDesc(res?.data?.desc);
    };
    getPost();
  }, [location]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post?._id}`, {
        data: { username: user?.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post?._id}`, {
        username: user?.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container style={{ maxWidth: "100%" }} sx={{ mt: 2 }}>
        <main>
          <MainFeaturedPost
            post={{
              ...mainFeaturedPost,
              image: PF + post?.photo,
              title: title,
            }}
          />
          {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid> */}
          <Grid container spacing={5} width={"100%"} sx={{ mt: 3, ml: 0 }}>
            <div className={styles.singlePost}>
              <div className={styles.singlePostWrapper}>
                {updateMode ? (
                  <input
                    type="text"
                    value={title}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    className={styles.singlePostTitle}
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <h1 className={styles.singlePostTitle}>
                    {title}
                    {post?.username === user?.username && (
                      <div className={styles.singlePostEdit}>
                        <i
                          className={`${styles.singlePostIcon} far fa-edit`}
                          onClick={() => {
                            setUpdateMode(true);
                          }}
                        ></i>
                        <i
                          className={`${styles.singlePostIcon} far fa-trash-alt`}
                          onClick={handleDelete}
                        ></i>
                      </div>
                    )}
                  </h1>
                )}

                <div className={styles.singlePostInfo}>
                  <span>
                    Author:
                    <b className={styles.singlePostAuthor}>
                      <Link className="link" to={`/?user=${post?.username}`}>
                        {post?.username}
                      </Link>
                    </b>
                  </span>
                  <span className={styles.singlePostDate}>
                    {new Date(post?.createdAt).toDateString()}
                  </span>
                </div>

                {updateMode ? (
                  <JoditEditor
                    ref={editor}
                    value={desc}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setDesc(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => setDesc(newContent)}
                  />
                ) : (
                  <div className="singlePostDesc">
                    <RenderHTML htmlString={desc} />
                  </div>
                )}

                {updateMode && (
                  <div
                    style={{
                      width: "100%",
                      textAlign: "right",
                      marginTop: "20px",
                    }}
                  >
                    <button className={styles.button_7} onClick={handleUpdate}>
                      Update
                    </button>
                  </div>
                )}
              </div>
              {user && (
                <Comments
                  user={user}
                  post_id={path}
                  owner_id={post.user_id}
                  isGoogle={isGoogle}
                />
              )}
            </div>
          </Grid>
        </main>
      </Container>
      {/* <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}
    </ThemeProvider>
  );
}
