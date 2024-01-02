import React from "react";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("sana.fathi@gmail.com");
  const [password, setPassword] = useState("123456789");
  return (
    <div className="loginContainer">
      <h2>login</h2>
      <form action="" className="form">
        <div className="formControl">
          <label htmlFor="email"></label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
        </div>
        <div className="formControl">
          <label htmlFor="password"></label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
