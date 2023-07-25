import { useState } from "react";

import registerPic from "../images/register.jpg";
// import { json } from "stream/consumers";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function register(ev) {
    ev.preventDefault();
    await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div>
      <form className='register' onSubmit={register}>
        <h1>Register</h1>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Register</button>
      </form>
      <div className='registerImg'>
        <a href='https://www.artstation.com/artwork/space-outpost-bce36731-badd-4f50-a73b-cb40696b5306'>
          <img src={registerPic} alt='Space Outpost' />
          <h6>by Tim Witprächtiger</h6>
        </a>
      </div>
    </div>
  );
}
