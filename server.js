const express = require("express");
const server = express();
const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
server.use(express.json());

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);
//custom middleware
server.use(logger);
function logger(req, res, next) {
  console.log(req.url);
  console.log(`[${new Date()}] ${req.method} request to ${req.originalUrl} ]`);
  next();
}

module.exports = server;
