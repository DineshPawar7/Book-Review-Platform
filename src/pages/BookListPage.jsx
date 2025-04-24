import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState(""); 

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      console.log("Books response:", response.data);

      const booksArray = Array.isArray(response.data.data?.books)
        ? response.data.data.books
        : [];

      setBooks(booksArray);
      setFilteredBooks(booksArray);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) => {
      const matchesTitle = book.title.toLowerCase().startsWith(searchTerm.toLowerCase());
      const matchesLanguage = selectedLanguage ? book.language === selectedLanguage : true;
      const matchesCategory = selectedCategory ? book.category === selectedCategory : true;

      return matchesTitle && matchesLanguage && matchesCategory;
    });
    setFilteredBooks(filtered);
  }, [searchTerm, selectedLanguage, selectedCategory, books]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Books Library</h1>

      <div className="flex space-x-4 mb-6">
        <input
          type="text"
          placeholder="Search by book title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select Language</option>
          <option value="English">English</option>
          <option value="Marathi">Marathi</option>
          <option value="Hindi">Hindi</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select Category</option>
          <option value="Comedy">Comedy</option>
          <option value="Education">Education</option>
          <option value="Motivation">Motivation</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading books...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-gray-500">No books found matching your search criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Link to={`/book/${book._id}`} key={book._id}>
              <div className="bg-white border p-4 rounded shadow">
                {book.image && (
                  <img
                    src={`http://localhost:5000${book.image}`}
                    alt={book.title}
                    className="w-full h-48 object-cover mb-4 rounded"
                  />
                )}
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p className="text-gray-700">Author: {book.author}</p>
                <p className="text-gray-600 text-sm mb-2">
                  Published:{" "}
                  {new Date(book.publishedDate).toLocaleDateString()}
                </p>
                <p className="text-gray-800">{book.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
