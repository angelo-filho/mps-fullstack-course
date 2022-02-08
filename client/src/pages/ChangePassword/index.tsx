import axios from "axios";
import React, { useState } from "react";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3333/auth/changepassword",
        {
          oldPassword,
          newPassword,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        }
      });
  };

  return (
    <div className="loginContainer">
      <h1>Change Your Password</h1>
      <input
        type="password"
        onChange={(e) => setOldPassword(e.target.value)}
        value={oldPassword}
        placeholder="Old Password..."
      />
      <input
        type="password"
        onChange={(e) => setNewPassword(e.target.value)}
        value={newPassword}
        placeholder="New Password..."
      />
      <button onClick={changePassword}>Save Changes</button>
    </div>
  );
};

export default ChangePassword;
