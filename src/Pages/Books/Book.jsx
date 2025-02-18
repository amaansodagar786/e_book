import React from "react";
import { useParams, Link } from "react-router-dom";
import booksData from "../../data/book.json"; // Import local JSON
import "./Book.scss";

const Book = () => {
  const { category } = useParams(); // Get the category from the URL
  const books = booksData[category] || []; // Get books for the selected category

  return (
    <div className="book-list-container">
      <h1 className="book-list-title">{category} Books</h1>
      <div className="book-list-grid">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <img
              src={`/Images/${category}/${book.image.split("/").pop()}`} // Use public/Images path
              alt={book.title}
              className="book-image"
            />
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