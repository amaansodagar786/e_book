import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import booksData from "../../data/book.json";
import "./BookDetails.scss";
import { IoArrowBack } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FiUpload } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import LikeButton from "../../Components/LikeComment/LikeButton";
import CommentSection from "../../Components/LikeComment/CommentSection";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";


const BookDetails = () => {
  const { category, title } = useParams();
  const navigate = useNavigate();
  const [showChapters, setShowChapters] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [bookName, setBookName] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookFile, setBookFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const userId = localStorage.getItem("userId");

  const book = booksData[category]?.find(
    (b) => b.title.toLowerCase() === title.toLowerCase()
  );

  useEffect(() => {
    if (showCommentModal || showUploadModal) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [showCommentModal, showUploadModal]);

  const scrollToChapter = (chapterId) => {
    const chapterElement = document.getElementById(chapterId);
    if (chapterElement) {
      chapterElement.scrollIntoView({ behavior: "smooth" });
      setShowChapters(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB");
    } else {
      setBookFile(file);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!bookName || !bookCategory || !bookFile) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("name", bookName);
    formData.append("category", bookCategory);
    formData.append("file", bookFile);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload-book`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSnackbar({ open: true, message: "Book uploaded successfully!", severity: "success" });
        setShowUploadModal(false);
        resetForm();
      } else {
        setSnackbar({ open: true, message: "Failed to upload book", severity: "error" });
        resetForm();
      }
    } catch (err) {
      setSnackbar({ open: true, message: "Server error", severity: "error" });
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBookName("");
    setBookCategory("");
    setBookFile(null);
    setError("");
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
        <div className="header-buttons">

          <button
            className="upload-button"
            onClick={() => setShowUploadModal(true)}
          >
            <FiUpload />

          </button>

          <button
            className="toggle-chapters-button"
            onClick={() => setShowChapters(!showChapters)}
          >
            {showChapters ? <IoMdClose className="close-icon" /> : <MdMenu className="close-icon" />}
          </button>

        </div>
      </div>

      <div className="book-content">
        <div className="chapter1">
          <p>{book.content}</p>
        </div>
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

      {showUploadModal && (
        <div className="upload-modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowUploadModal(false)}>X</button>
            <h2>Upload Book</h2>
            <form>
              <input
                type="text"
                placeholder="Book Name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={bookCategory}
                  onChange={(e) => setBookCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="Children">Children</MenuItem>
                  <MenuItem value="Horror">Horror</MenuItem>
                  <MenuItem value="Fictional">Fictional</MenuItem>
                </Select>
              </FormControl>

              
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
              {error && <p className="error">{error}</p>}
              <button type="button" onClick={handleUpload} disabled={loading}>
                {loading ? <CircularProgress size={20} /> : "Upload"}
              </button>
            </form>
          </div>
        </div>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 9999 }} // Add zIndex here
      />

    </div>
  );
};

export default BookDetails;