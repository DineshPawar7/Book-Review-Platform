import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";


const mockBooks = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    rating: 4.5,
    image: "https://via.placeholder.com/150",
    description:
      "A philosophical book that tells the story of a young shepherd on a journey to find his personal legend.",
    reviews: [
      { user: "Alice", comment: "Inspirational read!", stars: 5 },
      { user: "Bob", comment: "Enjoyable and deep.", stars: 4 },
    ],
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
    description:
      "A practical guide on how to build good habits and break bad ones with scientific insights.",
    reviews: [
      { user: "Charlie", comment: "Life-changing!", stars: 5 },
      { user: "Dave", comment: "Very insightful.", stars: 4 },
    ],
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
    description:
      "A practical guide on how to build good habits and break bad ones with scientific insights.",
    reviews: [
      { user: "Charlie", comment: "Life-changing!", stars: 5 },
      { user: "Dave", comment: "Very insightful.", stars: 4 },
    ],
  },
  {
    id: 4,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
    description:
      "A practical guide on how to build good habits and break bad ones with scientific insights.",
    reviews: [
      { user: "Charlie", comment: "Life-changing!", stars: 5 },
      { user: "Dave", comment: "Very insightful.", stars: 4 },
    ],
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
    description:
      "A practical guide on how to build good habits and break bad ones with scientific insights.",
    reviews: [
      { user: "Charlie", comment: "Life-changing!", stars: 5 },
      { user: "Dave", comment: "Very insightful.", stars: 4 },
    ],
  },
  {
    id: 6,
    title: "Atomic Habits",
    author: "James Clear",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
    description:
      "A practical guide on how to build good habits and break bad ones with scientific insights.",
    reviews: [
      { user: "Charlie", comment: "Life-changing!", stars: 5 },
      { user: "Dave", comment: "Very insightful.", stars: 4 },
    ],
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  const filteredBooks = mockBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Input
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6"
      />

      {selectedBook ? (
        <div className="space-y-4">
          <img
            src={selectedBook.image}
            alt={selectedBook.title}
            className="w-48 h-64 object-cover"
          />
          <h2 className="text-2xl text-text font-bold">{selectedBook.title}</h2>
          <p className="text-lg text-hover">By {selectedBook.author}</p>
          <p className="text-text">Rating: {selectedBook.rating} ⭐</p>
          <p className="mt-4 text-text">{selectedBook.description}</p>

          <div className="mt-6">
            <h3 className="text-xl text-text font-semibold">Reviews:</h3>
            {selectedBook.reviews.map((review, index) => (
              <div key={index} className="border-b border-t border-border py-2">
                <p className="font-medium text-hover">{review.user}</p>
                <p className="text-sm text-text">{review.comment}</p>
                <p className="text-hover">{'⭐'.repeat(review.stars)}</p>
              </div>
            ))}
            <Button onClick={() => setSelectedBook(null)} className="mt-4">
              Back to Home
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-sm text-text">By {book.author}</p>
                <p className="text-hover">Rating: {book.rating} ⭐</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-btn text-text hover:bg-hover"
                  onClick={() => setSelectedBook(book)}
                ><h1>See More</h1>
                  
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
