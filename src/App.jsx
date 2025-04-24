import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'

import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import AddBook from "./pages/AddBook";
import BookDetail from './pages/BookDetailsPage';
import BookList from './pages/BookListPage';


const App = () => {
  return (
    <div>
        <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booklist" element={<BookList />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/books/add" element={<AddBook />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App