import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvestmentObjectives.css'; // Reusing the same CSS
import { IoIosArrowBack } from 'react-icons/io';

const otherServicesOptions = [
  {
    id: 'guidance',
    label: 'Recibir acompañamiento digital o humano para organizar tus finanzas y tomar mejores decisiones.'
  },
  {
    id: 'comparison',
    label: 'Aprender a comparar tasas, planear pagos y evitar el sobreendeudamiento.'
  },
  {
    id: 'education',
    label: 'Acceder a minicursos, retos y guías que se adaptan a tu nivel y ritmo.'
  },
  {
    id: 'tools',
    label: 'Usar herramientas para equilibrar mis ingresos, gastos y metas personales.'
  }
];

const OtherFinancialServicesObjectives = () => {
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
        <h1>¿Cuáles son tus objetivos de servicios financieros?</h1>
      </div>
      
      <div className="options-container"> {/* Reusing class for styling */}
        {otherServicesOptions.map(option => (
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

export default OtherFinancialServicesObjectives;
