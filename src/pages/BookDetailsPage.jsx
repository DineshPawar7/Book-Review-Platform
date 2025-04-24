import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

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
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5); 
  const [user, setUser] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (e) {
      console.error("Error parsing user data:", e);
      return null;
    }
  });
  const [submittingReview, setSubmittingReview] = useState(false);

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim() && !rating) return; 
 
    setSubmittingReview(true);
 
    try {
      const token = localStorage.getItem("authToken");
      console.log('Submitting Review for Book ID: ', bookId); 
 
      const response = await api.post(
        `/reviews`, 
        { 
          book: bookId,  
          comment: review,
          rating
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
 
      setReviews([...reviews, response.data]);
      setReview(""); 
      setRating(5); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to submit your review. Please try again.";
      setError(errorMessage);
    } finally {
      setSubmittingReview(false);
    }
 };
 
 



  useEffect(() => {
    fetchBookDetails(); 
  }, [bookId]);

  const isSubmitDisabled = !(review.trim() || rating);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>No book found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>

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

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded">
              <p className="text-gray-900 font-semibold">
                {review.user?.name || 'Anonymous'}
              </p>

              <div className="flex mb-2">
                {renderStars(review.rating)} 
              </div>

              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>

        {user ? (
          <form onSubmit={handleReviewSubmit} className="mt-4">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-2 border rounded"
              rows="4"
            />

            <div className="mt-4">
              <label className="block text-gray-700">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded"
              disabled={submittingReview || isSubmitDisabled}
            >
              {submittingReview ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        ) : (
          <p className="mt-4 text-gray-600">Please log in to leave a review.</p>
        )}
      </div>
    </div>
  );
}
