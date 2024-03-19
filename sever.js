const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app.js');
const port = process.env.PORT || 3000;

// Connect to database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

process.on('uncaughtException', (err) => {
  // xu li loi vi du nhu console.log(x) -> chua khai bao x
  console.log('uncaught Exception! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connect to database successfully');
  });

// Start sever
const server = app.listen(port, () => {
  console.log(`app running on port = ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
