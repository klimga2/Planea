import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Migestion-DetalleMeta.css';
import {
  MdArrowBack
} from "react-icons/md";

export default function MigestionDetalleMeta() {

    const iconColor = '#4D9DE0';
    const iconStyle = { size: 28, color: iconColor };


	const { name } = useParams();
	const navigate = useNavigate();

	// 1. Llamada a Hooks
	const [meta, setMeta] = useState(null);
    const [essentialExpenses, setEssentialExpenses] = useState('');
    const [selectedMonths, setSelectedMonths] = useState(3);
    const [monthlyContribution, setMonthlyContribution] = useState('');
    // Asumo que el toggle switch de auto-aportar también tiene un estado para poder guardarlo
    const [isAutoAportarEnabled, setIsAutoAportarEnabled] = useState(false);

	useEffect(() => {
		const metas = JSON.parse(localStorage.getItem('metas') || '[]');
		const found = metas.find((m) => m.name === name);
		setMeta(found);
        // Inicializar el estado del switch si la meta existe
        if (found) {
            setIsAutoAportarEnabled(found.autoAportar ?? true);
        }
	}, [name]);

    // Función para manejar el cambio de meses
    const handleMonthChange = (months) => {
        setSelectedMonths(months);
        setMonthlyContribution('');
    };

    // Función para formatear la cantidad como moneda y manejar NaN o cero -> $0
    const formatCurrency = (amount) => {
        // Limpiamos el valor y lo convertimos a número
        const cleanValue = String(amount || 0).replace(/[^0-9]/g, '');
        const num = Number(cleanValue);

        if (isNaN(num) || num <= 0) return '$0';
        return `$${num.toLocaleString('es-CO')}`;
    };

    // 2. Definición de Cálculos (Hooks y Valores Base)

    // Función de lectura que limpia el valor de cualquier separador
    const getNumericValue = (amount) => {
        if (!amount) return 0;
        const cleanAmount = String(amount).replace(/[^0-9]/g, '');
        return Number(cleanAmount) || 0;
    };

    // Usamos la nueva función para leer los datos de forma segura
    const current = getNumericValue(meta?.currentAmount);
    const target = getNumericValue(meta?.amount || meta?.budget);

    const cantidadFaltante = target - current;

    // Cálculo de la contribución mensual requerida para alcanzar la meta en `selectedMonths`
    const contribucionMensualRequerida = useMemo(() => {
        if (selectedMonths > 0) {
            return Math.ceil(cantidadFaltante / selectedMonths);
        }
        return cantidadFaltante;
    }, [cantidadFaltante, selectedMonths]);

    // Cálculo de días estimados
    const diasEstimados = useMemo(() => {
        const aporteMensual = getNumericValue(monthlyContribution);

        if (aporteMensual > 0) {
            const mesesRequeridos = cantidadFaltante / aporteMensual;
            return Math.max(0, Math.ceil(mesesRequeridos * 30));
        }
        return 'N/A';
    }, [cantidadFaltante, monthlyContribution]);

    // --- Lógica del componente y Salida Condicional ---

    // 3. Salida condicional (DESPUÉS de todos los Hooks)
	if (!meta) {
		return <div className='detalle-container'>Meta no encontrada.</div>;
	}

    // ⭐ FUNCIÓN DE GUARDAR META
    const handleSaveMeta = () => {
        const metas = JSON.parse(localStorage.getItem('metas') || '[]');

        // Encuentra el índice de la meta que estamos editando
        const metaIndex = metas.findIndex((m) => m.name === name);

        if (metaIndex !== -1) {
            // Actualiza la meta en el array con los posibles cambios
            metas[metaIndex] = {
                ...metas[metaIndex],
                // Aquí guardas cualquier valor que se pueda editar.
                // Por ejemplo, el estado del switch de Auto-aportar:
                autoAportar: isAutoAportarEnabled,
                // Si hubiera edición de fecha, target, etc., irían aquí.
            };

            // Guarda la lista actualizada
            localStorage.setItem('metas', JSON.stringify(metas));
            window.alert('¡Meta guardada exitosamente!');
        } else {
            window.alert('Error al intentar guardar la meta.');
        }
    };

    // Función para manejar la eliminación de la meta
    const handleDeleteMeta = () => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar la meta "${meta.name}"?`)) {
            return;
        }

        const metas = JSON.parse(localStorage.getItem('metas') || '[]');
        const updatedMetas = metas.filter((m) => m.name !== name);

        localStorage.setItem('metas', JSON.stringify(updatedMetas));
        navigate('/Migestion-PlaneacionMetas');
    };

    // Cálculos dependientes de meta (que NO son Hooks)
	const progress = target > 0 ? Math.min(100, Math.floor((current / target) * 100)) : 0;
	const faltan = target - current;

	return (

		<div className='detalle-container'>
			{/* Top bar */}
			<div className='top-bar'>
                             <span className='back-arrow' onClick={() => navigate("/Migestion-crearmeta")}>

                                 <MdArrowBack size={24} color={iconColor} />
                             </span>
                             <span className='top-bar-title'>{meta.name}</span>
                         </div>
			{/* Tarjeta azul */}
			<div className='detalle-azul-card'>
				<div className='detalle-azul-valores'>
					<span className='detalle-actual'>{formatCurrency(current)}</span>
					<span className='detalle-total'>de {formatCurrency(target)}</span>
				</div>

				<div className='detalle-progress-bg'>
					<div className='detalle-progress-fill' style={{ width: `${progress}%` }}></div>
				</div>

				<div className='detalle-azul-bottom'>
					<span className='detalle-faltan'>Faltan: {formatCurrency(faltan)}</span>
					<span className='detalle-fecha'>{meta.date || '24/20/2028'}</span>
				</div>
			</div>

			{/* Auto-aportar */}
			<div className='detalle-card-blanca'>
				<div className='detalle-flex-space'>
					<div className='textoAutoaport'>
						<div className='auto-aportar-title'>Auto-aportar</div>
						<div className='auto-aportar-desc'>
							Cada vez que recibas un ingreso, aportaremos <br></br>${(meta.autoaportar || 250000).toLocaleString('es-CO')} al fondo.
						</div>
					</div>

					<label className='switch'>
						{/* Se usa el estado local para el switch y su handler */}
						<input
                            type='checkbox'
                            checked={isAutoAportarEnabled}
                            onChange={() => setIsAutoAportarEnabled(!isAutoAportarEnabled)}
                        />
						<span className='slider'></span>
					</label>
				</div>
			</div>

			{/* Calculadora */}
			<div className='detalle-card-blanca'>
				<h3 className='detalle-section-title'>Calculadora de meta </h3>
				<div className='detallesec'>
					<label className='detalle-input-title'>Gastos esenciales</label>
					<input
                        type='text'
                        className='form-input'
                        placeholder='$2’500.000'
                        value={essentialExpenses}
                        onChange={(e) => setEssentialExpenses(e.target.value)}
                    />
				</div>

				<div className='detallesec'>
					<label className='detalle-input-title'>Meses de apertura</label>
					<div className='priority-btns'>
						<button
                            className={`priority-btn ${selectedMonths === 3 ? 'active' : ''}`}
                            onClick={() => handleMonthChange(3)}
                        >
                            3 meses
                        </button>
						<button
                            className={`priority-btn ${selectedMonths === 6 ? 'active' : ''}`}
                            onClick={() => handleMonthChange(6)}
                        >
                            6 meses
                        </button>
						<button
                            className={`priority-btn ${selectedMonths === 12 ? 'active' : ''}`}
                            onClick={() => handleMonthChange(12)}
                        >
                            12 meses
                        </button>
					</div>
				</div>

				<div className='detallesec'>
					<label className='detalle-input-title'>Aporte mensual (opcional)</label>
					<input
                        type='text'
                        className='form-input'
                        placeholder='Ej: $400.000'
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                    />
				</div>

                {/* --- Sección de Resultados de la Calculadora --- */}
				<h2 className='detalle-section-title'>Tu meta</h2>
				<div className='detalle-resultado'>
					<div className='detalle-resultado-monto'>{formatCurrency(target)}</div>

                    {monthlyContribution ? (
                        <div className='detalle-resultado-text'>
                            Alcanzable en {diasEstimados} días con un aporte mensual de {monthlyContribution}
                        </div>
                    ) : (
                        <div className='detalle-resultado-text'>
                            Alcanzable en{selectedMonths} meses con un aporte mensual requerido de {formatCurrency(contribucionMensualRequerida)}
                        </div>
                    )}
				</div>
         {/* ⭐ NUEVO BOTÓN DE GUARDAR */}
            <button className='detalle-btn-azul guardar-btn-custom' onClick={handleSaveMeta}>
                Guardar
            </button>
			</div>

			{/* Productos recomendados */}
			<div className='detalle-card-blanca detalle-opcion'>
				<div>
					<div className='detalle-opcion-title'>Productos recomendados</div>
					<div className='detalle-opcion-text'>Conoce productos del mercado que hay para ti.</div>
				</div>
				<span className='detalle-opcion-arrow'>›</span>
			</div>

			{/* Simuladores */}
			<div className='detalle-card-blanca detalle-opcion'>
				<div>
					<div className='detalle-opcion-title'>Simuladores</div>
					<div className='detalle-opcion-text'>Simula distintos escenarios y toma decisiones informadas.</div>
				</div>
				<span className='detalle-opcion-arrow'>›</span>
			</div>




			{/* Botones finales */}
			<button className='detalle-btn-rojo' onClick={handleDeleteMeta}>
                Eliminar meta ✖
            </button>
			<button className='detalle-btn-azul' onClick={() => navigate('/Migestion-PlaneacionMetas')}>
				Regresar a mis metas
			</button>
		</div>
	);
}