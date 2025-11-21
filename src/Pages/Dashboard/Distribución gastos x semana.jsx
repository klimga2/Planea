import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaDollarSign } from "react-icons/fa";
import { AiOutlineCar } from "react-icons/ai";
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

import InputDropdown from "../../Components/Inputs/InputDropdown/InputDropdown";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import "./Distribución gastos x semana.css";

const allData = {
  "Semana 1": {
    total: "$3,200,000",
    chartData: [
        { day: 'Lunes', Alimentación: 350, Transporte: 200, Otros: 100 },
        { day: 'Martes', Alimentación: 400, Transporte: 250, Otros: 120 },
        { day: 'Miércoles', Alimentación: 300, Transporte: 210, Otros: 150 },
        { day: 'Jueves', Alimentación: 250, Transporte: 190, Otros: 80 },
        { day: 'Viernes', Alimentación: 150, Transporte: 120, Otros: 90 },
    ],
    categories: [
      { name: "Alimentación", color: "#00BCD4" },
      { name: "Transporte", color: "#4D9DE0" },
      { name: "Otros", color: "#A787FB" },
    ],
    gastos: [
      {
        categoria: "Alimentación",
        icono: "FaUtensils",
        color: "#00BCD4",
        items: [
          { name: "Mercado", porcentaje: 20 },
          { name: "Almuerzo oficina", porcentaje: 25 }
        ]
      },
      {
        categoria: "Transporte",
        icono: "AiOutlineCar",
        color: "#4D9DE0",
        items: [
          { name: "Uber", porcentaje: 12 },
          { name: "MIO", porcentaje: 15 }
        ]
      },
      {
        categoria: "Otros",
        icono: "FaDollarSign",
        color: "#A787FB",
        items: [
          { name: "Compras", porcentaje: 8 },
          { name: "Cumpleaños", porcentaje: 12 }
        ]
      }
    ]
  },
  "Semana 2": {
    total: "$3,500,000",
    chartData: [
        { day: 'Lunes', Alimentación: 400, Transporte: 240, Otros: 150 },
        { day: 'Martes', Alimentación: 300, Transporte: 200, Otros: 100 },
        { day: 'Miércoles', Alimentación: 350, Transporte: 220, Otros: 180 },
        { day: 'Jueves', Alimentación: 200, Transporte: 180, Otros: 50 },
        { day: 'Viernes', Alimentación: 100, Transporte: 100, Otros: 80 },
    ],
    categories: [
      { name: "Alimentación", color: "#00BCD4" },
      { name: "Transporte", color: "#4D9DE0" },
      { name: "Otros", color: "#A787FB" },
    ],
    gastos: [
      {
        categoria: "Alimentación",
        icono: "FaUtensils",
        color: "#00BCD4",
        items: [
          { name: "Mercado", porcentaje: 15 },
          { name: "Almuerzo oficina", porcentaje: 20 }
        ]
      },
      {
        categoria: "Transporte",
        icono: "AiOutlineCar",
        color: "#4D9DE0",
        items: [
          { name: "Uber", porcentaje: 10 },
          { name: "MIO", porcentaje: 10 }
        ]
      },
      {
        categoria: "Otros",
        icono: "FaDollarSign",
        color: "#A787FB",
        items: [
          { name: "Compras", porcentaje: 5 },
          { name: "Cumpleaños", porcentaje: 10 }
        ]
      }
    ]
  },
    "Semana 3": {
    total: "$3,800,000",
    chartData: [
        { day: 'Lunes', Alimentación: 450, Transporte: 280, Otros: 180 },
        { day: 'Martes', Alimentación: 350, Transporte: 220, Otros: 130 },
        { day: 'Miércoles', Alimentación: 400, Transporte: 250, Otros: 200 },
        { day: 'Jueves', Alimentación: 220, Transporte: 200, Otros: 70 },
        { day: 'Viernes', Alimentación: 120, Transporte: 150, Otros: 100 },
    ],
    categories: [
      { name: "Alimentación", color: "#00BCD4" },
      { name: "Transporte", color: "#4D9DE0" },
      { name: "Otros", color: "#A787FB" },
    ],
    gastos: [
      {
        categoria: "Alimentación",
        icono: "FaUtensils",
        color: "#00BCD4",
        items: [
          { name: "Mercado", porcentaje: 18 },
          { name: "Almuerzo oficina", porcentaje: 22 }
        ]
      },
      {
        categoria: "Transporte",
        icono: "AiOutlineCar",
        color: "#4D9DE0",
        items: [
          { name: "Uber", porcentaje: 14 },
          { name: "MIO", porcentaje: 12 }
        ]
      },
      {
        categoria: "Otros",
        icono: "FaDollarSign",
        color: "#A787FB",
        items: [
          { name: "Compras", porcentaje: 7 },
          { name: "Cumpleaños", porcentaje: 15 }
        ]
      }
    ]
  },
    "Semana 4": {
    total: "$3,100,000",
    chartData: [
        { day: 'Lunes', Alimentación: 380, Transporte: 220, Otros: 120 },
        { day: 'Martes', Alimentación: 320, Transporte: 180, Otros: 110 },
        { day: 'Miércoles', Alimentación: 370, Transporte: 240, Otros: 160 },
        { day: 'Jueves', Alimentación: 180, Transporte: 160, Otros: 60 },
        { day: 'Viernes', Alimentación: 90, Transporte: 110, Otros: 70 },
    ],
    categories: [
      { name: "Alimentación", color: "#00BCD4" },
      { name: "Transporte", color: "#4D9DE0" },
      { name: "Otros", color: "#A787FB" },
    ],
    gastos: [
      {
        categoria: "Alimentación",
        icono: "FaUtensils",
        color: "#00BCD4",
        items: [
          { name: "Mercado", porcentaje: 12 },
          { name: "Almuerzo oficina", porcentaje: 18 }
        ]
      },
      {
        categoria: "Transporte",
        icono: "AiOutlineCar",
        color: "#4D9DE0",
        items: [
          { name: "Uber", porcentaje: 8 },
          { name: "MIO", porcentaje: 8 }
        ]
      },
      {
        categoria: "Otros",
        icono: "FaDollarSign",
        color: "#A787FB",
        items: [
          { name: "Compras", porcentaje: 6 },
          { name: "Cumpleaños", porcentaje: 8 }
        ]
      }
    ]
  },
};

const iconMap = {
    FaUtensils: <FaUtensils />,
    AiOutlineCar: <AiOutlineCar />,
    FaDollarSign: <FaDollarSign />,
};

const DistribucionGastosSemana = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Semana 2");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPeriod === "Mensual") {
      navigate(`/GastosMes`);
    }
  }, [selectedPeriod, navigate]);

  const options = ["Mensual", "Semana 1", "Semana 2", "Semana 3", "Semana 4"];
  const data = allData[selectedPeriod] || allData["Semana 2"];

  const handleBackClick = () => {
    navigate(`/GastosMes`);
  };

  return (
    <div className="distribucion-gastos-semana">
      <header className="distribucion-gastos-semana-header">
        <div className="distribucion-gastos-semana-back-arrow" onClick={handleBackClick}>
          &lt;
        </div>
        <h1>Distribución de gastos</h1>
      </header>

      <main>
        <div className="distribucion-gastos-semana-chart-card">
          <div className="distribucion-gastos-semana-chart-header">
            <h2>{selectedPeriod}</h2>
            <InputDropdown
              options={options}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
            />
          </div>
          <div className="distribucion-gastos-semana-chart-main">
            <div className="distribucion-gastos-semana-chart-tooltip">
              <span>{data.total}</span>
            </div>
            <ResponsiveContainer width="100%" height={150}>
                <BarChart data={data.chartData} margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                    <Bar dataKey="Alimentación" fill="#00BCD4" radius={[5, 5, 0, 0]} barSize={10} />
                    <Bar dataKey="Transporte" fill="#4D9DE0" radius={[5, 5, 0, 0]} barSize={10} />
                    <Bar dataKey="Otros" fill="#A787FB" radius={[5, 5, 0, 0]} barSize={10} />
                </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="distribucion-gastos-semana-legend">
            {data.categories.map((category, index) => (
              <div className="distribucion-gastos-semana-legend-item" key={index}>
                <span
                  className="distribucion-gastos-semana-dot"
                  style={{ backgroundColor: category.color }}
                ></span>{" "}
                {category.name}
              </div>
            ))}
          </div>
        </div>

        <div className="distribucion-gastos-semana-gastos-list">
          {data.gastos.map((gasto, index) => (
            <div key={index} className="distribucion-gastos-semana-gasto-card">
              <div className="distribucion-gastos-semana-gasto-card-header">
                <div className="distribucion-gastos-semana-gasto-card-icon" style={{ color: gasto.color }}>
                  {iconMap[gasto.icono]}
                </div>
                <h3 style={{ color: gasto.color }}>{gasto.categoria}</h3>
              </div>
              <div className="distribucion-gastos-semana-gasto-card-body">
                {gasto.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="distribucion-gastos-semana-gasto-item">
                    <span className="distribucion-gastos-semana-gasto-item-name">{item.name}</span>
                    <div className="distribucion-gastos-semana-progress-bar-container">
                      <div className="distribucion-gastos-semana-progress-bar-wrapper">
                        <ProgressBar
                          progress={item.porcentaje}
                          color={gasto.color}
                          lightColor={`${gasto.color}33`}
                        />
                      </div>
                      <span
                        className="distribucion-gastos-semana-progress-bar-percentage"
                        style={{ color: gasto.color }}
                      >
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
