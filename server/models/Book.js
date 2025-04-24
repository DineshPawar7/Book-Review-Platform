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
<<<<<<< HEAD
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
=======
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    image: { type: String, required: false },
    reviewCount: {
        type: Number,
        default: 0,
    }
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776
  },
  {
    timestamps: true,
  }
);

<<<<<<< HEAD
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
=======
bookSchema.index({ title: 'text', author: 'text' }); 
bookSchema.index({ averageRating: -1 });

const Book = mongoose.model('Book', bookSchema);
export default Book;
>>>>>>> b551c7efd10fbfb178189831c0d4033b91215776
