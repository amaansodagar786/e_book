import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiLike, BiSolidLike } from "react-icons/bi";
import "./LikeButton.scss";

const LikeButton = ({ category, title, userId }) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);


  console.log("Stored token:", localStorage.getItem("token"));


  // Fetch likes and check if the user has already liked the book
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        console.log("Fetching likes for:", { title, category, userId });

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/details`, {
          params: { bookTitle: title, bookCategory: category, userId },
        });

        console.log("Fetched data:", response.data);

        setLikes(response.data.likes || 0);
        setIsLiked(response.data.isLiked || false);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [category, title, userId]);

  // Handle like/unlike
  const handleLike = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Error: No token found in localStorage. User might not be logged in.");
      return;
    }
  
    try {
      console.log("Sending like request for:", { title, category, userId, token });
  
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/like`,
        { bookTitle: title, bookCategory: category, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Like response:", response.data);
  
      setIsLiked(response.data.liked);
      setLikes((prev) => (response.data.liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Error liking the book:", error);
      if (error.response) {
        console.error("Backend response:", error.response.data);
      }
    }
  };
  

  return (
    <div className="like-section">
      <button onClick={handleLike} className={isLiked ? "liked" : ""}>
        {isLiked ? <BiSolidLike /> : <BiLike />} 
        <span className="like-count">{likes}</span>
      </button>
    </div>
  );
};

export default LikeButton;
