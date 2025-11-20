import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    MdArrowBack, 
    MdAttachMoney, 
    MdShowChart, 
    MdTrendingDown, 
    MdAdd, 
    MdClose,
    MdChevronLeft,
    MdChevronRight,
    MdHome,
    MdDirectionsCar,
    MdSwapHoriz,
    MdWork
} from 'react-icons/md';
import './Efectivo.css';


// Helper para formatear moneda
const formatCurrency = (amount, isExpense = false) => {
    const num = Math.abs(Number(amount)) || 0;
    const sign = isExpense ? '-' : '';
    return `${sign}$${num.toLocaleString('es-CO')}`;
};

const MovimientosPopup = ({ isOpen, onClose }) => {
    const iconColor = '#4D9DE0';

    const transactions = {
        'Domingo 12 de oct': [
            { icon: <MdHome size={24} color="#fff" />, title: 'Pago recibo de luz', category: 'Hogar', method: 'Efectivo', amount: -136000 },
            { icon: <MdDirectionsCar size={24} color="#fff" />, title: 'Uber', category: 'Transporte', method: 'Efectivo', amount: -12000 },
            { icon: <MdSwapHoriz size={24} color="#fff" />, title: 'Transferencia', category: 'Salud', method: 'Efectivo', amount: 40000 },
        ],
        'Sábado 11 de oct': [
            { icon: <MdWork size={24} color="#fff" />, title: 'Sueldo', category: 'Trabajo', method: 'Efectivo', amount: 5000000 },
            { icon: <MdHome size={24} color="#fff" />, title: 'Pago recibo de luz', category: 'Hogar', method: 'Efectivo', amount: -136000 },
            { icon: <MdDirectionsCar size={24} color="#fff" />, title: 'Uber', category: 'Transporte', method: 'Efectivo', amount: -12000 },
            { icon: <MdWork size={24} color="#fff" />, title: 'Prima', category: 'Trabajo', method: 'Efectivo', amount: 5000000 },
        ],
    };

    const TransactionItem = ({ icon, title, category, method, amount }) => {
        const isExpense = amount < 0;
        return (
            <div className="transaction-item">
                <div className="transaction-icon-container">
                    {icon}
                </div>
                <div className="transaction-details">
                    <span className="transaction-title">{title}</span>
                    <span className="transaction-category">{`${category} - ${method}`}</span>
                </div>
                <span className={`transaction-amount ${isExpense ? 'expense' : 'income'}`}>
                    {formatCurrency(amount, isExpense)}
                </span>
            </div>
        );
    };


    return (
        <div className={`movimientos-popup-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="movimientos-popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="movimientos-popup-header">
                    <MdClose size={28} color={iconColor} onClick={onClose} style={{ cursor: 'pointer' }} />
                </div>
                
                <div className="month-selector">
                    <MdChevronLeft size={28} color="#000" />
                    <div className="month-text">
                        <span className="month-name">Octubre</span>
                        <span className="transaction-count">8 transacciones</span>
                    </div>
                    <MdChevronRight size={28} color="#000" />
                </div>

                <div className="transactions-list">
                    {Object.entries(transactions).map(([date, items]) => (
                        <div key={date}>
                            <h3 className="transaction-date-header">{date}</h3>
                            {items.map((item, index) => (
                                <TransactionItem key={index} {...item} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
                .movimientos-popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                    z-index: 1001;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.3s ease, visibility 0s 0.3s linear;
                }
                .movimientos-popup-overlay.open {
                    opacity: 1;
                    visibility: visible;
                    transition: opacity 0.3s ease;
                }
                .movimientos-popup-content {
                    background-color: #F8F9FA;
                    width: 100%;
                    max-width: 420px;
                    height: 95%;
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    padding: 16px;
                    box-sizing: border-box;
                    transform: translateY(100%);
                    transition: transform 0.3s ease-out;
                    display: flex;
                    flex-direction: column;
                }
                .movimientos-popup-overlay.open .movimientos-popup-content {
                    transform: translateY(0);
                }
                .movimientos-popup-header {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-bottom: 16px;
                }
                .month-selector {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #FFFFFF;
                    padding: 16px;
                    border-radius: 12px;
                    margin-bottom: 24px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .month-text {
                    text-align: center;
                }
                .month-name {
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: #1A202C;
                }
                .transaction-count {
                    font-size: 0.8rem;
                    color: #A0AEC0;
                    display: block;
                }
                .transactions-list {
                    flex-grow: 1;
                    overflow-y: auto;
                    background-color: #FFFFFF;
                    padding: 16px;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .transaction-date-header {
                    font-size: 1rem;
                    font-weight: bold;
                    color: #1A202C;
                    margin-top: 16px;
                    margin-bottom: 12px;
                }
                .transaction-date-header:first-of-type {
                    margin-top: 0;
                }
                .transaction-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;
                }
                .transaction-icon-container {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background-color: ${iconColor};
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 12px;
                }
                .transaction-details {
                    flex-grow: 1;
                }
                .transaction-title {
                    display: block;
                    font-weight: 500;
                    color: #1A202C;
                }
                .transaction-category {
                    font-size: 0.9rem;
                    color: #A0AEC0;
                }
                .transaction-amount {
                    font-weight: bold;
                }
                .transaction-amount.income {
                    color: #48BB78;
                }
                .transaction-amount.expense {
                    color: #F56565;
                }
            `}</style>
        </div>
    );
};

export default function MigestionEfectivo() {
    const navigate = useNavigate();
    const iconColor = '#4D9DE0';
    const [showMovimientos, setShowMovimientos] = useState(false);

    // ... (El resto de tus estados, useEffect, y helpers permanecen igual) ...

    // 1. Estados para almacenar el saldo total y la fecha de actualización
    const [totalEfectivo, setTotalEfectivo] = useState(0);
    const [ultimaActualizacion, setUltimaActualizacion] = useState(null); // null o string de fecha

    // 2. Carga los datos de localStorage al iniciar el componente
    useEffect(() => {
        // ⭐ Usamos la nueva clave única para el efectivo
        const efectivoDataJSON = localStorage.getItem('efectivo_gestion');
        if (efectivoDataJSON) {
            try {
                const efectivoData = JSON.parse(efectivoDataJSON);

                // Asume que solo hay un registro de efectivo
                setTotalEfectivo(efectivoData.monto || 0);
                setUltimaActualizacion(efectivoData.fechaActualizacion || null);

            } catch (error) {
                console.error("Error al parsear datos de efectivo:", error);
                setTotalEfectivo(0);
                setUltimaActualizacion(null);
            }
        }
    }, []);

    // 3. Helper para formatear la fecha de actualización
    const formatDate = (dateString) => {
        if (!dateString) return 'Nunca actualizado';
        try {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            // Formato de fecha en español (ej: "1 de enero de 2024, 10:30")
            return `Actualizado el ${date.toLocaleDateString('es-CO', options)}`;
        } catch (e) {
            return 'Fecha inválida';
        }
    };

    // 4. Funciones de manejo (la función de eliminar ahora borra el registro único)
    const handleDeleteProduct = () => {
        // ⭐ Usamos modal custom en lugar de window.confirm()
        const modal = document.createElement('div');
        modal.className = 'custom-alert-modal';
        modal.innerHTML = `
            <div class="custom-alert-content">
                <h3>Confirmación</h3>
                <p>¿Estás seguro de que deseas eliminar el monto de Efectivo? Esto borrará el saldo guardado.</p>
                <div class="custom-alert-actions">
                    <button id="cancel-btn">Cancelar</button>
                    <button id="confirm-btn" class="delete">Eliminar</button>
                </div>
            </div>
            <style>
                .custom-alert-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
                .custom-alert-content { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); max-width: 90%; text-align: center; }
                .custom-alert-actions { margin-top: 20px; display: flex; justify-content: space-around; }
                .custom-alert-actions button { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
                #cancel-btn { background: #ccc; color: #333; }
                #confirm-btn.delete { background: #f44336; color: white; }
            </style>
        `;

        document.body.appendChild(modal);

        document.getElementById('confirm-btn').onclick = () => {
            localStorage.removeItem('efectivo_gestion'); // Elimina el registro único
            setTotalEfectivo(0);
            setUltimaActualizacion(null);
            alert('Producto Efectivo eliminado.');
            modal.remove();
        };

        document.getElementById('cancel-btn').onclick = () => {
            modal.remove();
        };
    };

    // ⭐ Aseguramos que el botón de agregar producto navegue a la página de actualización
    const handleNavigateToAdd = () => {
        navigate('/Migestion-agregarefectivo');
    };

    // Muestra el mensaje si el saldo es cero
    const saldoCero = totalEfectivo <= 0;

    // Simulación de Ingresos y Egresos (actualmente fijos en $0, basados en la imagen)
    const ingresosMensuales = 0;
    const egresosMensuales = 0;

    // --- INICIO DEL CAMBIO ---
    const handleNavigateBack = () => {
        navigate('/Migestion-misproductos'); // Función que ejecuta la navegación
    };
    // --- FIN DEL CAMBIO ---


    return (
        <div className='efectivo-container'>
            {/* 1. Barra superior */}
            <div className='top-bar'>
                {/* MODIFICACIÓN AQUÍ: Llamar a la función navigate dentro del onClick */}
                <span className='back-arrow' onClick={() => navigate("/Migestion-misproductos")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Mis productos</span>
            </div>

            <h1 className='efectivo-title'>Efectivo</h1>

            {/* 2. Tarjeta Principal de Efectivo */}
            <div className='efectivo-main-card'>
                <div className='efectivo-card-header'>
                    <MdAttachMoney size={24} color="#fff" />
                    <span>Efectivo</span>
                </div>

                <span className='efectivo-monto'>{formatCurrency(totalEfectivo)}</span>

                {/* ⭐ Fecha de última actualización */}
                <span className='efectivo-update-date'>
                    {formatDate(ultimaActualizacion)}
                </span>
                {/* Fin de Fecha */}

            </div>

            {/* 3. Promedio Mensual */}
            <h2 className='promedio-title'>Promedio mensual</h2>

            <div className='promedio-cards-container'>
                {/* Card Ingresos */}
                <div className='promedio-card'>
                    <div className='promedio-icon-text'>
                        <MdShowChart size={24} color="#4CAF50" /> {/* Icono verde */}
                    </div>
                    <div className='montoeegr'>
                        <span className='tituloegresos'>Ingresos</span>
                    <span className='promedio-monto-ingreso'>{formatCurrency(ingresosMensuales)}</span>
                    </div>
                </div>

                {/* Card Egresos */}
                <div className='promedio-card'>
                    <div className='promedio-icon-text'>
                        <MdTrendingDown size={24} color="#F44336" /> {/* Icono rojo */}
                    </div>
                    <div className='montoeegr'>
                    <span className='tituloegresos'>Egresos</span>
                    <span className='promedio-monto-egreso'>{formatCurrency(egresosMensuales)}</span>
                    </div>
                </div>
            </div>

            {/* 4. Botones de Acción */}
            <div className='action-buttons-row'>
            <button className='action-btn primary' onClick={() => setShowMovimientos(true)}>Movimientos</button>
                <button className='action-btn secondary'>Alertas</button>
            </div>

            <div className='action-buttons-column'>
                <button
                    className='action-btn full-width add-btn'
                    onClick={handleNavigateToAdd} // Redirige a la página de actualización
                >
                    Actualizar monto <MdAdd size={24} color="#fff" />
                </button>
                <button
                    className='action-btn full-width delete-btn'
                    onClick={handleDeleteProduct}
                >
                    Eliminar producto <MdClose size={24} color="#fff" />
                </button>
            </div>
            <MovimientosPopup isOpen={showMovimientos} onClose={() => setShowMovimientos(false)} />
        </div>
    );
}