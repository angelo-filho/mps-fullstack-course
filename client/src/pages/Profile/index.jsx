import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../../helpers/App';

const Profile = () => {
  let history = useHistory();
  let { id } = useParams();
  const [userName, setUserName] = useState("");
  const [userPosts, setuUserPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3333/auth/basicinfo/${id}`)
    .then((res) => {
      setUserName(res.data.username);
    });
    axios.get(`http://localhost:3333/posts/byUserId/${id}`)
    .then((res) => {
      setuUserPosts(res.data);
    });
  }, []);

  return <div className='profilePageContainer'>
    <div className="basicInfo">
      <h1>Username: {userName}</h1>
      {authState.username == userName && <button onClick={() => history.push("/changepassword")}>Change My Password</button>}
    </div>
    <div className="listOfPosts">
    {userPosts.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="title">{post.title}</div>
            <div className="body" onClick={() => {
            history.push(`/post/${post.id}`);
          }}>{post.postText}</div>
            <div className="footer">
              <div className="username">
                {post.username}
              </div>
              <div className="buttons">
                <label>{post.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>;
};

export default Profile;
