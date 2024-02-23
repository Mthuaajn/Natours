const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const sanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
dotenv.config({ path: './config.env' });
const ErrorHandlerController = require('./controllers/ErrorController.js');
const tourRouter = require('./routers/tourRouter.js');
const userRouter = require('./routers/userRouter.js');
const reviewRouter = require('./routers/reviewRoute.js');
const viewRouter = require('./routers/ViewRoute.js');
const appError = require('./utils/appError.js');
const app = express();
process.noDeprecation = true;

// set view pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// 1) global middleware
// middleware set security headers
app.use(helmet());
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
// middleware write log production and dev
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// body parse reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // gioi han luong du lieu la 10kb
app.use(express.static(path.join(__dirname, 'public')));

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
app.all('*', (req, res, next) => {
  next(new appError(`Can not find ${req.originalUrl} on server`, 404));
});

app.use(ErrorHandlerController);
module.exports = app;
