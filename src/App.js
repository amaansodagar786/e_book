import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Authentication/Register';
import Login from './Pages/Authentication/Login';
import Categories from './Pages/Category/Categories';
import Book from './Pages/Books/Book';
import BookDetails from './Pages/Books/BookDetails';


function App() {
  return (
    <BrowserRouter>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category" element={<Book />} />
        <Route path="book/:category/:title" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
