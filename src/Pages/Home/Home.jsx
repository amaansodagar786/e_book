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
        <h1>Welcome to Our E-Book App</h1>
        <p>Your one-stop destination for reading amazing books online.</p>
      </section>

      {/* Project Name and Features */}
      <section className="features-section">
        <h2>Project Name: E-Book Application</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Explore Categories</h3>
            <p>Discover books in Children, Fictional, and Horror categories.</p>
          </div>
          <div className="feature-card">
            <h3>Read Online</h3>
            <p>Read books directly in your browser without downloading.</p>
          </div>
          <div className="feature-card">
            <h3>User-Friendly</h3>
            <p>Easy navigation and responsive design for all devices.</p>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="project-details">
        <h2>Project Details</h2>
        <div className="details-grid">
          <div className="detail-card">
            <h3>Frontend</h3>
            <ul>
              <li>React.js</li>
              <li>React Router</li>
              <li>Axios for API calls</li>
              <li>SCSS for styling</li>
            </ul>
          </div>
          <div className="detail-card">
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>Express.js</li>
              <li>MongoDB for database</li>
              <li>JWT for authentication</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <h3>Student 1</h3>
            <p>Enrollment: 123456</p>
          </div>
          <div className="team-card">
            <h3>Student 2</h3>
            <p>Enrollment: 654321</p>
          </div>
          <div className="team-card">
            <h3>Student 3</h3>
            <p>Enrollment: 987654</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;