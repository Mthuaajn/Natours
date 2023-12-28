const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'tour must have review'],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    rating: {
      type: String,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'reviews must belong to have user'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'reviews must belong to have tour'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ReviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  }).populate({
    path: 'tour',
    select: 'name',
  });
  next();
});
const review = mongoose.model('Reviews', ReviewSchema);
module.exports = review;
