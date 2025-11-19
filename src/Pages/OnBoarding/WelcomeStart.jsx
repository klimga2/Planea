import React from 'react';
import './WelcomeStart.css';
import womanCelebrating from '../../assets/woman-celebrating.png';
import planeaLogo from '../../assets/planea-logo.svg';

const WelcomeStart = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img src={planeaLogo} alt="Planea Logo" className="logo" />
      </header>
      <main className="welcome-main">
        <img src={womanCelebrating} alt="Woman celebrating" className="main-image" />
        <section className="welcome-text">
          <h1>¡Bienvenido!</h1>
          <p>Ya estamos alineados según tus objetivos y preferencias.</p>
        </section>
        <button className="welcome-button">Comenzar</button>
      </main>
    </div>
  );
};

export default WelcomeStart;
