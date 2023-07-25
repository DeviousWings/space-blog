import React, { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import loginpic from "../images/login.jpg";
import { UserContext } from "../navigation/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        //refreshes after login
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Wrong Cridentials");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <button>Login</button>
      </form>
      <div className="loginImg">
        <img src={loginpic} alt="Base" />
      </div>
    </div>
  );
}
