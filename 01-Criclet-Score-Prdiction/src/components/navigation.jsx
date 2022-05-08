import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { signup, login, logout, useAuth } from "../firebase";
import "./Navigation.css";

function Navigation() {
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
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a
            className="navbar-brand page-scroll"
            href="/"
            style={{ marginLeft: "-300px" }}
          >
            CrickMagic
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a
                href="http://127.0.0.1:5000"
                target="_blank"
                className="page-scroll"
              >
                cricke-score-prediction
              </a>
            </li>
            <li>
              <a href="/latestNews" className="page-scroll">
                latest news
              </a>
            </li>

            <a onclick={!currentUser} href="/login">
              {currentUser ? (
                <button
                  className="btn btn-custom-login btn-lg page-scroll"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="btn btn-custom-login btn-lg page-scroll"
                  onClick={handleLogin}
                >
                  login
                </button>
              )}
            </a>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
