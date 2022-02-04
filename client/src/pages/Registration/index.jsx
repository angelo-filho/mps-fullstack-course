import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
  const history = useHistory();

  const initialValues = {
    username: "",
    password: "",
  };

  const validation = Yup.object().shape({
    username: Yup.string()
      .min(3)
      .max(15)
      .required("You must input a Username!"),
    password: Yup.string()
      .min(4)
      .max(20)
      .required("You must input a Password!"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3333/auth", data).then(() => {
      console.log(data);
      history.push("/login");
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validation}
      >
        <Form className="formContainer">
          <label htmlFor="username">Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />
          <label htmlFor="password">Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            autoComplete="off"
            id="inputCreatePost"
            name="password"
            placeholder="(Your Password...)"
          />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
