import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

function Post() {
  const { id }= useParams();
  const [informations, setInformations] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3333/posts/byId/${id}`).then((response) => {
      console.log(response.data);
      setInformations(response.data);
    });
  }, []);

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{informations.title}</div>
          <div className="body">{informations.postText}</div>
          <div className="footer">{informations.username}</div>
        </div>
      </div>
      <div className="rightSide">Comment Section</div>
    </div>
  );
}

export default Post;
