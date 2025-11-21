import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvestmentObjectives.css'; // Reusing the same CSS
import { IoIosArrowBack } from 'react-icons/io';

const taxOptions = [
  {
    id: 'declaration',
    label: 'Identificar si el usuario declara renta y en qué categoría tributaria se encuentra.'
  },
  {
    id: 'knowledge',
    label: 'Evaluar su nivel de conocimiento sobre beneficios o deducciones fiscales.'
  },
  {
    id: 'optimization',
    label: 'Detectar oportunidades para optimizar impuestos (por ejemplo, a través de aportes voluntarios o deducciones por educación).'
  },
  {
    id: 'registration',
    label: 'Promover el registro ordenado de ingresos, egresos y documentos que faciliten su declaración.'
  }
];

const TaxPlanningObjectives = () => {
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
        <h1>¿Cuáles son tus objetivos de planeación tributaria?</h1>
      </div>
      
      <div className="options-container"> {/* Reusing class for styling */}
        {taxOptions.map(option => (
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

export default TaxPlanningObjectives;
