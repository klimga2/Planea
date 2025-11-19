import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Migestion-presupuesto.css';

import {
    MdChevronLeft,
    MdTrendingUp,
    MdAccessTime,
    MdAccountBalanceWallet
} from 'react-icons/md';

const MigestionPresupuesto = () => {
    const navigate = useNavigate();

    // Función para obtener el estado inicial desde localStorage o usar valores por defecto
    const getInitialState = () => {
        const savedData = localStorage.getItem('presupuestoData');
        if (savedData) {
            const data = JSON.parse(savedData);
            // Asegurarse de que los valores numéricos se manejen correctamente
            return {
                ...data,
                fondoPresupuesto: data.fondoPresupuesto || '3000000',
                montoAcumulado: Number(data.montoAcumulado) || 0,
                ingresoActual: '', // Siempre empieza vacío
                metaAlcanzadaNotificada: data.metaAlcanzadaNotificada || false
            };
        }

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return {
            fondoPresupuesto: '3000000',
            montoAcumulado: 0,
            ingresoActual: '',
            moneda: 'COP',
            fechaInicio: `${day}/${month}/${year}`,
            activeCard: 'Personalizado',
            metaAlcanzadaNotificada: false
        };
    };

    const initialState = getInitialState();
    const [fondoPresupuesto, setFondoPresupuesto] = useState(initialState.fondoPresupuesto);
    const [montoAcumulado, setMontoAcumulado] = useState(initialState.montoAcumulado);
    const [ingresoActual, setIngresoActual] = useState(initialState.ingresoActual);
    const [moneda, setMoneda] = useState(initialState.moneda);
    const [fechaInicio, setFechaInicio] = useState(initialState.fechaInicio);
    const [activeCard, setActiveCard] = useState(initialState.activeCard);
    const [metaAlcanzadaNotificada, setMetaAlcanzadaNotificada] = useState(initialState.metaAlcanzadaNotificada);

    // Efecto para guardar en localStorage
    useEffect(() => {
        const dataToSave = {
            fondoPresupuesto,
            montoAcumulado,
            moneda,
            fechaInicio,
            activeCard,
            metaAlcanzadaNotificada
        };
        localStorage.setItem('presupuestoData', JSON.stringify(dataToSave));
    }, [fondoPresupuesto, montoAcumulado, moneda, fechaInicio, activeCard, metaAlcanzadaNotificada]);

    // Efecto para la alerta de meta alcanzada
    useEffect(() => {
        if (montoAcumulado >= parseInt(fondoPresupuesto.replace(/[^0-9]/g, ''), 10) && !metaAlcanzadaNotificada) {
            alert('¡Felicidades! ¡Has alcanzado tu meta de ahorro!');
            setMetaAlcanzadaNotificada(true);
        }
    }, [montoAcumulado, fondoPresupuesto, metaAlcanzadaNotificada]);
    
    const formatCurrency = (value, currency) => {
        const numberValue = parseInt(String(value).replace(/[^0-9]/g, ''), 10);
        if (isNaN(numberValue)) {
            return new Intl.NumberFormat('es-CO', {
                style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0
            }).format(0);
        }
        return new Intl.NumberFormat('es-CO', {
            style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0
        }).format(numberValue);
    };
    
    const handleNumericInputChange = (setter) => (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        setter(numericValue);
    };
    
    const handleCardClick = (cardTitle) => {
        setActiveCard(cardTitle);
    };

    // Sumar el ingreso actual al monto acumulado
    const handleSave = () => {
        const nuevoIngreso = parseInt(ingresoActual, 10) || 0;
        if (nuevoIngreso > 0) {
            setMontoAcumulado(prevMonto => prevMonto + nuevoIngreso);
            setIngresoActual(''); // Limpiar el input después de sumar
        }
        alert('¡Progreso guardado!');
    };

    // Resetear la notificación si la meta cambia y ya no se ha alcanzado
    useEffect(() => {
        if (montoAcumulado < parseInt(fondoPresupuesto.replace(/[^0-9]/g, ''), 10)) {
            setMetaAlcanzadaNotificada(false);
        }
    }, [fondoPresupuesto, montoAcumulado]);

    const metaNumerica = parseInt(fondoPresupuesto.replace(/[^0-9]/g, ''), 10) || 1;
    const porcentajeCompletado = Math.min((montoAcumulado / metaNumerica) * 100, 100).toFixed(0);
    const metaRestante = Math.max(metaNumerica - montoAcumulado, 0);

    return (
        <div className="presupuesto-container">
            <header className="presupuesto-header">
                <button onClick={() => navigate(-1)} className="back-arrow"><MdChevronLeft /></button>
                <h1>Presupuesto</h1>
            </header>

            <div className="presupuesto-banner">
                <div className="banner-header">
                    <h2 className="banner-main-amount">{formatCurrency(montoAcumulado, moneda)}</h2>
                    <p className="banner-total-amount">de {formatCurrency(fondoPresupuesto, moneda)}</p>
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${porcentajeCompletado}%` }}></div>
                </div>
                <div className="banner-footer">
                    <span>{porcentajeCompletado}% Ahorrado</span>
                    <span>Meta restante: {formatCurrency(metaRestante, moneda)}</span>
                </div>
            </div>

            <section className="pres-section">
                <div className="pres-section-header">
                    <span className="pres-section-icon"><MdTrendingUp /></span>
                    <h3>Ingresos</h3>
                </div>
                <div className="form-group">
                    <label htmlFor="ingreso-actual">Añadir Ingreso</label>
                    <input 
                        id="ingreso-actual" 
                        type="text" 
                        className="pres-input" 
                        value={formatCurrency(ingresoActual, moneda)}
                        onChange={handleNumericInputChange(setIngresoActual)}
                        placeholder='Añade un monto y guárdalo'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="excedente">Excedente al final del periodo</label>
                    <select id="excedente" className="pres-select">
                        <option>----</option>
                    </select>
                </div>
            </section>

            <section className="pres-section">
                <div className="pres-section-header">
                    <span className="pres-section-icon"><MdAccessTime /></span>
                    <h3>Periodicidad y ciclo</h3>
                </div>
                <div className="form-group">
                    <label htmlFor="fondo-presupuesto">Meta de Ahorro</label>
                    <input 
                        id="fondo-presupuesto" 
                        type="text" 
                        className="pres-input" 
                        value={formatCurrency(fondoPresupuesto, moneda)}
                        onChange={handleNumericInputChange(setFondoPresupuesto)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fecha-inicio">Fecha de inicio</label>
                    <input 
                        id="fecha-inicio" 
                        type="text" 
                        className="pres-input" 
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        placeholder="dd/mm/aaaa"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="moneda">Moneda</label>
                    <select id="moneda" className="pres-select" value={moneda} onChange={(e) => setMoneda(e.target.value)}>
                        <option value="COP">COP</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
            </section>

            <section className="pres-section">
                <div className="pres-section-header">
                    <span className="pres-section-icon"><MdAccountBalanceWallet /></span>
                    <h3>Modo de presupuesto</h3>
                </div>
                <div className="pres-budget-modes">
                <div className={`mode-card ${activeCard === 'Regla 30/50/20' ? 'active' : ''}`} onClick={() => handleCardClick('Regla 30/50/20')}>
                        <h4>Regla 30/50/20</h4>
                        <p>50% esenciales, 30% deseos, 20% ahorro.</p>
                    </div>
                    <div className={`mode-card ${activeCard === 'Cero-base' ? 'active' : ''}`} onClick={() => handleCardClick('Cero-base')}>
                        <h4>Cero-base</h4>
                        <p>Asigna 100% del ingreso a categorías.</p>
                    </div>
                    <div className={`mode-card ${activeCard === 'Sobres' ? 'active' : ''}`} onClick={() => handleCardClick('Sobres')}>
                        <h4>Sobres</h4>
                        <p>Sobres por categoría con tope fijo.</p>
                    </div>
                    <div className={`mode-card ${activeCard === 'Personalizado' ? 'active' : ''}`} onClick={() => handleCardClick('Personalizado')}>
                        <h4>Personalizado</h4>
                        <p>Define tus propias reglas.</p>
                    </div>
                </div>
            </section>

            <footer className="pres-footer-actions">
                <button className="btn btn-secondary">Configuraciones avanzadas</button>
                <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
            </footer>
        </div>
    );
};

export default MigestionPresupuesto;
