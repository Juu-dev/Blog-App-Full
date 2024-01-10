import React, { useEffect, useState } from "react";
import avatarDefault from "../../assest/images/avatarDafault.jpg";
import axios from "axios";
import styles from "./Comments.module.scss";

const Comments = ({ user, post_id, owner_id, isGoogle }) => {
  const PF = "http://localhost:5000/images/";

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const getComments = async () => {
    try {
      const response = await axios.get(`/comments/${post_id}`);
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [post_id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const addComment = async () => {
    try {
      const response = await axios.post("/comments", {
        user_id: user._id,
        post_id,
        content: newComment,
      });
      await getComments();
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/${commentId}`);
      await getComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className={styles.commentsContainer}>
      {comments.map((comment) => (
        <div key={comment._id} className={styles.comment}>
          <img
            src={
              comment?.user?.profilePic
                ? isGoogle
                  ? comment?.user?.profilePic
                  : PF + comment?.user?.profilePic
                : avatarDefault
            }
            alt="Avatar"
            className={styles.avatar}
          />
          <div className={styles.commentContent}>
            <h4>{comment?.user?.username}</h4>
            <p>{comment.content}</p>
            {user && user._id === owner_id && (
              <button
                className={styles.deleteButton}
                onClick={() => deleteComment(comment._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}

      {user && (
        <div className={styles.newComment}>
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleCommentChange}
          />
          <button onClick={addComment}>Post</button>
        </div>
      )}
    </div>
  );
};

export default Comments;
