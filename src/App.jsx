import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Header from './components/Header'
=======
import Header from './components/common/Header'
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import AddBook from "./pages/AddBook";
import BookDetail from './pages/BookDetailsPage';
<<<<<<< HEAD
import BookList from './pages/BookListPage';
=======
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776

const App = () => {
  return (
    <div>
        <Router>
        <Header />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Home />} />
        <Route path="/booklist" element={<BookList />} />
=======
        <Route path="/home" element={<Home />} />
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776
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