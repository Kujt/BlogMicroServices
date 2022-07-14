import React, { useState } from "react";
import axios from "axios";
import "./PostCreate.css";
const PostCreate = () => {
  const [title, setTitle] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      title,
    });

    setTitle("");
  };
  return (
    <div className="container">
      <h1>Create Post</h1>
      <form onSubmit={onSubmit}>
        <div className="form">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="input "
          ></input>
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
