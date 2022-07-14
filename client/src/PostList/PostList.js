import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PostList.css";
const PostList = () => {
  const [posts, setPosts] = useState({});

  //   Function that are going to make a request to our post service
  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/posts");
    setPosts(res.data);
  };

  //   Use effect can be used to run soime code at very specific point in time in the life cycle of a component
  //   to make sure that we can run this function only when this component is first displayed
  //empty Array in the end will tell react to only run the fonction one time
  useEffect(() => {
    fetchPosts();
  }, []);
  // this will give us an array of posts
  const renderPosts = Object.values(posts).map((post) => {
    return (
      <div key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>
      </div>
    );
  });
  console.log(renderPosts);
  return (
    <div className="">
      <h1>Posts</h1>
      <div className="card">{renderPosts}</div>
    </div>
  );
};

export default PostList;
