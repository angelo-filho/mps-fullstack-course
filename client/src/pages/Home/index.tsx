import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const [listOfPost, setListOfPosts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios.get("http://localhost:3333/posts").then((response) => {
      console.log(response.data);
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="Home">
      {listOfPost.map((post) => {
        return (
          <div className="post" key={post.id} onClick={() => {
            history.push(`/post/${post.id}`);
          }}>
            <div className="title">{post.title}</div>
            <div className="body">{post.postText}</div>
            <div className="footer">{post.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
