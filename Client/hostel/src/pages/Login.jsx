import { useState } from "react";
import "./Signup.css";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import {usenavigate} from "react-router-dom"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        console.log(email);
        console.log(password);
        if (result.data === "Success") {
          alert("Login Sucessfull");

          console.log("Clearing fields");
          setEmail("");
          setPassword("");

          navigate("/Home");
        } else {
          alert("Indvalid username or password!");
          console.log("Clearing fields");
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="whole-container">
        <div className="left-container"></div>
        <div className="right-container">
          <form className="container" onSubmit={handleSubmit}>
            <h1>LogIn</h1>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          <p>Don't have account?</p>
          <Link to="/signup" type="submit" className="btn btn-primary">
            Signup
          </Link>
        </div>
      </div>
    </>
  );
}
export default Login;
