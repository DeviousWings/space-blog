import React from "react";
import { useState } from "react";

import loginpic from "../images/login.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function login(ev) {
    ev.preventDefault();
    fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
  }
  return (
    <div>
      <form className='login' onSubmit={login}>
        <h1>Login</h1>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        <button>Login</button>
      </form>
      <div className='loginImg'>
        <img src={loginpic} alt='Base' />
      </div>
    </div>
  );
}
