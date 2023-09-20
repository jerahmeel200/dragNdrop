import classes from "./AuthForm.module.css";
import Navbar from "./../components/navbar/Navbar";
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { database } from "../db/firebase";
import LoadingSpinner from "./../components/loader/LoadingSpinner";
import { AuthContext } from "./auth-context";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  const submitLogin = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    (async () => {
      try {
        setIsLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          database,
          enteredEmail,
          enteredPassword
        );
        let user = userCredential.user;
        authCtx.login(user.email);
        navigate("/");
        // setIsLogin(true);
        console.log("login successful", user);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Email or password is invalid, kindly check and try again.");
        setInterval(() => {
          setError(null);
        }, 5000);
        console.log(error.message);
      }
    })();
  };
  return (
    <div>
      <div className={classes.container}></div>
      <div className={classes.auth_page}>
        <Navbar />
        <div className="centered">
          <h1> LOGIN</h1>
        </div>
        <section className={classes.auth}>
          <h1>Login</h1>
          <form onSubmit={submitLogin}>
            <div className={classes.control}>
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
              />
            </div>
            <div className={classes.actions}>
              {error && <p style={{ color: "#880101" }}>{error}</p>}
              {!isLoading && <button>Log In</button>}
              {isLoading && (
                <div className="centered">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AuthForm;
