import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    MdArrowBack,
    MdCreditCard,
    MdShowChart,
    MdTrendingDown,
    MdClose,
    MdSwapHorizontalCircle,
    MdAttachMoney
} from 'react-icons/md';
import './DetalleMediodepago.css';

// --- Funciones Helper ---

// Helper para formatear moneda
const formatCurrency = (amount) => {
    const num = Number(amount) || 0;
    return `$${num.toLocaleString('es-CO')}`;
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


// --- Componente Principal ---
export default function DetalleMediodePago() {
    const navigate = useNavigate();
    const { id } = useParams();
    const iconColor = '#4D9DE0';

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
            <h2 class='promedio-title'>Promedio mensual</h2>

            <div class='promedio-cards-container'>
                {/* Card Ingresos */}
                <div class='promedio-card'>
                    <div class='promedio-icon-text'>
                        <MdShowChart size={24} color="#4CAF50" />
                    </div>
                    <div class='montoeegr'>
                        <span class='tituloegresos'>Ingresos</span>
                        <span class='promedio-monto-ingreso'>{formatCurrency(ingresosMensuales)}</span>
                    </div>
                </div>

                {/* Card Egresos */}
                <div class='promedio-card'>
                    <div class='promedio-icon-text'>
                        <MdTrendingDown size={24} color="#F44336" />
                    </div>
                    <div class='montoeegr'>
                        <span class='tituloegresos'>Egresos</span>
                        <span class='promedio-monto-egreso'>{formatCurrency(egresosMensuales)}</span>
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
                <div class='cupo-progress-container'>
                    <div class='cupito'>
                        <h2 class='cupo-title'>Cupo usado</h2>
                        <span class='cupo-percentage'>{porcentajeUsado}%</span>
                    </div>
                    <div class='cupo-progress-bar'>
                        {/* Barra de progreso */}
                        <div
                            class='cupo-progress-fill'
                            style={{ width: `${porcentajeUsado}%` }}
                        ></div>
                    </div>
                    {/* Rango de montos */}
                    <div class='cupo-amounts'>
                        <span>{formatCurrency(creditData.cupoUsado)}</span>
                        <span>{formatCurrency(creditData.cupoTotal)}</span>
                    </div>
                </div>

                {/* 4. Fechas de Corte y Pago */}
                <div class='date-info-container'>
                    {/* Fecha de corte */}
                    <div class='date-card'>
                        <div class='date-content'>
                            <span class='date-label'>Fecha de corte</span>
                            <span class='date-value'>{cutDate}</span>
                        </div>
                        <div class='date-badge'>
                            <span>{daysToCut}</span>
                            <span class='days-text'>días</span>
                        </div>
                    </div>

                    {/* Fecha de pago */}
                    <div class='date-card'>
                        <div class='date-content'>
                            <span class='date-label'>Fecha de pago</span>
                            <span class='date-value'>{paymentDate}</span>
                        </div>
                        <div class='date-badge payment-badge'>
                            <span>{daysToPay}</span>
                            <span class='days-text'>días</span>
                        </div>
                    </div>
                </div>

                {/* 5. Pagos Mínimo y Sugerido */}
                <div class='payment-info-container'>
                    {/* Pago Mínimo */}
                    <div class='payment-card'>
                        <MdAttachMoney size={24} color="#333" class='payment-icon' />
                        <span class='payment-label'>Pago mínimo</span>
                        <span class='payment-amount'>{formatCurrency(creditData.pagoMinimo)}</span>
                    </div>

                    {/* Pago Sugerido */}
                    <div class='payment-card'>
                        <MdAttachMoney size={24} color="#333" class='payment-icon' />
                        <span class='payment-label'>Pago sugerido</span>
                        <span class='payment-amount'>{formatCurrency(creditData.pagoSugerido)}</span>
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
        return <div class='loading-container'>Cargando detalle del medio de pago...</div>;
    }

    // El título principal debe reflejar el tipo de cuenta asociado
    const mainTitle = producto.tipoProducto === 'Tarjeta Débito' ? 'Cuenta de ahorro' : 'Tarjeta de crédito';


    return (
        <div class='payment-detail-container'>
            {/* 1. Barra superior */}
            <div class='top-bar'>
                <span class='back-arrow' onClick={handleBack}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span class='top-bar-title'>Medios de pago</span>
            </div>

            <h1 class='payment-title'>{mainTitle}</h1>

            {/* 2. Tarjeta Principal (Común para ambos tipos) */}
            <div className={cardClass}>
                <div class='payment-card-header'>
                    <MdCreditCard size={24} color="#fff" style={{ opacity: 0.8 }}/>
                    <span>{producto.entidad}</span>
                </div>

                <div class='card-network-logo'>
                    <span class='network-text'>VISA</span>
                    <span class='network-type'>{producto.tipoProducto === 'Tarjeta Débito' ? 'Débito' : 'Crédito'}</span>
                </div>

                <div class='card-number-display'>
                    {formatCardNumber(producto.numeroReferencia)}
                </div>

                <div class='card-info-row'>
                    <div class='card-info-item'>
                        <span class='card-info-label'>Titular</span>
                        <span class='card-info-value'>{producto.titular}</span>
                    </div>
                    <div class='card-info-item expiration'>
                        <span class='card-info-label'>Expiración</span>
                        <span class='card-info-value'>{producto.fechaExpiracion}</span>
                    </div>
                </div>
            </div>

            {/* Botón de acción centralizado (Común para ambos tipos) */}
            <button class='action-btn center-btn'>
                <MdSwapHorizontalCircle size={20} color="#333" />
                Cambiar a cuenta principal
            </button>

            {/* ⭐️ 3-5. CONTENIDO DINÁMICO ⭐️ */}
            {renderProductDetails()}

            {/* 6. Botones de Acción (Movimientos/Alertas) (Común para ambos) */}
            <div class='action-buttons-row'>
                <button class='action-btn primary'>Movimientos</button>
                <button class='action-btn secondary'>Alertas</button>
            </div>

            {/* 7. Botones Inferiores (Eliminar y Regresar) (Común para ambos) */}
            <div class='action-buttons-column'>
                <button
                    class='action-btn full-width delete-btn'
                    onClick={handleDeleteProduct}
                >
                    Eliminar producto <MdClose size={24} color="#fff" />
                </button>
                <button
                    class='action-btn full-width return-btn'
                    onClick={handleBack}
                >
                    Regresar a mis productos
                </button>
            </div>
        </div>
    );
}