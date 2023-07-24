import React from "react";
import login from "../images/login.jpg";

export default function Login() {
  return (
    <div>
      <form className='login'>
        <h1>Login</h1>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <button>Login</button>
      </form>
      <div className='loginImg'>
        <img src={login} alt='Base' />
      </div>
    </div>
  );
}
