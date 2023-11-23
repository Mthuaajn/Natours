const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app.js');
const port = process.env.port || 3000;

// Connect to database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

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
  })
  .catch((err) => console.log(err));
// Start sever
app.listen(port, () => {
  console.log(`app running on port = ${port}`);
});
