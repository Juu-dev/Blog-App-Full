import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import styles from "./SinglePost.module.scss";

import { Context } from "../../context/Context";

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const PF = "http://localhost:5000/images/";

    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        };
        getPost();
    }, [location]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: { username: user.username },
            });
            window.location.replace("/");
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        } catch (err) {}
    };

    return (
        <div className={styles.singlePost}>
            <div className={styles.singlePostWrapper}>
                {console.log(post.photo)}
                {post.photo && (
                    <img
                        className={styles.singlePostImg}
                        src={PF + post.photo}
                        alt="Personal Blog"
                    />
                )}
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className={styles.singlePostTitleInput}
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className={styles.singlePostTitle}>
                        {title}
                        {post.username === user.username && (
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
                            <Link
                                className="link"
                                to={`/?user=${post.username}`}
                            >
                                {post.username}
                            </Link>
                        </b>
                    </span>
                    <span className={styles.singlePostDate}>
                        {new Date(post.createAt).toDateString()}
                    </span>
                </div>

                {updateMode ? (
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                ) : (
                    <p className="singlePostDesc">{desc}</p>
                )}

                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}
