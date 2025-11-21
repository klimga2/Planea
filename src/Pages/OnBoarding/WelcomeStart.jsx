import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeStart.css';
import womanCelebrating from '../../assets/woman-celebrating.png';
import planeaLogo from '../../assets/planea-logo-horizontal.png';

const WelcomeStart = () => {
  const navigate = useNavigate();

  const handleComenzar = () => {
    navigate('/dashboard');
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img src={planeaLogo} alt="Planea Logo" className="logo-horizontal" />
      </header>
      <main className="welcome-main">
        <img src={womanCelebrating} alt="Woman celebrating" className="main-image-start" />
        <section className="welcome-text">
          <h1>¡Bienvenido!</h1>
          <p>Ya estamos alineados según tus objetivos y preferencias.</p>
        </section>
        <button className="welcome-button" onClick={handleComenzar}>Comenzar</button>
      </main>
    </div>
  );
};

export default WelcomeStart;
