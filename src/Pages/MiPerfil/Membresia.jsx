import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Membresia.css';

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
  </svg>
);

const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
  </svg>
);

const Membresia = () => {
  const navigate = useNavigate();

  const planes = [
    {
      id: 1,
      nombre: "Plan esencial",
      icon: <StarIcon />,
      descripcion: "Ideal para quienes quieren entender y organizar sus finanzas desde lo básico.",
      beneficios: [
        "Acceso completo a los módulos educativos.",
        "Dashboard financiero con visión general de ingresos, gastos y metas.",
        "Registro automatizado y manual de gastos y herramientas básicas de presupuesto.",
        "Simuladores de ahorro, inversión y crédito en versión estándar."
      ],
      limites: [
        "No incluye recomendaciones personalizadas.",
        "No analiza patrones de gasto de forma automática.",
        "Sin alertas inteligentes ni acompañamiento conversacional."
      ],
      color: "#4A90E2"
    },
    {
      id: 2,
      nombre: "Plan inteligente",
      icon: <BrainIcon />,
      descripcion: "Para usuarios que quieren acompañamiento y automatización sin perder control.",
      beneficios: [
        "Todo lo del Plan Esencial.",
        "Asistente financiero con IA para resolver dudas.",
        "Recomendaciones personalizadas basadas en tus hábitos y metas.",
        "Alertas inteligentes: gastos inusuales, riesgo de sobreendeudamiento, progreso de metas.",
        "Análisis automático de tendencias de ingreso y gasto.",
        "Contenidos educativos adaptados al nivel del usuario."
      ],
      limites: [
        "Límite mensual de consultas avanzadas con IA.",
        "Consolidación de datos solo con bancos compatibles."
      ],
      color: "#5BA3F5"
    },
    {
      id: 3,
      nombre: "Plan Experto",
      icon: <FireIcon />,
      descripcion: "Para quienes quieren una visión 360° de su vida financiera y proyecciones a futuro.",
      beneficios: [
        "Todo lo del Plan Inteligente.",
        "Dashboard avanzado: proyecciones de patrimonio, jubilación y escenarios \"qué pasaría si...\".",
        "Simuladores profesionales con opciones personalizados (inflación, riesgo, plazos).",
        "Consolidación completa: cuentas, tarjetas, inversiones, seguros y patrimonio.",
        "Automatización de metas: el sistema sugiere cuánto ahorrar cada semana o mes.",
        "Reportes descargables para decisiones personales o laborales."
      ],
      limites: [],
      color: "#3d5a80"
    }
  ];

  return (
    <div className="membresia-container">
      <div className="membresia-header">
        <button className="back-button" onClick={() => navigate('/perfil/configuraciones')}>
          <BackIcon />
        </button>
        <h1>Membresía</h1>
      </div>

      <div className="membresia-banner">
        <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=300&fit=crop" alt="Membresía" />
        <p>Nuestras membresías están diseñadas para acompañarte según tu nivel, tus metas y la manera en que manejas tus finanzas.</p>
      </div>

      <div className="planes-list">
        {planes.map((plan) => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header">
              <div className="plan-icon" style={{ backgroundColor: `${plan.color}20` }}>
                <span style={{ color: plan.color }}>{plan.icon}</span>
              </div>
              <div className="plan-title-section">
                <h2 style={{ color: plan.color }}>{plan.nombre}</h2>
                <p className="plan-descripcion">{plan.descripcion}</p>
              </div>
            </div>

            <div className="plan-content">
              <h3>Beneficios</h3>
              <ul className="beneficios-list">
                {plan.beneficios.map((beneficio, index) => (
                  <li key={index}>{beneficio}</li>
                ))}
              </ul>

              {plan.limites.length > 0 && (
                <>
                  <h3>Límites</h3>
                  <ul className="limites-list">
                    {plan.limites.map((limite, index) => (
                      <li key={index}>{limite}</li>
                    ))}
                  </ul>
                </>
              )}

              <button className="cambiar-plan-btn" style={{ backgroundColor: plan.color }}>
                Cambiar a este plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membresia;
