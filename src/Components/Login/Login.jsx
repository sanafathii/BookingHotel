import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("sana.fathi@gmail.com");
  const [password, setPassword] = useState("123456789");
  const { user, login, isAthenticated } = useAuth();
  const navigate = useNavigate();
  const handelSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };
  useEffect(() => {
    if (isAthenticated) navigate("/", { replace: true });
  }, [isAthenticated]);

  return (
    <div className="loginContainer">
      <h2>login</h2>
      <form action="" className="form" onSubmit={handelSubmit}>
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
