import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Screens/Login/Login";
import Profile from "./Screens/Profile/Profile";
import SignupForm from "./Screens/Login/SignupForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [authorized, setAuthorized] = useState(
    () => !!localStorage.getItem("token")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthorized(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogin = (token) => {
    setAuthorized(true);
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login onLoginFunc={handleLogin} />} />
          <Route
            path="/profile"
            element={authorized ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="/register" element={<SignupForm />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
