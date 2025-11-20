import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import logo from '../../assets/planea-logo-blue.png';

const SignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  return (
    <div className="signin-container">
      <div className="signin-logo-container">
        <img src={logo} alt="Planea Logo" className="signin-logo" />
      </div>
      <div className="signin-buttons-container">
        <button className="signin-button primary" onClick={handleSignIn}>
          Iniciar sesión
        </button>
        <button className="signin-button secondary" onClick={handleRegister}>
          Registrarme
        </button>
      </div>
    </div>
  );
};

export default SignIn;
