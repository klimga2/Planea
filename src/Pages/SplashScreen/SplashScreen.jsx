import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';
import logo from '../../assets/planea-logo.png';
import planeaBg from '../../assets/planea-transparent.png';

const SplashScreen = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/start-first-time');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div
         className="splash-background"
         style={{ backgroundImage: `url(${planeaBg})` }}
         />      
         <div className="splash-content">
        <img src={logo} alt="Planea Logo" className="splash-logo" />
      </div>
    </div>
  );
};

export default SplashScreen;
