import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = () => {
    const data = { username, password }
    axios.post("http://localhost:3333/auth/login", data).then((res) => {
      if (res.data.error) {
        return alert(res.data.error) ;
      }

      sessionStorage.setItem("accessToken", res.data);
      history.push("/");
    });
  };

  return (
    <div>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
