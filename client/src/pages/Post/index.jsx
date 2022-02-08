import axios from "axios";
import React, { useEffect, useState, useCallback, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/App";

function Post() {
  const { id } = useParams();
  const [informations, setInformations] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:3333/posts/byId/${id}`).then((response) => {
      console.log(response.data);
      setInformations(response.data);
    });

    axios.get(`http://localhost:3333/comments/${id}`).then((response) => {
      console.log(response.data);
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3333/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          return alert(res.data.error);
        }

        console.log(res.data);

        const commentToAdd = {
          id: res.data.id,
          commentBody: newComment,
          username: res.data.username,
        };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
  };

  const deletePost = () => {
    axios
      .delete(`http://localhost:3333/posts/ById/${informations.id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        history.push("/");
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3333/comments/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setComments(comments.filter((c) => c.id != id));
      });
  };

  const editPost = (option) => {
    if (authState.username === informations.username)
      if (option === "title") {
        let title = prompt("Enter New Title");
        axios.put(
          "http://localhost:3333/posts/title",
          {
            title,
            id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );

        setInformations({ ...informations, title });
      } else {
        let postText = prompt("Enter New Text");
        axios.put(
          "http://localhost:3333/posts/text",
          {
            postText,
            id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );

        setInformations({ ...informations, postText });
      }
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title" onClick={() => editPost("title")}>
            {informations.title}
          </div>
          <div className="body" onClick={() => editPost("text")}>
            {informations.postText}
          </div>
          <div className="footer">
            {informations.username}
            {authState.username === informations.username && (
              <button onClick={deletePost}>Delete Post</button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            className="input"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div className="comment" key={key}>
                {comment.commentBody}
                <label>Username: {comment.username}</label>
                {authState.username === comment.username && (
                  <button onClick={() => deleteComment(comment.id)}>X</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
