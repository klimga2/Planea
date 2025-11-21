import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvestmentObjectives.css';
import { IoIosArrowBack } from 'react-icons/io';

const investmentOptions = [
  {
    id: 'knowledge',
    label: 'Identificar el nivel de conocimiento del usuario sobre productos de inversión (bajo, medio o alto).'
  },
  {
    id: 'horizon',
    label: 'Definir el horizonte temporal y el nivel de riesgo que el usuario está dispuesto a asumir.'
  },
  {
    id: 'goals',
    label: 'Establecer metas de inversión concretas (ej. “invertir para estudios”, “aumentar ingresos pasivos”).'
  },
  {
    id: 'product',
    label: 'Detectar el tipo de producto que más se ajusta a su perfil (fondos, acciones, CDT, etc.).'
  }
];

const InvestmentObjectives = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelection = (id) => {
    setSelected(id);
  };

  const handleNextClick = () => {
    if (isButtonEnabled) {
      navigate('/welcome-start');
    }
  };

  const isButtonEnabled = selected !== null;

  return (
    <div className="investment-container">
      <div className="investment-header">
        <div className="back-icon-wrapper">
          <IoIosArrowBack className="back-icon" onClick={() => navigate(-1)} />
        </div>
        <h1>¿Cuáles son tus objetivos de inversión?</h1>
      </div>
      
      <div className="options-container">
        {investmentOptions.map(option => (
          <div key={option.id} className="checkbox-row" onClick={() => handleSelection(option.id)}>
            <input 
              type="checkbox" 
              id={option.id} 
              className="custom-checkbox" 
              checked={selected === option.id}
              readOnly
            />
            <label htmlFor={option.id}>{option.label}</label>
          </div>
        ))}
      </div>

      <button 
        className={`next-button ${isButtonEnabled ? 'enabled' : 'disabled'}`}
        disabled={!isButtonEnabled}
        onClick={handleNextClick}
      >
        Siguiente
      </button>
    </div>
  );
};

export default InvestmentObjectives;
