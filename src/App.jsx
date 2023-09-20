import "./App.css";
import { useContext } from "react";
import AuthForm from "./auth/AuthForm";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { AuthContext } from "./auth/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />}></Route> */}
        <Route path="/login" element={<AuthForm />}></Route>
        <Route
          path="/"
          element={authCtx.isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
