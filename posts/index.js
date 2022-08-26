const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();

// Express body-parser is an npm library used to process data sent through an HTTP request body
app.use(bodyParser.json());
app.use(cors());
const posts = {};

// This is no need in docker
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});
// This will make a post in events bus
app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("v55");
  console.log("Listening on 4000");
});
