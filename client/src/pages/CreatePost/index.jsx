import React, { useContext, useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../helpers/App';

function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
  }
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
      return;
    }
  }, []);
  

  const validation = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required("You must input a Text!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3333/posts", data, {
      headers: { accessToken: localStorage.getItem('accessToken') }
    }).then((r) => {
      history.push("/");
    });
  }


  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
        <Form className='formContainer'>
          <label htmlFor="title">Title: </label>
          <ErrorMessage name='title' component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="(Ex. Title...)"/>
          <label htmlFor="postText">Text: </label>
          <ErrorMessage name='postText' component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="postText" placeholder="(Ex. Posts...)"/>
          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
