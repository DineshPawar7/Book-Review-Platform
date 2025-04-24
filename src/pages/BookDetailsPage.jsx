import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Review from "./Review";


const renderStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
        &#9733;
      </span>
    );
  }
  return stars;
};

export default function BookDetail() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);

  const fetchBookDetails = async () => {
    try {
      const response = await api.get(`/books/${bookId}`);
      setBook(response.data.data);
      setReviews(response.data.data.reviews || []);
    } catch (err) {
      setError("Failed to fetch book details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [bookId]);

  const handleReviewSubmit = async () => {
    try {
      const response = await api.post(
        `/books/${bookId}/review`,
        { rating, review },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setReviews([...reviews, response.data.book.reviews]);
      setReview("");
      setRating(5);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>No book found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-">
      {book.image && (
        <img
          src={`http://localhost:5000${book.image}`}

          alt={book.title}
          className="w-full h-96 object-cover mb-4 rounded"
        />
      )}

      <p className="text-xl font-semibold mb-2">Author: {book.author}</p>
      <p className="text-lg text-gray-600 mb-4">Published: {new Date(book.publishedDate).toLocaleDateString()}</p>
      <p className="text-gray-800 mb-6">{book.description}</p>

      <div className="flex items-center space-x-2 mb-4">
        {renderStars(book.averageRating)}
        <span className="text-sm text-gray-500">{book.reviewCount} reviews</span>
      </div>

      <div className="mb-6">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="flex space-x-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? 'text-yellow-500 cursor-pointer' : 'text-gray-300 cursor-pointer'}
            >
              &#9733;
            </span>
          ))}
        </div>
        <button
          onClick={handleReviewSubmit}
          disabled={!review || !rating}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300"
        >
          Submit Review
        </button>
      </div>

      <Review reviews={reviews} />

    </div>
  );
}
