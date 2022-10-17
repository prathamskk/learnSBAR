import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../styles/login.css";
import nurses from "../images/nurses_register.png";
import logo from "../images/LearnSBAR (2) 2.png";
import Spinner from "./Spinner";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useScenarios from "../hooks/useScenarios";

const LOGIN_URL = "/auth";

const Login = () => {
  const axiosPrivate = useAxiosPrivate();
  const refreshScenarios = useScenarios();
  const { setAuth, persist, setPersist, setScenarios } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [loggedInState, setLoggedInState] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggedInState("logging in");

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken });
      setEmail("");
      setPassword("");
      refreshScenarios();

      navigate(from, { replace: true });
    } catch (err) {
      setLoggedInState("");
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section className="nurse_login">
      {loggedInState === "logging in" ? <Spinner /> : ""}
      <div className="nurse_img">
        <img src={nurses} alt="nurses" />
      </div>

      <div className="login-wrapper">
        <div className="logo">
          <img src={logo} alt="learnSBAR" />
        </div>
        <div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="email"
              ref={emailRef}
              autoComplete="off"
              placeholder="Enter your E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <input
              type="password"
              // id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter password"
              required
            />
            <button className="login">Login</button>
            <div className="persistCheck">
              <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor="persist">Trust This Device</label>
            </div>
          </form>
          <div className="not_account">
            <span>Do not have a account?</span>
            &nbsp;&nbsp;
            <span className="line">
              <Link to="/register">Register here</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
