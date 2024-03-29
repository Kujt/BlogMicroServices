import React, { useState } from "react";
import axios from "axios";
import "./CommentCreate.css";
const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content,
    });

    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="from-group">
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="cm-input"
          />
        </div>
        <button className="btn-sub">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
