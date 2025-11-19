import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvestmentObjectives.css'; // Reusing the same CSS
import { IoIosArrowBack } from 'react-icons/io';

const savingOptions = [
  {
    id: 'purpose',
    label: 'Conocer el propósito principal del ahorro (emergencias, viajes, vivienda, jubilación).'
  },
  {
    id: 'capacity',
    label: 'Estimar la capacidad mensual de ahorro según ingresos y gastos.'
  },
  {
    id: 'smart_goals',
    label: 'Motivar la creación de metas SMART (específicas, medibles, alcanzables, realistas y con tiempo).'
  },
  {
    id: 'method',
    label: 'Definir si el usuario desea ahorrar de forma automática o manual.'
  }
];

const SavingObjectives = () => {
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
    <div className="investment-container"> {/* Reusing class for styling */}
      <div className="investment-header"> {/* Reusing class for styling */}
        <div className="back-icon-wrapper">
          <IoIosArrowBack className="back-icon" onClick={() => navigate(-1)} />
        </div>
        <h1>¿Cuáles son tus objetivos de ahorro?</h1>
      </div>
      
      <div className="options-container"> {/* Reusing class for styling */}
        {savingOptions.map(option => (
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

export default SavingObjectives;
