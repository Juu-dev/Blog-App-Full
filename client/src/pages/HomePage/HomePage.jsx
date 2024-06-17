import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import styles from "./HomePage.module.scss";

import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Header />
      <div className={styles.home}>
        <Posts posts={posts} />
      </div>
    </div>
  );
}
