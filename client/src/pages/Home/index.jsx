import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { AuthContext } from "../../helpers/App";

function Home() {
  const [listOfPost, setListOfPosts] = useState([]);
  const [likedPosts, setlikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
      return;
    }
  });

  useEffect(() => {
    axios
      .get("http://localhost:3333/posts", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setListOfPosts(response.data.posts);
        setlikedPosts(
          response.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
  }, []);

  const likeAPost = (PostId) => {
    axios
      .post(
        "http://localhost:3333/likes",
        { PostId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setListOfPosts(
          listOfPost.map((post) => {
            if (post.id === PostId) {
              if (res.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(PostId)) {
          setlikedPosts(
            likedPosts.filter((id) => {
              return id != PostId;
            })
          );
        } else {
          setlikedPosts([...likedPosts, PostId]);
        }
      });
  };

  return (
    <div className="Home">
      {listOfPost.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="title">{post.title}</div>
            <div
              className="body"
              onClick={() => {
                history.push(`/post/${post.id}`);
              }}
            >
              {post.postText}
            </div>
            <div className="footer">
              <div className="username">
                <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
              </div>
              <div className="buttons">
                <ThumbUpAltIcon
                  className={
                    likedPosts.includes(post.id) ? "unlikeBttn" : "likeBttn"
                  }
                  onClick={() => likeAPost(post.id)}
                />
                <label>{post.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
