import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import nurse_gang from "../images/nurse_reg.png";
import "../styles/register.css";
import logo from "../images/LearnSBAR (2) 2.png";
import Spinner from "./Spinner";
import Lottie from "react-lottie";
import correctLogo from "./correct.json";

const EMAIL_REGEX =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MOBILE_REGEX = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
const REGISTER_URL = "/register";

const Register = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [mobile_no, setMobile] = useState("");
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);

  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //const [matchPwd, setMatchPwd] = useState("");
  //const [validMatch, setValidMatch] = useState(false);
  //const [matchFocus, setMatchFocus] = useState(false);

  const [SignUpState, setSignUpState] = useState("");
  const [animation, setAnimation] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: correctLogo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    // setValidMatch(password === matchPwd);
  }, [password]);

  useEffect(() => {
    setValidMobile(MOBILE_REGEX.test(mobile_no));
  }, [mobile_no]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUpState("signing up");
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    // const v2 = PWD_REGEX.test(password);
    const v3 = MOBILE_REGEX.test(mobile_no);

    if (!v1 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email, password, mobile_no }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      //clear state and controlled inputs
      setEmail("");
      setPwd("");
      //setMatchPwd("");
      setMobile("");
      setSignUpState("");
      setAnimation("successful signup");
      setTimeout(() => navigate("/login"), 4000);
    } catch (err) {
      setSignUpState("");
      console.log(err.response.data.message);
      setErrMsg(err.response.data.message);
      errRef.current.focus();
    }
  };

  return (
    <>
      <section className="nurse_register">
        {animation === "successful signup" ? (
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            style={{
              position: "absolute",
              "z-index": "10",
              left: "30vw",
              display: "block",
            }}
            className="correct"
          />
        ) : (
          ""
        )}
        {SignUpState === "signing up" ? <Spinner /> : ""}
        <div className="nurses_gang">
          <img src={nurse_gang} alt="nurses" />
        </div>
        <div className="nurse_reg">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="reg-wrapper">
            <div className="logo">
              <img src={logo} alt="learnSBAR" />
            </div>
            <h1 className="regi">Register</h1>
            <form onSubmit={handleSubmit} className="rform">
              <div className="ui">
                <label htmlFor="username" className="cross">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </label>
                <div className="inputContainer">
                  {/* <i class="fa-solid fa-user"></i> */}
                  <input
                    type="text"
                    id="username"
                    placeholder="Enter your email address"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                  />

                  <p
                    id="uidnote"
                    className={
                      emailFocus && email && !validEmail
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter a valid email address
                  </p>
                </div>
              </div>
              <div className="ui">
                <label htmlFor="password" className="cross">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !password ? "hide" : "invalid"}
                  />
                </label>
                <div className="inputContainer">
                  {/* <i class="fa-solid fa-lock"></i> */}
                  <input
                    className="password"
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number
                    <br /> and a special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>
                </div>
              </div>

              <div className="mobile-field">
                <div className="number">
                  <label htmlFor="mobile_no" className="cross">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validMobile && mobile_no ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validMobile || !mobile_no ? "hide" : "invalid"}
                    />
                  </label>
                  {/* <i class="fa-solid fa-mobile"></i> */}
                  <select name="codes" id="codes" required>
                    <option value="india">+91</option>
                    <option value="usa">+1</option>
                  </select>
                  <input
                    type="text"
                    id="mobile"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile_no}
                    required
                    aria-invalid={validMobile ? "false" : "true"}
                    onFocus={() => setMobileFocus(true)}
                    onBlur={() => setMobileFocus(false)}
                  />
                </div>
              </div>
              <div className="signup-btn">
                <button
                  className="sign-up"
                  disabled={!validEmail || !validPwd ? true : false}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <br />
          <p className="aa">
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
