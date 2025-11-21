
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    MdArrowBack,
    MdCreditCard,
    MdShowChart,
    MdTrendingDown,
    MdClose,
    MdSwapHorizontalCircle,
    MdAttachMoney,
    MdChevronLeft,
    MdChevronRight,
    MdHome,
    MdFastfood,
    MdSwapHoriz,
    MdWork,
    MdDirectionsCar,
} from 'react-icons/md';
import './DetalleMediodepago.css';

// --- Funciones Helper ---

// Helper para formatear moneda
const formatCurrency = (amount, isExpense = false) => {
    const num = Math.abs(Number(amount)) || 0;
    const sign = isExpense ? '-' : '';
    return `${sign}$${num.toLocaleString('es-CO')}`;
};


// Helper para formatear números de tarjeta (mostrar solo los últimos 4 dígitos)
const formatCardNumber = (number) => {
    if (!number) return '**** **** **** ****';
    const cleanNumber = String(number).replace(/\s/g, '');
    const lastFour = cleanNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
};

// Calcula la diferencia en días entre dos fechas
const diffDays = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

// Formatea un objeto Date a DD/MM/YYYY
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// Lógica de cálculo de fechas de Tarjeta de Crédito
const calculateCreditCardDates = (cutDayOfMonth = 5, paymentDayOfMonth = 20) => {
    const now = new Date();
    // Normalizamos la fecha actual a medianoche
    now.setHours(0, 0, 0, 0);

    let cutDate = new Date(now.getFullYear(), now.getMonth(), cutDayOfMonth);
    let paymentDate = new Date(now.getFullYear(), now.getMonth(), paymentDayOfMonth);

    // Ajustar si la fecha de corte ya pasó
    if (cutDate < now) {
        // Mueve la fecha de corte al próximo mes
        cutDate.setMonth(cutDate.getMonth() + 1);
    }

    // Ajustar la fecha de pago. Depende de dónde cae la fecha de corte.
    if (paymentDate < now) {
        // Si el día de pago de este mes ya pasó, lo mueve al próximo mes.
        paymentDate.setMonth(paymentDate.getMonth() + 1);
    }

    // Calcula los días restantes (sumando 1 para incluir el día actual)
    const daysToCut = diffDays(now, cutDate);
    const daysToPay = diffDays(now, paymentDate);

    return {
        cutDate: formatDate(cutDate),
        daysToCut: daysToCut,
        paymentDate: formatDate(paymentDate),
        daysToPay: daysToPay,
    };
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


// --- Componente Principal ---
export default function DetalleMediodePago() {
    const navigate = useNavigate();
    const { id } = useParams();
    const iconColor = '#4D9DE0';
    const [showMovimientos, setShowMovimientos] = useState(false);


    const [producto, setProducto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // DATOS SIMULADOS PARA CÁLCULOS
    // Si la Tarjeta de Crédito tiene un día de corte y pago fijo (e.g., día 5 y día 20)
    const CREDIT_CUT_DAY = 5;
    const CREDIT_PAYMENT_DAY = 20;

    // Valores simulados para la tarjeta de Crédito
    const creditData = {
        cupoTotal: 4000000,
        cupoUsado: 800000,
        pagoMinimo: 80000,
        pagoSugerido: 400000,
        // Días fijos (los usaremos para el cálculo dinámico)
        cutDay: CREDIT_CUT_DAY,
        paymentDay: CREDIT_PAYMENT_DAY,
    };

    const porcentajeUsado = Math.round((creditData.cupoUsado / creditData.cupoTotal) * 100);

    // Simulación de Ingresos y Egresos (para imitar la estructura del diseño de Débito)
    const ingresosMensuales = 2831000;
    const egresosMensuales = 1445000;

    // Calcular las fechas de forma dinámica y memorizada
    const calculatedDates = useMemo(() => {
        // Solo calculamos si es Tarjeta de Crédito
        if (producto && producto.tipoProducto === 'Tarjeta Crédito') {
            return calculateCreditCardDates(creditData.cutDay, creditData.paymentDay);
        }
        return {};
    }, [producto]); // Dependencia del producto


    // Efecto para cargar el producto por ID (no se modificó)
    useEffect(() => {
        const loadProduct = () => {
            const productosExistentesJSON = localStorage.getItem('productos_gestion');
            if (productosExistentesJSON) {
                try {
                    const productosExistentes = JSON.parse(productosExistentesJSON);
                    const foundProduct = productosExistentes.find(p => p.id === Number(id));

                    if (foundProduct) {
                        setProducto(foundProduct);
                    } else {
                        alert("Medio de pago no encontrado.");
                        navigate('/Migestion-mediosdepago');
                    }
                } catch (error) {
                    console.error("Error al cargar o parsear el producto:", error);
                    alert("Error al cargar los datos del medio de pago.");
                    navigate('/Migestion-mediosdepago');
                }
            }
            setIsLoading(false);
        };

        loadProduct();
    }, [id, navigate]);

    // ... (cardClass, handleBack, handleDeleteProduct se mantienen igual)
    const cardClass = useMemo(() => {
        if (!producto) return '';
        return producto.tipoProducto === 'Tarjeta Débito'
            ? 'payment-main-card debit-card'
            : 'payment-main-card credit-card';
    }, [producto]);

    const handleBack = () => {
        navigate('/Migestion-mediosdepago');
    };

    const handleDeleteProduct = () => {
        // Implementación del modal de confirmación
        const modal = document.createElement('div');
        modal.className = 'custom-alert-modal';
        modal.innerHTML = `
            <div class="custom-alert-content">
                <h3>Confirmación</h3>
                <p>¿Estás seguro de que deseas eliminar la tarjeta ${producto.tipoProducto} de ${producto.entidad}? Esta acción es irreversible.</p>
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
            const productosExistentesJSON = localStorage.getItem('productos_gestion');
            let productosExistentes = productosExistentesJSON ? JSON.parse(productosExistentesJSON) : [];

            const productosActualizados = productosExistentes.filter(p => p.id !== Number(id));

            try {
                localStorage.setItem('productos_gestion', JSON.stringify(productosActualizados));
                alert(`Tarjeta eliminada con éxito.`);
                modal.remove();
                navigate('/Migestion-mediosdepago');
            } catch (error) {
                console.error('Error al eliminar producto:', error);
                alert('Hubo un error al eliminar el producto.');
                modal.remove();
            }
        };

        document.getElementById('cancel-btn').onclick = () => {
            modal.remove();
        };
    };

    // --- LÓGICA CONDICIONAL DE RENDERIZADO ---

    // Detalles para Tarjeta de Ahorro/Débito (Promedio mensual)
    const renderDebitDetails = () => (
        <>
            <h2 className='promedio-title'>Promedio mensual</h2>

            <div className='promedio-cards-container'>
                {/* Card Ingresos */}
                <div className='promedio-card'>
                    <div className='promedio-icon-text'>
                        <MdShowChart size={24} color="#4CAF50" />
                    </div>
                    <div className='montoeegr'>
                        <span className='tituloegresos'>Ingresos</span>
                        <span className='promedio-monto-ingreso'>{formatCurrency(ingresosMensuales)}</span>
                    </div>
                </div>

                {/* Card Egresos */}
                <div className='promedio-card'>
                    <div className='promedio-icon-text'>
                        <MdTrendingDown size={24} color="#F44336" />
                    </div>
                    <div className='montoeegr'>
                        <span className='tituloegresos'>Egresos</span>
                        <span className='promedio-monto-egreso'>{formatCurrency(egresosMensuales)}</span>
                    </div>
                </div>
            </div>
        </>
    );

    // Detalles para Tarjeta de Crédito (Cupo, Fechas, Pagos)
    const renderCreditDetails = () => {
        // Usamos los datos calculados
        const { cutDate, daysToCut, paymentDate, daysToPay } = calculatedDates;

        return (
            <>
                {/* 3. Cupo Usado (Barra de progreso) */}
                <div className='cupo-progress-container'>
                    <div className='cupito'>
                        <h2 className='cupo-title'>Cupo usado</h2>
                        <span className='cupo-percentage'>{porcentajeUsado}%</span>
                    </div>
                    <div className='cupo-progress-bar'>
                        {/* Barra de progreso */}
                        <div
                            className='cupo-progress-fill'
                            style={{ width: `${porcentajeUsado}%` }}
                        ></div>
                    </div>
                    {/* Rango de montos */}
                    <div className='cupo-amounts'>
                        <span>{formatCurrency(creditData.cupoUsado)}</span>
                        <span>{formatCurrency(creditData.cupoTotal)}</span>
                    </div>
                </div>

                {/* 4. Fechas de Corte y Pago */}
                <div className='date-info-container'>
                    {/* Fecha de corte */}
                    <div className='date-card'>
                        <div className='date-content'>
                            <span className='date-label'>Fecha de corte</span>
                            <span className='date-value'>{cutDate}</span>
                        </div>
                        <div className='date-badge'>
                            <span>{daysToCut}</span>
                            <span className='days-text'>días</span>
                        </div>
                    </div>

                    {/* Fecha de pago */}
                    <div className='date-card'>
                        <div className='date-content'>
                            <span className='date-label'>Fecha de pago</span>
                            <span className='date-value'>{paymentDate}</span>
                        </div>
                        <div className='date-badge payment-badge'>
                            <span>{daysToPay}</span>
                            <span className='days-text'>días</span>
                        </div>
                    </div>
                </div>

                {/* 5. Pagos Mínimo y Sugerido */}
                <div className='payment-info-container'>
                    {/* Pago Mínimo */}
                    <div className='payment-card'>
                        <MdAttachMoney size={24} color="#333" className='payment-icon' />
                        <span className='payment-label'>Pago mínimo</span>
                        <span className='payment-amount'>{formatCurrency(creditData.pagoMinimo)}</span>
                    </div>

                    {/* Pago Sugerido */}
                    <div className='payment-card'>
                        <MdAttachMoney size={24} color="#333" className='payment-icon' />
                        <span className='payment-label'>Pago sugerido</span>
                        <span className='payment-amount'>{formatCurrency(creditData.pagoSugerido)}</span>
                    </div>
                </div>
            </>
        );
    };

    // Función principal para renderizar el contenido dinámico
    const renderProductDetails = () => {
        if (!producto) return null;

        if (producto.tipoProducto === 'Tarjeta Débito') {
            return renderDebitDetails();
        }
        if (producto.tipoProducto === 'Tarjeta Crédito') {
            return renderCreditDetails();
        }
        return null; // En caso de tipo desconocido
    };

    if (isLoading || !producto) {
        return <div className='loading-container'>Cargando detalle del medio de pago...</div>;
    }

    // El título principal debe reflejar el tipo de cuenta asociado
    const mainTitle = producto.tipoProducto === 'Tarjeta Débito' ? 'Cuenta de ahorro' : 'Tarjeta de crédito';


    return (
        <div className='payment-detail-container'>
            {/* 1. Barra superior */}
            <div className='top-bar'>
                <span className='back-arrow' onClick={handleBack}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Medios de pago</span>
            </div>

            <h1 className='payment-title'>{mainTitle}</h1>

            {/* 2. Tarjeta Principal (Común para ambos tipos) */}
            <div className={cardClass}>
                <div className='payment-card-header'>
                    <MdCreditCard size={24} color="#fff" style={{ opacity: 0.8 }}/>
                    <span>{producto.entidad}</span>
                </div>

                <div className='card-network-logo'>
                    <span className='network-text'>VISA</span>
                    <span className='network-type'>{producto.tipoProducto === 'Tarjeta Débito' ? 'Débito' : 'Crédito'}</span>
                </div>

                <div className='card-number-display'>
                    {formatCardNumber(producto.numeroReferencia)}
                </div>

                <div className='card-info-row'>
                    <div className='card-info-item'>
                        <span className='card-info-label'>Titular</span>
                        <span className='card-info-value'>{producto.titular}</span>
                    </div>
                    <div className='card-info-item expiration'>
                        <span className='card-info-label'>Expiración</span>
                        <span className='card-info-value'>{producto.fechaExpiracion}</span>
                    </div>
                </div>
            </div>

            {/* Botón de acción centralizado (Común para ambos tipos) */}
            <button className='action-btn center-btn'>
                <MdSwapHorizontalCircle size={20} color="#333" />
                Cambiar a cuenta principal
            </button>

            {/* ⭐️ 3-5. CONTENIDO DINÁMICO ⭐️ */}
            {renderProductDetails()}

            {/* 6. Botones de Acción (Movimientos/Alertas) (Común para ambos) */}
            <div className='action-buttons-row'>
            <button className='action-btn primary' onClick={() => setShowMovimientos(true)}>Movimientos</button>
                <button className='action-btn secondary'>Alertas</button>
            </div>

            {/* 7. Botones Inferiores (Eliminar y Regresar) (Común para ambos) */}
            <div className='action-buttons-column'>
                <button
                    className='action-btn full-width delete-btn'
                    onClick={handleDeleteProduct}
                >
                    Eliminar producto <MdClose size={24} color="#fff" />
                </button>
                <button
                    className='action-btn full-width return-btn'
                    onClick={handleBack}
                >
                    Regresar a mis productos
                </button>
            </div>
            <MovimientosPopup isOpen={showMovimientos} onClose={() => setShowMovimientos(false)} />
        </div>
    );
}

