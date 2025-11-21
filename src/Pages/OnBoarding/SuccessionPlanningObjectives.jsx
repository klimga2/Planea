import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvestmentObjectives.css'; // Reusing the same CSS
import { IoIosArrowBack } from 'react-icons/io';

const successionOptions = [
  {
    id: 'asset_identification',
    label: 'Identificar si el usuario posee bienes o inversiones que requieran planificación futura.'
  },
  {
    id: 'awareness',
    label: 'Promover la toma de conciencia sobre la importancia de la herencia y los testamentos.'
  },
  {
    id: 'preparation_level',
    label: 'Evaluar su nivel de preparación para asegurar la transmisión ordenada del patrimonio.'
  },
  {
    id: 'guidance',
    label: 'Recomendar recursos o asesorías que orienten la planeación familiar o empresarial.'
  }
];

const SuccessionPlanningObjectives = () => {
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
        <h1>¿Cuáles son tus objetivos de planeación sucesoral?</h1>
      </div>
      
      <div className="options-container"> {/* Reusing class for styling */}
        {successionOptions.map(option => (
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

export default SuccessionPlanningObjectives;
