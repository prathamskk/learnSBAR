import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import nurse_gang from "../images/nurse_reg.png";
import "../styles/register.css";

const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MOBILE_REGEX = /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/;
const REGISTER_URL = "/register";

const Register = () => {
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

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(true);
      //clear state and controlled inputs
      setEmail("");
      setPwd("");
      //setMatchPwd("");
      setMobile("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="/">Sign In</a>
          </p>
        </section>
      ) : (
        <section className="nurse_register">
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
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="rform">
              <label htmlFor="username">
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
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
              </div>
              <label htmlFor="password">
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
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
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
              {/* <label htmlFor="confirm_pwd">
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <div>
                <i class="fa-solid fa-lock"></i>
                <input
                  type="password"
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </div> */}

              {/* <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              > */}
                {/* <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p> */}

              <label htmlFor="mobile_no">
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMobile && mobile_no ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMobile || !mobile_no ? "hide" : "invalid"}
                />
              </label>
              <div className="mobile-field">
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

              <div className="signup-btn">
                <button
                  className="sign-up"
                  disabled={
                    !validEmail || !validPwd  ? true : false
                  }
                >
                  Sign Up
                </button>
              </div>
            </form>
            <br/><br/><br/>
            <p className="aa">
              Already registered?
              <br/>
              <span className="line" >
               <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
