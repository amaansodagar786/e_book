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
    </div>
  );
};

export default Home;