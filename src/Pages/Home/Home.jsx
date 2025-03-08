import React, { useEffect, useState } from "react";
import "./Home.scss";

const Home = () => {
  // State to store the values fetched from localStorage
  const [userData, setUserData] = useState({
    token: null,
    userId: null,
    email: null,
  });

  useEffect(() => {
    // Fetch token, userId, and email from localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');

    // Update the state with the retrieved values
    if (token && userId && email) {
      setUserData({ token, userId, email });
      console.log({ token, userId, email });
    }
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to the World of E-Books</h1>
        <p>Discover a new way to read and explore your favorite books anytime, anywhere.</p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose E-Books?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Convenience</h3>
            <p>Access thousands of books on your device without the need for physical storage.</p>
          </div>
          <div className="feature-card">
            <h3>Portability</h3>
            <p>Carry your entire library in your pocket and read on the go.</p>
          </div>
          <div className="feature-card">
            <h3>Eco-Friendly</h3>
            <p>Reduce paper usage and contribute to a greener planet.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Benefits of E-Books</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Instant Access</h3>
            <p>Download or start reading your favorite books instantly after purchase.</p>
          </div>
          <div className="benefit-card">
            <h3>Customizable Reading</h3>
            <p>Adjust font size, brightness, and background color for a personalized reading experience.</p>
          </div>
          <div className="benefit-card">
            <h3>Cost-Effective</h3>
            <p>E-books are often cheaper than their printed counterparts, saving you money.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <h3>Step 1: Sign Up</h3>
            <p>Create an account to get started with your e-book journey.</p>
          </div>
          <div className="step-card">
            <h3>Step 2: Explore</h3>
            <p>Browse through a wide range of genres and categories to find your next read.</p>
          </div>
          <div className="step-card">
            <h3>Step 3: Read</h3>
            <p>Start reading your chosen book instantly on any device.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;