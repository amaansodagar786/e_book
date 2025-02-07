// src/Components/CommentSection/CommentSection.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentSection = ({ category, title, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://e-book-backend-sna2.onrender.com/book/${category}/${title}/details`
        );
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [category, title]);

  // Handle adding a new comment
  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `https://e-book-backend-sna2.onrender.com/book/${category}/${title}/comment`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleComment}>Post Comment</button>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.user.name}</strong>: {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;