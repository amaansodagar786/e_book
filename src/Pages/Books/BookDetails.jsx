import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import booksData from "../../data/book.json";
import "./BookDetails.scss";
import { IoArrowBack } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import LikeButton from "../../Components/LikeComment/LikeButton";
import CommentSection from "../../Components/LikeComment/CommentSection";

const BookDetails = () => {
  const { category, title } = useParams();
  const navigate = useNavigate();
  const [showChapters, setShowChapters] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const userId = localStorage.getItem("userId");

  const book = booksData[category]?.find(
    (b) => b.title.toLowerCase() === title.toLowerCase()
  );


  useEffect(() => {
    if (showCommentModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [showCommentModal]);


  const scrollToChapter = (chapterId) => {
    const chapterElement = document.getElementById(chapterId);
    if (chapterElement) {
      chapterElement.scrollIntoView({ behavior: "smooth" });
      setShowChapters(false);
    }
  };

  if (!book) {
    return <div className="loading">Book not found</div>;
  }

  return (
    <div className="book-details-container">

      <div className="header-row">
        <button className="back-button" onClick={() => navigate(-1)}>
          <IoArrowBack size={24} />
        </button>
        <h1 className="book-title">{book.title}</h1>
        <button
          className="toggle-chapters-button"
          onClick={() => setShowChapters(!showChapters)}
        >
          {showChapters ? <IoMdClose className="close-icon" />
            : <MdMenu className="close-icon" />}
        </button>
      </div>

      <div className="book-content">

        <div className="chapter1">

          <p>{book.content}</p>
        </div>

      </div>

      <div className="book-content">
        {book.chapters.map((chapter, index) => (
          <div key={index} id={`chapter-${index}`} className="chapter">

            <p>{chapter.content}</p>
          </div>
        ))}
      </div>

      {showChapters && (
        <div className="chapters-sidebar">
          {book.chapters.map((chapter, index) => (
            <button
              key={index}
              className="chapter-button"
              onClick={() => scrollToChapter(`chapter-${index}`)}
            >
              {chapter.title}
            </button>
          ))}
        </div>
      )}

      <div className="like-comment-section">
        <LikeButton category={category} title={title} userId={userId} />

        <button className="comment-button" onClick={() => setShowCommentModal(true)}>
          Comment
        </button>

        <button
  className="share-button"
  onClick={() => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out this book: ${book.title}`,
        url: window.location.href,
      }).catch((error) => console.log("Sharing failed", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("URL copied to clipboard!");
    }
  }}
>
  Share
</button>
      </div>

      {showCommentModal && (
        <div className="comment-modal-overlay" onClick={() => setShowCommentModal(false)}>
          <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowCommentModal(false)}>X</button>
            <CommentSection category={category} title={title} userId={userId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
