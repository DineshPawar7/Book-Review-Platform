import mongoose from 'mongoose';
import Book from './Book.js';

const reviewSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Review must belong to a book'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ book: 1, user: 1 }, { unique: true });

reviewSchema.statics.calculateAverageRatings = async function (bookId) {
    const stats = await this.aggregate([
        {
            $match: { book: bookId }
        },
        {
            $group: {
                _id: '$book',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        if (stats.length > 0) {
            await Book.findByIdAndUpdate(bookId, {
                reviewCount: stats[0].nRating,
                averageRating: stats[0].avgRating.toFixed(1) 
            });
        } else {
            await Book.findByIdAndUpdate(bookId, {
                reviewCount: 0,
                averageRating: 0
            });
        }
    } catch (err) {
        console.error("Error updating book ratings:", err);
    }
};

reviewSchema.post('save', function () {
  this.constructor.calculateAverageRatings(this.book);
});


reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.r = await this.model.findOne(this.getQuery());
    next();
});

reviewSchema.post(/^findOneAnd/, async function () {
    if (this.r) {
        await this.r.constructor.calculateAverageRatings(this.r.book);
    }
});


const Review = mongoose.model('Review', reviewSchema);
export default Review;