import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvestmentObjectives.css'; // Reusing the same CSS
import { IoIosArrowBack } from 'react-icons/io';

const insuranceOptions = [
  {
    id: 'current_coverage',
    label: 'Conocer si el usuario cuenta actualmente con algún tipo de seguro (vida, salud, vehículo, vivienda, etc.).'
  },
  {
    id: 'gap_detection',
    label: 'Detectar brechas de cobertura frente a su contexto (dependientes, bienes, salud, ingresos).'
  },
  {
    id: 'knowledge_level',
    label: 'Evaluar el nivel de conocimiento sobre el funcionamiento y beneficios de sus pólizas.'
  },
  {
    id: 'recommendation',
    label: 'Recomendar seguros prioritarios según su perfil y nivel de riesgo.'
  }
];

const InsuranceObjectives = () => {
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
        <h1>¿Cuáles son tus objetivos de seguros?</h1>
      </div>
      
      <div className="options-container"> {/* Reusing class for styling */}
        {insuranceOptions.map(option => (
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

export default InsuranceObjectives;
