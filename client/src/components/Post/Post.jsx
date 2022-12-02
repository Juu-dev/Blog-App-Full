import { Link } from "react-router-dom";

import styles from "./Post.module.scss";

export default function Post({ post }) {
    const PF = "http://localhost:5000/images/";
    return (
        <div className={styles.post}>
            {post.photo && (
                <img className={styles.postImg} src={PF + post.photo} alt="" />
            )}
            <div className={styles.postInfo}>
                <div className={styles.postCats}>
                    {post.categories.map((category) => {
                        <span className={styles.postCat}>
                            <Link
                                className="link"
                                to={`/posts?cat=${category.name}`}
                            >
                                {category.name}
                            </Link>
                        </span>;
                    })}
                </div>
                <span className={styles.postTitle}>
                    <Link to={`/post/${post._id}`} className="link">
                        {post.title}
                    </Link>
                </span>
                <hr />
                <span className={styles.postDate}>
                    {new Date(post.createAt).toDateString()}
                </span>
            </div>
            <p className={styles.postDesc}>{post.desc}</p>
        </div>
    );
}
