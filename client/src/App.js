import React from "react";
import PostCreate from "./PostCreate/PostCreate";
import PostList from "./PostList/PostList";

function App() {
  return (
    <div>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
}

export default App;
