// src/Components/LikeButton/LikeButton.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const LikeButton = ({ category, title, userId }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch likes and check if the user has already liked the book
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `https://e-book-backend-sna2.onrender.com/book/${category}/${title}/details`
        );
        setLikes(response.data.likes);
        setIsLiked(response.data.likes.includes(userId));
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [category, title, userId]);

  // Handle like/unlike
  const handleLike = async () => {
    try {
      const response = await axios.post(
        `https://e-book-backend-sna2.onrender.com/book/${category}/${title}/like`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setLikes(response.data.liked ? likes + 1 : likes - 1);
      setIsLiked(response.data.liked);
    } catch (error) {
      console.error("Error liking the book:", error);
    }
  };

  return (
    <div className="like-section">
      <button onClick={handleLike}>
        {isLiked ? "Unlike" : "Like"} ({likes})
      </button>
    </div>
  );
};

export default LikeButton;