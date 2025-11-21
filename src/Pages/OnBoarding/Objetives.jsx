import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Objetives.css';
import { FaDollarSign, FaWallet, FaCalendarAlt, FaShieldAlt, FaHome, FaCog } from 'react-icons/fa';

const Objetives = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const objectives = [
    {
      id: 'inversion',
      icon: <FaDollarSign className="objective-icon" />,
      title: 'Inversión',
      description: 'Haz que tu dinero trabaje por ti.',
      path: '/investment-objectives'
    },
    {
      id: 'ahorro',
      icon: <FaWallet className="objective-icon" />,
      title: 'Ahorro',
      description: 'Construye hábitos sólidos y alcanza tus metas.',
      path: '/saving-objectives'
    },
    {
      id: 'planeacion',
      icon: <FaCalendarAlt className="objective-icon" />,
      title: 'Planeación tributaria',
      description: 'Evita sorpresas al declarar.',
      path: '/tax-planning-objectives'
    },
    {
      id: 'seguros',
      icon: <FaShieldAlt className="objective-icon" />,
      title: 'Seguros',
      description: 'Protege lo que más valoras.',
      path: '/insurance-objectives'
    },
    {
      id: 'sucesoral',
      icon: <FaHome className="objective-icon" />,
      title: 'Planeación sucesoral',
      description: 'Planifica el futuro con tranquilidad.',
      path: '/succession-planning-objectives'
    },
    {
      id: 'otros',
      icon: <FaCog className="objective-icon" />,
      title: 'Otros servicios financieros',
      description: 'Asesorías, créditos o educación personalizada.',
      path: '/other-financial-services-objectives'
    },
  ];

  const handleCardClick = (objective, index) => {
    setSelected(index);
    if (objective.path) {
      navigate(objective.path);
    }
    // For cards without a path, it will just set the selection state
  };

  return (
    <div className="objetives-container">
      <header className="objetives-header">
        <h1>¿Cuáles son tus objetivos?</h1>
      </header>
      <main className="objetives-main">
        {objectives.map((objective, index) => (
          <div
            key={index}
            className={`objective-card ${selected === index ? 'selected' : ''}`}
            onClick={() => handleCardClick(objective, index)}
          >
            {objective.icon}
            <div className="objective-text">
              <h2>{objective.title}</h2>
              <p>{objective.description}</p>
            </div>
          </div>
        ))}
      </main>
      <footer className="progress-indicator">
        <div className="bar"></div>
        <div className="bar active"></div>
      </footer>
    </div>
  );
};

export default Objetives;
