import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../helpers/App";

function Login() {
  const { setAuthState } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = () => {
    const data = { username, password };
    axios.post("http://localhost:3333/auth/login", data).then((res) => {
      if (res.data.error) {
        return alert(res.data.error);
      }

      localStorage.setItem("accessToken", res.data.token);
      setAuthState({
        username: res.data.username,
        id: res.data.id,
        status: true,
      });
      history.push("/");
    });
  };

  return (
    <div className="loginContainer">
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
