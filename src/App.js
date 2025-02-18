import React, {  useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Authentication/Register';
import Login from './Pages/Authentication/Login';
import Categories from './Pages/Category/Categories';
import Book from './Pages/Books/Book';
import BookDetails from './Pages/Books/BookDetails';
import ProtectedRoute  from './Components/Protected/ProtectedRoute';
import Gototop  from './Pages/Gototop/Gototop';


function App() {

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token validity
          await axios.get(`${process.env.REACT_APP_API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (error) {
          // Token is invalid/expired
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('email');
        }
      }
    };
    checkAuth();
  }, []);


  return (
    <BrowserRouter>
    <Gototop />
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />



        <Route element={<ProtectedRoute />}>
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Book />} />
          <Route path="/book/:category/:title" element={<BookDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
