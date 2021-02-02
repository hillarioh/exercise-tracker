import React, { useState } from "react";
import axios from "axios";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log({ username: username });
    axios
      .post("http://localhost:5000/users/login", { email, password })
      .then((res) => console.log(res.data));

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
      <h3>User Log in</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address: </label>
          <input
            type="email"
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            required
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Sign Up" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default LogIn;
