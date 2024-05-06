import React, { useEffect } from "react";
import "./WelcomeScreen.css";
import logo from "../../assets/mindQalamLogo.png";
import { useNavigate } from "react-router-dom";

function WelcomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/AddThought");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="welcome-container">
      <img className="logo-image" src={logo} alt="Mind Qalam" />
      <h1 className="welcome-title">Welcome to Mind Qalam</h1>
    </div>
  );
}

export default WelcomeScreen;
