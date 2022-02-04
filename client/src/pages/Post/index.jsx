import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();
  const [informations, setInformations] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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

  const addComment = useCallback(() => {
    axios
      .post("http://localhost:3333/comments", {
        commentBody: newComment,
        PostId: id,
      }, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        }
      })
      .then((res) => {
        if (res.data.error) {
          return alert(res.data.error);
        }
 
        const commentToAdd = { commentBody: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
  }, [newComment]);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{informations.title}</div>
          <div className="body">{informations.postText}</div>
          <div className="footer">{informations.username}</div>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
