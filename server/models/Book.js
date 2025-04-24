import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Book title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Book author is required'],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    publishedDate: {
      type: Date,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    image: { type: String, required: false },
    reviewCount: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 0, max: 5 },
        review: { type: String },
        createdAt: { type: Date, default: Date.now },
      }
    ]

  },
  {
    timestamps: true,
  }
);

bookSchema.methods.updateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
  } else {
    const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = totalRating / this.reviews.length;
  }
  return this.save();
};

bookSchema.index({ title: 'text', author: 'text' });
bookSchema.index({ averageRating: -1 });

const Book = mongoose.model('Book', bookSchema);
export default Book;

