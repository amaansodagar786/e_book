import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Categories.scss";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="container">
      <h1>Book Categories</h1>
      <div className="grid">
        {categories.map((category, index) => (
          <Link
            to={`/categories/${category.categoryName.toLowerCase()}`}
            key={index}
            className="category-card"
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