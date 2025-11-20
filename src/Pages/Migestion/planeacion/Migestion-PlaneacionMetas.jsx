import React, { useEffect, useState } from "react";
import {
  MdErrorOutline,
  MdSchool,
  MdArrowForwardIos,
  MdAdd,
  MdCameraAlt,
  MdMusicNote,
  MdHome,
  MdDirectionsCar,
  MdFlight,
  MdBuild,
  MdAttachMoney,
  MdArrowBack
} from "react-icons/md";
import { FaTshirt } from "react-icons/fa";
import bannerPlaneacion from "../../../assets/bannerplaneacion.png";
import { useNavigate } from "react-router-dom";

import "./Migestion-PlaneacionMetas.css";

// 🔵 Iconos según el ID que guardaste
const iconOptions = {
  1: <FaTshirt size={22} color="#3A5BA0" />,
  2: <MdErrorOutline size={22} color="#3A5BA0" />,
  3: <MdSchool size={22} color="#3A5BA0" />,
  4: <MdCameraAlt size={22} color="#3A5BA0" />,
  5: <MdMusicNote size={22} color="#3A5BA0" />,
  6: <MdDirectionsCar size={22} color="#3A5BA0" />,
  7: <MdFlight size={22} color="#3A5BA0" />,
  8: <MdAttachMoney size={22} color="#3A5BA0" />,
  9: <MdBuild size={22} color="#3A5BA0" />,
  10: <MdHome size={22} color="#3A5BA0" />,
};



const icons = {
  arrowRight: <MdArrowForwardIos size={16} color="#3A5BA0" />,
  add: <MdAdd size={18} color="#2196F3" style={{ background: "#fff", borderRadius: "50%" }} />,
};

function ProgressBar({ value, color }) {
  return (

    <div className="progress-bar-bg">
      <div className="progress-bar-fill" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

export default function MigestionPlaneacionMetas() {

  const iconColor = '#4D9DE0';
  const iconStyle = { size: 28, color: iconColor };


  const navigate = useNavigate();
  const [metas, setMetas] = useState([]);

  // 🔵 Cargar metas del localStorage
  useEffect(() => {
    const localMetas = JSON.parse(localStorage.getItem("metas") || "[]");
    setMetas(localMetas);
  }, []);

  return (
    <div className="planeacion-container">

 <div className='top-bar'>
                       <span className='back-arrow' onClick={() => navigate("/Migestion-gestionDiaria")}>

                           <MdArrowBack size={24} color={iconColor} />
                       </span>
                       <span className='top-bar-title'>Gestión diaria</span>
                   </div>


      <h1 className="main-title">Planeación de metas</h1>

      <div className="banner">
  <img src={bannerPlaneacion} className="banner-img" />
</div>


      {/* Panel reciente */}
      <div className="panel-section">
        <div className="panel-header">
          <span>Panel reciente</span>
          <span className="panel-arrow">{icons.arrowRight}</span>
        </div>

        <div className="panel-card">
          {metas.length === 0 && (
            <p className="no-metas">Aún no tienes metas creadas.</p>
          )}

          {metas.map((meta) => (
            <div className="panel-meta-row" key={meta.name}>

              <div className="panelmetasactual">
                <span className="panel-meta-icon">{iconOptions[meta.iconId]}</span>
                <span className="panel-meta-title">{meta.name}</span>
              </div>
              <div className="panelmetaprogreso">
                <ProgressBar value={meta.progress} color={meta.color} />
                <span className="panel-meta-percent">{meta.progress} %</span>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mis metas */}
      <div className="mis-metas-section">
        <div className="mis-metas-header">
          <span>Mis metas</span>
          <span className="mis-metas-arrow">{icons.arrowRight}</span>
        </div>

        <div className="mis-metas-list">
          {metas.length === 0 && (
            <p className="no-metas">No hay metas aún.</p>
          )}

          {metas.map((meta) => (
            <div
  className="mis-meta-card"
  key={meta.name}
  onClick={() => navigate(`/Migestion-meta/${meta.name}`)}
>
  <span className="mis-meta-title">{meta.name}</span>
  <span className="mis-meta-amount">Meta: {meta.amount}</span>
</div>
          ))}
        </div>
      </div>

      {/* Botón agregar */}
      <a href="/Migestion-crearmeta">
        <button className="add-meta-btn">
          Agregar nueva meta {icons.add}
        </button>
      </a>

    </div>
  );
}
