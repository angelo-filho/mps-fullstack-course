import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function CreatePost() {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  }

  const validation = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required("You must input a Text!"),
    username: Yup.string().min(3).max(15).required("You must input a Username!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3333/posts", data).then((r) => {
      history.push("/");
    });
  }

  let history = useHistory();

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
          <label htmlFor="username">Username: </label>
          <ErrorMessage name='username' component="span" />
          <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="(Ex. John123...)"/>
          <button type='submit'>Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
