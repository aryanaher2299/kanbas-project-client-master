import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import "./index.css";

export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="SignInBox">
        <h1>Signup</h1>
        {error && <div className="text-danger">{error}</div>}
        <div className="d-flex flex-column gap-3 w-100">
          <input
            className="input-group mb-3"
            value={user.username}
            onChange={(e) =>
              setUser({
                ...user,
                username: e.target.value
              })
            }
            placeholder="username"
          />
          <input
            className="input-group"
            type="password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value
              })
            }
            placeholder="password"
          />
        </div>
        <br />
        <button className="siginbutton" onClick={signup}>
          Signup
        </button>
        <Link to="/Kanbas/Account/Signin" className="mt-3 text-decoration-none text-primary btn">
          Back to Signin
        </Link>
      </div>
    </div>
  );
}
