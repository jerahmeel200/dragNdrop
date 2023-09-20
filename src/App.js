import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Gallery from "./components/Gallery/Gallery";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";

const App = () => {
  console.log(process.env.REACT_APP_API_KEY);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Gallery />} />
        </Route>
        {/* Add other routes as needed */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
