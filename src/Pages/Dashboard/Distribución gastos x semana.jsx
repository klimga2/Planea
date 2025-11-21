import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaHome, FaStar, FaDollarSign } from "react-icons/fa";
import { AiOutlineCar } from "react-icons/ai";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

import InputDropdown from "../../Components/Inputs/InputDropdown/InputDropdown";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import "./Distribución gastos x semana.css";

const allData = {
  "Semana 1": {
    total: "$875,000",
    chartData: [
        { name: 'Alimentación', value: 400 },
        { name: 'Vivienda', value: 600 },
        { name: 'Transporte', value: 300 },
        { name: 'Ocio', value: 200 },
        { name: 'Otros', value: 100 },
    ],
    categories: [
      { name: "Alimentación", color: "#00BCD4" },
      { name: "Transporte", color: "#4D9DE0" },
      { name: "Ocio", color: "#23457E" },
      { name: "Vivienda", color: "#A787FB" },
      { name: "Otros", color: "#9BCFFD" },
    ],
    summary: [
      { name: "Alimentación", amount: "$250,000" },
      { name: "Transporte", amount: "$200,000" },
      { name: "Ocio", amount: "$166,250" },
    ],
    gastos: [
      {
        categoria: "Alimentación",
        icono: "FaUtensils",
        color: "#00BCD4",
        lightColor: "#E0F7FA",
        porcentaje: 25,
      },
      {
        categoria: "Transporte",
        icono: "AiOutlineCar",
        color: "#4D9DE0",
        lightColor: "#E3F2FD",
        porcentaje: 20,
      },
      {
        categoria: "Ocio",
        icono: "FaStar",
        color: "#23457E",
        lightColor: "#E8EAF6",
        porcentaje: 15,
      },
      {
        categoria: "Vivienda",
        icono: "FaHome",
        color: "#A787FB",
        lightColor: "#F3E5F5",
        porcentaje: 30,
      },
      {
        categoria: "Otros",
        icono: "FaDollarSign",
        color: "#9BCFFD",
        lightColor: "#E1F5FE",
        porcentaje: 5,
      },
    ],
  },
    "Semana 2": {
    total: "$875,000",
    chartData: [
        { name: 'Alimentación', value: 400 },
        { name: 'Vivienda', value: 600 },
        { name: 'Transporte', value: 300 },
        { name: 'Ocio', value: 200 },
        { name: 'Otros', value: 100 },
    ],
    categories: [
      { name: "Alimentación", color: "#00BCD4" },
      { name: "Transporte", color: "#4D9DE0" },
      { name: "Ocio", color: "#23457E" },
      { name: "Vivienda", color: "#A787FB" },
      { name: "Otros", color: "#9BCFFD" },
    ],
    summary: [
      { name: "Alimentación", amount: "$250,000" },
      { name: "Transporte", amount: "$200,000" },
      { name: "Ocio", amount: "$166,250" },
    ],
    gastos: [
      {
        categoria: "Alimentación",
        icono: "FaUtensils",
        color: "#00BCD4",
        lightColor: "#E0F7FA",
        porcentaje: 25,
      },
      {
        categoria: "Transporte",
        icono: "AiOutlineCar",
        color: "#4D9DE0",
        lightColor: "#E3F2FD",
        porcentaje: 20,
      },
      {
        categoria: "Ocio",
        icono: "FaStar",
        color: "#23457E",
        lightColor: "#E8EAF6",
        porcentaje: 15,
      },
      {
        categoria: "Vivienda",
        icono: "FaHome",
        color: "#A787FB",
        lightColor: "#F3E5F5",
        porcentaje: 30,
      },
      {
        categoria: "Otros",
        icono: "FaDollarSign",
        color: "#9BCFFD",
        lightColor: "#E1F5FE",
        porcentaje: 5,
      },
    ],
  },
};

const chartColors = ["#00BCD4", "#A7D7F9", "#4D9DE0", "#23457E", "#A787FB"];

const iconMap = {
    FaUtensils: <FaUtensils />,
    AiOutlineCar: <AiOutlineCar />,
    FaStar: <FaStar />,
    FaHome: <FaHome />,
    FaDollarSign: <FaDollarSign />,
};

const DistribucionGastosSemana = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Semana 1");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedPeriod === "Mensual") {
      navigate(`/GastosMes`);
    }
  }, [selectedPeriod, navigate]);

  const options = ["Mensual", "Semana 1", "Semana 2", "Semana 3", "Semana 4"];
  const data = allData[selectedPeriod] || allData["Semana 1"];

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
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={false} />
                    <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                        {
                            data.chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                            ))
                        }
                    </Bar>
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

        <div className="distribucion-gastos-semana-summary-cards">
          {data.summary.map((item, index) => (
            <div className="distribucion-gastos-semana-summary-card" key={index}>
              <h4>{item.name}</h4>
              <p>{item.amount}</p>
            </div>
          ))}
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
                <div className="distribucion-gastos-semana-gasto-item">
                  <div className="distribucion-gastos-semana-progress-bar-container">
                    <div className="distribucion-gastos-semana-progress-bar-wrapper">
                      <ProgressBar
                        progress={gasto.porcentaje}
                        color={gasto.color}
                        lightColor={gasto.lightColor}
                      />
                    </div>
                    <span
                      className="distribucion-gastos-semana-progress-bar-percentage"
                      style={{ color: gasto.color }}
                    >
                      {gasto.porcentaje}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DistribucionGastosSemana;
