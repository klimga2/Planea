import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';
import logo from '../../assets/planea-logo.svg';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/start-first-time');
    }, 3000);
    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="splash-background"></div>
      <div className="splash-content">
        <img src={logo} alt="Planea Logo" className="splash-logo" />
        <h1 className="splash-title">Planea</h1>
        <p className="splash-tagline">Organiza, proyecta y avanza</p>
      </div>
    </div>
  );
};

export default SplashScreen;
