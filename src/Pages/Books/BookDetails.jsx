import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookDetails.scss";
import { IoArrowBack } from "react-icons/io5"; // Import back icon

const BookDetails = () => {
  const { category, title } = useParams(); // Get book details from URL
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const userId = localStorage.getItem("userId"); // Get user ID from localStorage


  useEffect(() => {
    axios
      .get(`https://e-book-backend-sna2.onrender.com/book/${category}/${title}`)
      .then((response) => {
        console.log(response.data); // Check if you're getting the book data here
        setBook(response.data);
      })
      .catch((error) => console.error("Error fetching book details:", error));
  }, [category, title]);

  if (!book) {
    return <div className="loading">Loading book details...</div>;
  }


  return (
    <div className="book-details-container">
      <div className="book-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoArrowBack size={24} />
        </button>
        <h1 className="book-title">{book.title}</h1>
      </div>
      <div className="book-content">{book.content}</div>

      <LikeButton category={category} title={title} userId={userId} />

      {/* Comment Section */}
      <CommentSection category={category} title={title} userId={userId} />
    </div>
  );
};

export default BookDetails;