import React, { useState } from "react";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("my user", user);
      if (user.email) {
        setLoading(true);
        toast.success("Login Successful");
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <Helmet title="login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold  mb-4">Login</h3>

                <Form onSubmit={signIn} className="auth__form">
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

                  <button type="submit" className="buy__btn auth__btn">
                    Login
                  </button>
                  <p>
                    Dont have an accout?{" "}
                    <Link to="/signUp">Create an account</Link>
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

export default Login;
