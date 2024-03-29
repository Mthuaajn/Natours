const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const sanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
dotenv.config({ path: './config.env' });
const ErrorHandlerController = require('./controllers/ErrorController.js');
const tourRouter = require('./routers/tourRouter.js');
const userRouter = require('./routers/userRouter.js');
const reviewRouter = require('./routers/reviewRoute.js');
const viewRouter = require('./routers/ViewRoute.js');
const bookingRouter = require('./routers/bookingRoute.js');
const appError = require('./utils/appError.js');
const cookiesParser = require('cookie-parser');
const app = express();
const compression = require('compression');
process.noDeprecation = true;

app.enable('trust proxy');
// set view pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// 1) global middleware
// middleware set security headers
app.use(helmet());
app.use(cors());
const allowedDomains = [
  "'self'",
  'https://api.mapbox.com',
  'https://events.mapbox.com',
  'https://cdnjs.cloudflare.com',
  'http://localhost:3000',
  'https://js.stripe.com',
];

// Cấu hình CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", ...allowedDomains],
      connectSrc: ["'self'", ...allowedDomains],
      workerSrc: ["'self'", 'blob:'],
    },
  })
);

// middleware against nosql injection
app.use(sanitize());
// middleware against html injection db
app.use(xss());
// middleware preventing parameter pollutions
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'price',
      'difficulty',
    ],
  })
);

app.use(compression());
// middleware write log production and dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parse reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // gioi han luong du lieu la 10kb
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// limit request from same api
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many request from this ip, please try again in an hour',
});

app.use('/api', limiter);

// test api
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRouter);

// Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);
app.all('*', (req, res, next) => {
  next(new appError(`Can not find ${req.originalUrl} on server`, 404));
});

app.use(ErrorHandlerController);
module.exports = app;
