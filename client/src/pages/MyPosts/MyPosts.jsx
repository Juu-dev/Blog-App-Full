import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

import styles from "./MyPosts.module.scss";

import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import SideBar from "../../components/SideBar/SideBar";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  //   const { userId } = useLocation();
  const { userId } = useParams();

  console.log("userId: ", userId);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/my-posts/" + userId);
      setPosts(res.data);

      console.log("PATH: ", "/posts/my-posts/" + userId);

      console.log("res.data: ", res.data);
    };
    fetchPosts();
  }, [userId]);

  return (
    <div>
      <div className={styles.home}>
        {posts.length > 0 ? <Posts posts={posts} /> : <h2>No posts</h2>}
      </div>
    </div>
  );
}
