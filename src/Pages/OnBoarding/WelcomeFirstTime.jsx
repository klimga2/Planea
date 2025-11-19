import React from 'react';
import './WelcomeStart.css';
import financialServices from '../../assets/financial-services.png'
import { useNavigate } from "react-router-dom";

const WelcomeFirstTime = () => {
    const navigate = useNavigate();
    const handleStart = () => {
      navigate("/signin");
    };

  return (
    <div className="welcome-container">
      <main className="welcome-main">
        <img src={financialServices} alt="financial services" className="main-image" />
        <section className="welcome-text">
          <h1>Configura tu experiencia financiera</h1>
          <p>Tus respuestas nos permitirán definir tu perfil de riesgo y brindarte servicios alineados con tus preferencias y objetivos financieros.</p>
        </section>
        <button onClick={handleStart} className="welcome-button">Comenzar</button>
      </main>
    </div>
  );
};

export default WelcomeFirstTime;
