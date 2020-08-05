const express = require('express');

const server = express();

//routes
const userRouter = require('./users/userRouter')
const postsRouter = require('./posts/postRouter')

//middleware functions
const logger = require('./middleware/logger')



server.use(express.json())
server.use(logger)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use('/user', userRouter);

server.use('/posts', postsRouter)
//custom middleware



module.exports = server;
