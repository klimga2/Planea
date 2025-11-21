import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { AiOutlineCar } from "react-icons/ai";
import { BiDollarCircle } from "react-icons/bi";

import InputDropdown from "../../Components/Inputs/InputDropdown/InputDropdown";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import MixedBarChart from "../../Components/MixedBarChart/MixedBarChart";
import "./Distribución gastos x semana.css";

const allData = {
  "Semana 1": {
    total: "$4,200,000",
    chartData: [{ name: 'Lunes', Alimentación: 4000, Transporte: 2400, Otros: 2400 }, { name: 'Martes', Alimentación: 3000, Transporte: 1398, Otros: 2210 }, { name: 'Miércoles', Alimentación: 2000, Transporte: 9800, Otros: 2290 }, { name: 'Jueves', Alimentación: 2780, Transporte: 3908, Otros: 2000 }, { name: 'Viernes', Alimentación: 1890, Transporte: 4800, Otros: 2181 }],
    gastos: [
        { categoria: "Alimentación", icono: <FaUtensils />, color: "#1AB8C7", lightColor: "#EAF9FA", items: [{ nombre: "Mercado", porcentaje: 15 }, { nombre: "Almuerzo oficina", porcentaje: 20 }] },
        { categoria: "Transporte", icono: <AiOutlineCar />, color: "#6992E8", lightColor: "#E8EFFB", items: [{ nombre: "Uber", porcentaje: 10 }, { nombre: "MIO", porcentaje: 10 }] },
        { categoria: "Otros", icono: <BiDollarCircle />, color: "#C682E8", lightColor: "#F5EEFB", items: [{ nombre: "Compras", porcentaje: 5 }, { nombre: "Cumpleaños", porcentaje: 10 }] },
    ],
  },
  "Semana 2": {
    total: "$3,500,000",
    chartData: [{ name: 'Lunes', Alimentación: 3500, Transporte: 2200, Otros: 2000 }, { name: 'Martes', Alimentación: 2500, Transporte: 1200, Otros: 2000 }, { name: 'Miércoles', Alimentación: 1500, Transporte: 8800, Otros: 2100 }, { name: 'Jueves', Alimentación: 2400, Transporte: 3500, Otros: 1800 }, { name: 'Viernes', Alimentación: 1500, Transporte: 4200, Otros: 2000 }],
    gastos: [
      { categoria: "Alimentación", icono: <FaUtensils />, color: "#1AB8C7", lightColor: "#EAF9FA", items: [{ nombre: "Mercado", porcentaje: 15 }, { nombre: "Almuerzo oficina", porcentaje: 20 }] },
      { categoria: "Transporte", icono: <AiOutlineCar />, color: "#6992E8", lightColor: "#E8EFFB", items: [{ nombre: "Uber", porcentaje: 10 }, { nombre: "MIO", porcentaje: 10 }] },
      { categoria: "Otros", icono: <BiDollarCircle />, color: "#C682E8", lightColor: "#F5EEFB", items: [{ nombre: "Compras", porcentaje: 5 }, { nombre: "Cumpleaños", porcentaje: 10 }] },
    ],
  },
  "Semana 3": {
    total: "$3,800,000",
    chartData: [{ name: 'Lunes', Alimentación: 4200, Transporte: 2600, Otros: 2600 }, { name: 'Martes', Alimentación: 3200, Transporte: 1500, Otros: 2300 }, { name: 'Miércoles', Alimentación: 2200, Transporte: 10000, Otros: 2400 }, { name: 'Jueves', Alimentación: 2900, Transporte: 4100, Otros: 2100 }, { name: 'Viernes', Alimentación: 2000, Transporte: 5000, Otros: 2300 }],
    gastos: [
        { categoria: "Alimentación", icono: <FaUtensils />, color: "#1AB8C7", lightColor: "#EAF9FA", items: [{ nombre: "Mercado", porcentaje: 18 }, { nombre: "Almuerzo oficina", porcentaje: 18 }] },
        { categoria: "Transporte", icono: <AiOutlineCar />, color: "#6992E8", lightColor: "#E8EFFB", items: [{ nombre: "Uber", porcentaje: 15 }, { nombre: "MIO", porcentaje: 7 }] },
        { categoria: "Otros", icono: <BiDollarCircle />, color: "#C682E8", lightColor: "#F5EEFB", items: [{ nombre: "Regalos", porcentaje: 12 }, { nombre: "Fiesta", porcentaje: 8 }] },
    ],
  },
  "Semana 4": {
    total: "$4,500,000",
    chartData: [{ name: 'Lunes', Alimentación: 4500, Transporte: 2800, Otros: 2800 }, { name: 'Martes', Alimentación: 3500, Transporte: 1700, Otros: 2500 }, { name: 'Miércoles', Alimentación: 2500, Transporte: 10500, Otros: 2600 }, { name: 'Jueves', Alimentación: 3100, Transporte: 4300, Otros: 2300 }, { name: 'Viernes', Alimentación: 2200, Transporte: 5200, Otros: 2500 }],
    gastos: [
        { categoria: "Alimentación", icono: <FaUtensils />, color: "#1AB8C7", lightColor: "#EAF9FA", items: [{ nombre: "Mercado", porcentaje: 22 }, { nombre: "Almuerzo oficina", porcentaje: 16 }] },
        { categoria: "Transporte", icono: <AiOutlineCar />, color: "#6992E8", lightColor: "#E8EFFB", items: [{ nombre: "Uber", porcentaje: 10 }, { nombre: "MIO", porcentaje: 13 }] },
        { categoria: "Otros", icono: <BiDollarCircle />, color: "#C682E8", lightColor: "#F5EEFB", items: [{ nombre: "Paseo", porcentaje: 15 }, { nombre: "Cumpleaños", porcentaje: 9 }] },
    ],
  },
  "Mensual": {
    total: "$16,000,000",
    chartData: [{ name: 'Semana 1', Alimentación: 16800, Transporte: 10400, Otros: 10400 }, { name: 'Semana 2', Alimentación: 14000, Transporte: 8800, Otros: 8000 }, { name: 'Semana 3', Alimentación: 15200, Transporte: 11200, Otros: 10400 }, { name: 'Semana 4', Alimentación: 18000, Transporte: 12000, Otros: 11200 }],
    gastos: [
        { categoria: "Alimentación", icono: <FaUtensils />, color: "#1AB8C7", lightColor: "#EAF9FA", items: [{ nombre: "Mercado", porcentaje: 19 }, { nombre: "Almuerzo oficina", porcentaje: 17 }] },
        { categoria: "Transporte", icono: <AiOutlineCar />, color: "#6992E8", lightColor: "#E8EFFB", items: [{ nombre: "Uber", porcentaje: 12 }, { nombre: "MIO", porcentaje: 9 }] },
        { categoria: "Otros", icono: <BiDollarCircle />, color: "#C682E8", lightColor: "#F5EEFB", items: [{ nombre: "Varios", porcentaje: 20 }, { nombre: "Ahorro", porcentaje: 23 }] },
    ],
  },
};

const DistribucionGastosSemana = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Semana 2");
  const navigate = useNavigate();

  const options = ["Mensual", "Semana 1", "Semana 2", "Semana 3", "Semana 4"];
  const data = allData[selectedPeriod];

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="distribucion-gastos-semana">
      <header className="header">
        <div className="back-arrow" onClick={handleBackClick}>&lt;</div>
        <h1>Distribución de gastos</h1>
      </header>

      <main>
        <div className="chart-card">
          <div className="chart-header">
            <h2>{selectedPeriod}</h2>
            <InputDropdown options={options} value={selectedPeriod} onChange={setSelectedPeriod} />
          </div>
          <div className="chart-main">
            <div className="chart-tooltip">
                <span>{data.total}</span>
            </div>
            <MixedBarChart data={data.chartData} />
          </div>
          <div className="legend">
            <div className="legend-item">
              <span className="dot" style={{ backgroundColor: '#1AB8C7' }}></span> Alimentación
            </div>
            <div className="legend-item">
              <span className="dot" style={{ backgroundColor: '#6992E8' }}></span> Transporte
            </div>
            <div className="legend-item">
              <span className="dot" style={{ backgroundColor: '#C682E8' }}></span> Otros
            </div>
          </div>
        </div>

        <div className="gastos-list">
          {data.gastos.map((gasto, index) => (
            <div key={index} className="gasto-card">
              <div className="gasto-card-header">
                <div className="gasto-card-icon" style={{ color: gasto.color }}>{gasto.icono}</div>
                <h3 style={{ color: gasto.color }}>{gasto.categoria}</h3>
              </div>
              <div className="gasto-card-body">
                {gasto.items.map((item, i) => (
                  <div key={i} className="gasto-item">
                    <p>{item.nombre}</p>
                    <div className="progress-bar-container">
                        <div className="progress-bar-wrapper">
                            <ProgressBar
                                progress={item.porcentaje}
                                color={gasto.color}
                                lightColor={gasto.lightColor}
                            />
                        </div>
                        <span className="progress-bar-percentage" style={{ color: gasto.color }}>
                            {item.porcentaje}%
                        </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DistribucionGastosSemana;
