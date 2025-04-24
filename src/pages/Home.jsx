import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import api from "../services/api";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

<<<<<<< HEAD

=======
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776
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
    const filtered = books.filter((book) =>
      book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchTerm, books]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Books Library</h1>

      <input
        type="text"
        placeholder="Search by book title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 mb-6"
      />

      {loading ? (
        <p className="text-gray-500">Loading books...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredBooks.length === 0 ? (
        <p className="text-gray-500">No books found matching your search.</p>
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
<<<<<<< HEAD

          
=======
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776
        </div>
      )}
    </div>
  );
}
