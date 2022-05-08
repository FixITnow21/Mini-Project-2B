import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { signup, login, logout, useAuth } from "../firebase";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignup() {
    setLoading(true);
    // try {
    await signup(emailRef.current.value, passwordRef.current.value);
    // } catch {
    // alert("Error!");
    // }
    setLoading(false);
  }

  async function handleLogin() {
    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  return (
    <div className="login-main">
      <div className="login">
        <h1>CRICKMAGIC</h1>
        <div className="login-header">
          Currently logged in as: {currentUser?.email}{" "}
        </div>

        <div className="fields">
          <div>
            <input
              className="login__container_Input"
              ref={emailRef}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className="login__container_Input"
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <Link to="/">
          <button
            className="btn-1"
            style={{ color: "white" }}
            disabled={loading || currentUser}
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </Link>
        <Link to="/">
          <button
            className="btn-1"
            disabled={loading || currentUser}
            onClick={handleLogin}
          >
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}
