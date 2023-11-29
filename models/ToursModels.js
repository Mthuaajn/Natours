const mongoose = require('mongoose');
const slug = require('slugify');
const TourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      minlength: [10, 'A tour name must have more or equal than 10 characters'],
      maxlength: [40, 'a tour name must have less or equal than 40 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a durations'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'a tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficult is either: easy,medium,difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [1, 'rating must be above 1.0'],
      max: [5, 'rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validator: {
        validate: function (val) {
          // this only points to current doc on New document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'a tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'a tour must have a cover image'],
    },
    images: [String],
    createAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// document middleware
TourSchema.pre('save', function (next) {
  this.slug = slug(this.name, { lower: true });
  next();
});

// TourSchema.pre('save', function (next) {
//   console.log('will save document...');
//   next();
// });

// TourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// query middleware
TourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
TourSchema.post(/^find/, function (docs, next) {
  console.log(`query tool ${Date.now() - this.start} milliseconds`);
  console.log(docs);
  next();
});

TourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

TourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
const tour = mongoose.model('Tour', TourSchema);

module.exports = tour;