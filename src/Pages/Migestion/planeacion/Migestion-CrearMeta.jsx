import React, { useState, useEffect } from "react";
import {
  MdErrorOutline,
  MdSchool,
  MdCameraAlt,
  MdMusicNote,
  MdHome,
  MdDirectionsCar,
  MdFlight,
  MdBuild,
  MdAttachMoney,
  MdArrowForwardIos,
} from "react-icons/md";
import { FaTshirt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Migestion-CrearMeta.css";
import {
    MdArrowBack,
} from 'react-icons/md';

const iconOptions = [
  { id: 1, icon: <FaTshirt size={22} color="#3A5BA0" /> },
  { id: 2, icon: <MdErrorOutline size={22} color="#3A5BA0" /> },
  { id: 3, icon: <MdSchool size={22} color="#3A5BA0" /> },
  { id: 4, icon: <MdCameraAlt size={22} color="#3A5BA0" /> },
  { id: 5, icon: <MdMusicNote size={22} color="#3A5BA0" /> },
  { id: 6, icon: <MdDirectionsCar size={22} color="#3A5BA0" /> },
  { id: 7, icon: <MdFlight size={22} color="#3A5BA0" /> },
  { id: 8, icon: <MdAttachMoney size={22} color="#3A5BA0" /> },
  { id: 9, icon: <MdBuild size={22} color="#3A5BA0" /> },
  { id: 10, icon: <MdHome size={22} color="#3A5BA0" /> },
];

const purposeOptions = ["Pensión", "Inversión", "Ahorro", "Sucesión tributaria"];

function ToggleSwitch({ checked, onChange }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider" />
    </label>
  );
}

// ----------------------------------
// FORMAT dd/mm/aaaa
// ----------------------------------
function formatDate(value) {
  const digits = value.replace(/\D/g, "");
  let formatted = "";

  if (digits.length <= 2) {
    formatted = digits;
  } else if (digits.length <= 4) {
    formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
  } else {
    formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  }

  return formatted;
}

function parseDate(str) {
  if (!str || str.length !== 10) return null;
  const [d, m, y] = str.split("/").map(Number);
  const date = new Date(y, m - 1, d);
  return isNaN(date.getTime()) ? null : date;
}

export default function MigestionCrearMeta() {
  const navigate = useNavigate();

  const iconColor = '#4D9DE0';
    const iconStyle = { size: 28, color: iconColor };

  const [goalName, setGoalName] = useState("");
  const [purpose, setPurpose] = useState("Ahorro");
  const [purposeDropdown, setPurposeDropdown] = useState(false);
  const [priority, setPriority] = useState("Alta");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(10);
  const [autoAportar, setAutoAportar] = useState(true);
  const [dateError, setDateError] = useState("");

  // Cargar draft inicial
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("crearMetaDraft") || "{}");

    if (saved.goalName) setGoalName(saved.goalName);
    if (saved.purpose) setPurpose(saved.purpose);
    if (saved.priority) setPriority(saved.priority);
    if (saved.budget) setBudget(saved.budget);
    if (saved.startDate) setStartDate(saved.startDate);
    if (saved.endDate) setEndDate(saved.endDate);
    if (saved.selectedIcon) setSelectedIcon(saved.selectedIcon);
    if (saved.autoAportar !== undefined) setAutoAportar(saved.autoAportar);
  }, []);

  // Autosave
  useEffect(() => {
    localStorage.setItem(
      "crearMetaDraft",
      JSON.stringify({
        goalName,
        purpose,
        priority,
        budget,
        startDate,
        endDate,
        selectedIcon,
        autoAportar,
      })
    );
  }, [
    goalName,
    purpose,
    priority,
    budget,
    startDate,
    endDate,
    selectedIcon,
    autoAportar,
  ]);

  // Validación de fechas
  useEffect(() => {
    const d1 = parseDate(startDate);
    const d2 = parseDate(endDate);

    if (d1 && d2 && d1 > d2) {
      setDateError("La fecha de inicio no puede ser mayor que la fecha final.");
    } else {
      setDateError("");
    }
  }, [startDate, endDate]);

  // ----------------------------------
  // GUARDAR META
  // ----------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (dateError) return;

    // Validar obligatorios manualmente:
    if (!goalName || !purpose || !priority || !budget || !startDate) return;

    const metas = JSON.parse(localStorage.getItem("metas") || "[]");

    const budgetFormatted = `$ ${budget.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

    metas.push({
      iconId: selectedIcon,
      name: goalName,
      purpose,
      priority,
      budget,
      budgetFormatted,
      startDate,
      endDate: endDate || null,
      autoAportar,
      progress: 0,
      color: "#51A6F8",
    });

    localStorage.setItem("metas", JSON.stringify(metas));
    localStorage.removeItem("crearMetaDraft");

    navigate("/Migestion-planeacionmetas");
  };

  return (
    <div className="crear-meta-container">
      <div className='top-bar'>
                      <span className='back-arrow' onClick={() => navigate("/Migestion-planeacionmetas")}>
                          {/* Flecha de retroceso con el nuevo color */}
                          <MdArrowBack size={24} color={iconColor} />
                      </span>
                      <span className='top-bar-title'>Mis metas</span>
                  </div>

      <form className="crear-meta-form" onSubmit={handleSubmit}>
        <label className="form-label">Nombre de la meta *</label>
        <input
          className="form-input"
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          placeholder="Nombre de la meta"
          required
        />

        {/* PURPOSE */}
        <label className="form-label">Proposito de la meta *</label>
        <div
          className="dropdown-select"
          onClick={() => setPurposeDropdown(!purposeDropdown)}
        >
          <span>{purpose}</span>
          <MdArrowForwardIos
            size={18}
            color="#3A5BA0"
            style={{
              transform: purposeDropdown ? "rotate(90deg)" : "rotate(0deg)",
            }}
          />
        </div>

        {purposeDropdown && (
          <div className="dropdown-list">
            {purposeOptions.map((option) => (
              <div
                key={option}
                className="dropdown-list-item"
                onClick={() => {
                  setPurpose(option);
                  setPurposeDropdown(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {/* PRIORIDAD */}
        <label className="form-label">Prioridad de la meta *</label>
        <div className="priority-btns">
          {["Alta", "Media", "Baja"].map((p) => (
            <button
              key={p}
              type="button"
              className={`priority-btn ${priority === p ? "selected" : ""}`}
              onClick={() => setPriority(p)}
            >
              {p}
            </button>
          ))}
        </div>

        {/* PRESUPUESTO */}
        <label className="form-label">Presupuesto de la meta *</label>
        <input
          className="form-input"
          type="text"
          value={budget ? `$ ${budget.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : ""}
          onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="$ 0"
          required
        />

        {/* FECHA INICIO */}
        <label className="form-label">Fecha de inicio *</label>
        <input
          className="form-input"
          type="text"
          value={startDate}
          maxLength={10}
          onChange={(e) => setStartDate(formatDate(e.target.value))}
          placeholder="dd/mm/aaaa"
          required
        />

        {/* FECHA FINAL */}
        <label className="form-label">Fecha de finalización</label>
        <input
          className="form-input"
          type="text"
          value={endDate}
          maxLength={10}
          onChange={(e) => setEndDate(formatDate(e.target.value))}
          placeholder="dd/mm/aaaa"
        />

        {dateError && <p className="date-error">{dateError}</p>}

        {/* ICONOS */}
        <label className="form-label">Selecciona un icono</label>
        <div className="icon-grid">
          {iconOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`icon-grid-btn ${selectedIcon === opt.id ? "selected" : ""}`}
              onClick={() => setSelectedIcon(opt.id)}
            >
              {opt.icon}
            </button>
          ))}
        </div>


        <div className="auto-aportar-card">
          <div className="textoAutoaport">
            <span className="auto-aportar-title">Auto-aportar</span>
            <span className="auto-aportar-desc">
              Cada vez que recibas un ingreso, aportaremos un valor al fondo
            </span>
          </div>
          <ToggleSwitch
            checked={autoAportar}
            onChange={() => setAutoAportar(!autoAportar)}
          />
        </div>

        <div className="auto-aportar-card2">
          <span className="auto-aportar-title">Simuladores</span>
          <span className="auto-aportar-desc" >Simula distintos escenarios y toma decisiones informadas.</span>

        </div>

        <button className="guardar-meta-btn" type="submit" disabled={!!dateError}>
          Guardar meta
        </button>
      </form>
    </div>
  );
}
