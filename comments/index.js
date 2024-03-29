const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", async (req, res) => {
  // create a random Id
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  //   This will create an array if posts exist otherwise empty array
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

// This will make a post in events bus
app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  res.send({});
});
app.listen(4001, () => {
  console.log("Listening in port 4001");
});
