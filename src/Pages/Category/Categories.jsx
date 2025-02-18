import React from "react";
import { Link } from "react-router-dom";
import booksData from "../../data/book.json"; // Import local JSON
import "./Categories.scss";

const Categories = () => {
  const categories = Object.keys(booksData.categories).map((key) => ({
    categoryName: booksData.categories[key].name,
    imageURL: `/Images/Categories/${booksData.categories[key].image.split("/").pop()}`, // Use public/Images path
  }));

  return (
    <div className="container">
      <h1>Book Categories</h1>
      <div className="grid">
        {categories.map((category, index) => (
          <Link
            to={`/categories/${category.categoryName.toLowerCase()}`}
            key={index}
            className="category-card"
            style={{ textDecoration: "none" }} 
          >
            <img src={category.imageURL} alt={category.categoryName} />
            <h2>{category.categoryName}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;