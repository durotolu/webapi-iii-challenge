const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(cors());
server.use(helmet());
server.use(express.json());

//test stuvs
server.use(logger)

server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `request method: ${req.method}, request url: ${req.url}, timestamp: ${new Date().toISOString()}`
  );
  next();
};

module.exports = server;
