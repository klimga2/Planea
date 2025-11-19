import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProyeccionAhorro.css';
import { IoChevronBack, IoChevronDown } from 'react-icons/io5';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart } from 'recharts';

const ProyeccionAhorro = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const initialFormData = location.state?.formData || {
		sueldoMensual: '3000000',
		porcentajeAhorrar: '10',
		ahorroMensual: 300000,
		disponibleGastos: 2700000,
	};
	const [formData, setFormData] = useState(initialFormData);
	const [mostrarDatos, setMostrarDatos] = useState(false);
	const [vistaGrafica, setVistaGrafica] = useState('Meses');

	// Calcular proyección de ahorro
	const calcularProyeccion = () => {
		const sueldo = parseFloat(formData.sueldoMensual.replace(/\./g, '')) || 0;
		const porcentaje = parseFloat(formData.porcentajeAhorrar) || 0;
		const ahorroMensual = (sueldo * porcentaje) / 100;

		// Calcular acumulado para 5 años (60 meses)
		const mesesTotal = 60;
		const dataCompleta = [];

		for (let mes = 0; mes <= mesesTotal; mes++) {
			const valorAcumulado = ahorroMensual * mes;
			dataCompleta.push({
				mes: mes,
				valor: Math.round(valorAcumulado),
			});
		}

		// Determinar qué puntos mostrar
		let dataMostrar = [];
		if (vistaGrafica === 'Meses') {
			// Vista mensual: mostrar cada 3 meses del primer año (0, 3, 6, 9, 12)
			const mesesClave = [0, 3, 6, 9, 12];
			dataMostrar = mesesClave.map((m) => ({
				mes: m,
				valor: dataCompleta[m].valor,
			}));
		} else {
			// Vista anual: mostrar por años (0, 12, 24, 36, 48, 60 meses)
			const añosClave = [0, 1, 2, 3, 4, 5];
			dataMostrar = añosClave.map((año) => ({
				mes: año, // Mostrar como año en el eje X
				valor: dataCompleta[año * 12].valor,
			}));
		}

		// Valores para mostrar según la vista
		let valorPrimero, valorSegundo, labelPrimero, labelSegundo;
		
		if (vistaGrafica === 'Meses') {
			valorPrimero = dataCompleta[6].valor;
			valorSegundo = dataCompleta[12].valor;
			labelPrimero = '6 meses';
			labelSegundo = '12 meses';
		} else {
			valorPrimero = dataCompleta[36].valor; // 3 años
			valorSegundo = dataCompleta[60].valor; // 5 años
			labelPrimero = '3 años';
			labelSegundo = '5 años';
		}

		return { 
			data: dataMostrar, 
			ahorroMensual, 
			valorPrimero,
			valorSegundo,
			labelPrimero,
			labelSegundo
		};
	};

	const proyeccion = useMemo(
		() => calcularProyeccion(),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[formData, vistaGrafica]
	);

	const { data, valorPrimero, valorSegundo, labelPrimero, labelSegundo } = proyeccion;

	const formatearMoneda = (valor) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0,
		}).format(valor);
	};

	const CustomTooltip = ({ active, payload }) => {
		if (active && payload && payload.length) {
			return (
				<div className='custom-tooltip'>
					<p className='tooltip-valor'>{formatearMoneda(payload[0].value)}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className='proyeccion-ahorro-container'>
			<header className='proyeccion-ahorro-header'>
				<button className='back-button' onClick={() => navigate('/SimuladorAhorro')}>
					<IoChevronBack size={24} />
				</button>
				<h1 className='proyeccion-ahorro-titulo'>Simulador de ahorro</h1>
			</header>

			<div className='proyeccion-ahorro-content'>
				{/* Sección editar datos */}
				<div className='editar-datos-section'>
					<button
						className='editar-datos-btn'
						onClick={() => setMostrarDatos(!mostrarDatos)}
					>
						<span>Edita los datos</span>
						<IoChevronDown
							size={20}
							style={{
								transform: mostrarDatos ? 'rotate(180deg)' : 'rotate(0deg)',
								transition: 'transform 0.3s',
							}}
						/>
					</button>
					{mostrarDatos && (
						<div className='datos-actuales'>
							<div className='form-group-edit'>
								<label>Sueldo mensual</label>
								<input
									type='text'
									name='sueldoMensual'
									value={formData.sueldoMensual}
									onChange={(e) =>
										setFormData({ ...formData, sueldoMensual: e.target.value })
									}
									className='form-input-edit'
								/>
							</div>
							<div className='form-group-edit'>
								<label>Porcentaje a ahorrar</label>
								<input
									type='text'
									name='porcentajeAhorrar'
									value={formData.porcentajeAhorrar}
									onChange={(e) =>
										setFormData({ ...formData, porcentajeAhorrar: e.target.value })
									}
									className='form-input-edit'
								/>
							</div>
						</div>
					)}
				</div>

				{/* Título y descripción */}
				<div className='proyeccion-info'>
					<h2 className='proyeccion-titulo-seccion'>Proyección de ahorro</h2>
					<p className='proyeccion-descripcion'>
						Visualiza cuánto acumulas en diferentes periodos.
					</p>
				</div>

				{/* Gráfica */}
				<div className='grafica-container'>
					<ResponsiveContainer width='100%' height={280}>
						<ComposedChart data={data}>
							<defs>
								<linearGradient id='colorBarraAhorro' x1='0' y1='0' x2='0' y2='1'>
									<stop offset='0%' stopColor='#7dd3c0' stopOpacity={0.9} />
									<stop offset='100%' stopColor='#6bc5b3' stopOpacity={0.7} />
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' vertical={false} />
							<XAxis
								dataKey='mes'
								stroke='#9ca3af'
								fontSize={13}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								stroke='#9ca3af'
								fontSize={12}
								tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
								axisLine={false}
								tickLine={false}
								domain={[0, 'auto']}
							/>
							<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
							<Bar
								dataKey='valor'
								fill='url(#colorBarraAhorro)'
								radius={[4, 4, 0, 0]}
								maxBarSize={50}
							/>
							<Line
								type='monotone'
								dataKey='valor'
								stroke='#2d3748'
								strokeWidth={2.5}
								dot={false}
								activeDot={{ r: 5, fill: '#2d3748', strokeWidth: 2, stroke: '#fff' }}
							/>
						</ComposedChart>
					</ResponsiveContainer>
					<p className='grafica-label'>
						Valor acumulado en {vistaGrafica === 'Meses' ? 'meses' : 'años'}
					</p>
				</div>

				{/* Botones de vista */}
				<div className='vista-botones'>
					<button
						className={`vista-btn ${vistaGrafica === 'Meses' ? 'active' : ''}`}
						onClick={() => setVistaGrafica('Meses')}
					>
						Meses
					</button>
					<button
						className={`vista-btn ${vistaGrafica === 'Año' ? 'active' : ''}`}
						onClick={() => setVistaGrafica('Año')}
					>
						Año
					</button>
				</div>

				{/* Valores acumulados */}
				<div className='valores-acumulados'>
					<div className='valor-acumulado-item'>
						<p className='valor-acumulado-numero'>{formatearMoneda(valorPrimero)}</p>
						<p className='valor-acumulado-label'>{labelPrimero}</p>
					</div>
					<div className='valor-acumulado-item'>
						<p className='valor-acumulado-numero'>{formatearMoneda(valorSegundo)}</p>
						<p className='valor-acumulado-label'>{labelSegundo}</p>
					</div>
				</div>

				{/* Botones de acción */}
				<div className='acciones-botones'>
					<button className='btn-compartir'>Compartir</button>
					<button className='btn-exportar'>Exportar</button>
				</div>
			</div>
		</div>
	);
};

export default ProyeccionAhorro;
