import React, { useState } from "react";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "./signUp.css";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db, auth } from "../../firebase/firebaseConfig";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile
      await updateProfile(user, {
        displayName: username,
      });

      // Store user data in firestore database
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: username,
        email,
      });

      setLoading(false);
      toast.success("Account Created successfully");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <Helmet title="login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading......</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold  mb-4">Register</h3>

                <Form onSubmit={signup} className="auth__form">
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Enter your username.."
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder="Enter your email.."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      name=""
                      id=""
                      placeholder="Enter your password.."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>

                  <button type="submit" className="  auth__btn">
                    signup
                  </button>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default SignUp;
