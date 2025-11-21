import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinancialLevel.css';
import { FaBabyCarriage, FaGraduationCap } from 'react-icons/fa';
import { BsPersonStanding } from 'react-icons/bs';

const FinancialLevel = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const levels = [
    {
      icon: <FaBabyCarriage className="level-icon" />,
      title: 'Principiante',
      description: 'Aprendo desde cero',
    },
    {
      icon: <BsPersonStanding className="level-icon" />,
      title: 'Intermedio',
      description: 'Sé lo básico pero podría mejorar',
    },
    {
      icon: <FaGraduationCap className="level-icon" />,
      title: 'Avanzado',
      description: 'Quiero herramientas para optimizar mis decisiones',
    },
  ];

  const handleCardClick = (index) => {
    setSelected(index);
    navigate('/objetives');
  };

  return (
    <div className="financial-level-container">
      <header className="financial-level-header">
        <h1>¿En qué nivel están tus conocimientos financieros?</h1>
      </header>
      <main className="financial-level-main">
        {levels.map((level, index) => (
          <div
            key={index}
            className={`level-card ${selected === index ? 'selected' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {level.icon}
            <div className="level-text">
              <h2>{level.title}</h2>
              <p>{level.description}</p>
            </div>
          </div>
        ))}
      </main>
      <footer className="progress-indicator">
        <div className="bar active"></div>
        <div className="bar"></div>
      </footer>
    </div>
  );
};

export default FinancialLevel;
