import styles from "./Posts.module.scss";

import Post from "../Post/Post";

export default function Posts({ posts }) {
  return (
    <div className={styles.posts}>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}
