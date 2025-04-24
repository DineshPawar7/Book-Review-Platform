import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
<<<<<<< HEAD
import Review from "./Review";
=======
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776

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
<<<<<<< HEAD
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
=======
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
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776

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

<<<<<<< HEAD
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
=======
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
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>No book found</p>;

  return (
<<<<<<< HEAD
    <div className="max-w-4xl mx-auto p-6 bg-">
      {book.image && (
        <img
          src={`http://localhost:5000${book.image}`}
=======
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>

      {book.image && (
        <img
          src={`http://localhost:5000${book.image}`} 
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776
          alt={book.title}
          className="w-full h-96 object-cover mb-4 rounded"
        />
      )}

      <p className="text-xl font-semibold mb-2">Author: {book.author}</p>
      <p className="text-lg text-gray-600 mb-4">Published: {new Date(book.publishedDate).toLocaleDateString()}</p>
      <p className="text-gray-800 mb-6">{book.description}</p>

<<<<<<< HEAD
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
=======
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
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776
    </div>
  );
}
