const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');

const { port } = require('./auth/config') 

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("./client/build"));
}

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/user', require('./routes/user.route'));
app.use('/blog', require('./routes/blog.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});



app.listen(port, () => console.log(`🚀 @ http://localhost:${port}`));