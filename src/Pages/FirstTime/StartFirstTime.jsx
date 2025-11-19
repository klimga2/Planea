import React from 'react';
import '../OnBoarding/WelcomeStart.css';
import financialServices from '../../assets/financial-services.png'
import { useNavigate } from "react-router-dom";

const StartFirstTime = () => {
    const navigate = useNavigate();
    const handleStart = () => {
      navigate("/signin");
    };

  return (
    <div className="welcome-container">
      <main className="welcome-main">
        <img src={financialServices} alt="financial services" className="main-image" />
        <section className="welcome-text">
          <h1>Tus finanzas en un solo lugar</h1>
          <p>Conecta tus productos financieros y obtén una visión completa de tu dinero.</p>
        </section>
        <button onClick={handleStart} className="welcome-button">Comenzar</button>
      </main>
    </div>
  );
};

export default StartFirstTime;
