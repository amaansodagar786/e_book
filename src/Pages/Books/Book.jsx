import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Book.scss"; // Import the SCSS file

const Book = () => {
  const { category } = useParams(); // Get the category from the URL
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books for the selected category
    axios
      .get(`http://localhost:4000/books/${category}`)
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, [category]);

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">{category} Books</h1>
      <div className="book-list-grid">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img src={book.image} alt={book.title} className="book-image" />
            <div className="book-details">
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">By {book.author}</p>
              <Link to={`/book/${category}/${book.title}`} className="book-link">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Book;