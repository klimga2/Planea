import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProyeccionMeta.css';
import { IoChevronBack, IoChevronDown } from 'react-icons/io5';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProyeccionMeta = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const initialFormData = location.state?.formData || {
		presupuestoMeta: '180000000',
		aporteMensual: '1000000',
	};
	const [formData, setFormData] = useState(initialFormData);
	const [mostrarDatos, setMostrarDatos] = useState(false);
	const [vistaGrafica, setVistaGrafica] = useState('meses'); // 'meses' o 'año'

	// Calcular proyección de meta
	const calcularProyeccion = () => {
		const presupuesto = parseFloat(formData.presupuestoMeta.replace(/\./g, '')) || 0;
		const aporteMensual = parseFloat(formData.aporteMensual.replace(/\./g, '')) || 0;

		if (aporteMensual === 0) {
			return { data: [], mesesTotales: 0 };
		}

		const mesesNecesarios = Math.ceil(presupuesto / aporteMensual);
		const data = [];

		if (vistaGrafica === 'meses') {
			// Vista de meses - mostrar 4 puntos clave
			const intervalos = mesesNecesarios <= 4 
				? Array.from({ length: mesesNecesarios }, (_, i) => i + 1)
				: [
					Math.ceil(mesesNecesarios * 0.25),
					Math.ceil(mesesNecesarios * 0.5),
					Math.ceil(mesesNecesarios * 0.75),
					mesesNecesarios
				];

			intervalos.forEach((mes) => {
				const acumulado = aporteMensual * mes;
				data.push({
					mes: mes,
					valor: acumulado,
					label: mes.toString(),
				});
			});
		} else {
			// Vista de años - convertir meses a años
			const años = Math.ceil(mesesNecesarios / 12);
			for (let año = 1; año <= años; año++) {
				const mesesEnEsteAño = Math.min(año * 12, mesesNecesarios);
				const acumulado = aporteMensual * mesesEnEsteAño;
				data.push({
					mes: año,
					valor: acumulado,
					label: año.toString(),
				});
			}
		}

		return { data, mesesTotales: mesesNecesarios };
	};

	const { data, mesesTotales } = useMemo(
		() => calcularProyeccion(),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[formData, vistaGrafica]
	);

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
				<div className='custom-tooltip-meta'>
					<p className='tooltip-valor'>{formatearMoneda(payload[0].value)}</p>
				</div>
			);
		}
		return null;
	};

	// Calcular valores para mostrar debajo de la gráfica
	const getMesesMostrar = () => {
		if (vistaGrafica === 'meses') {
			const mitad = Math.ceil(mesesTotales / 2);
			return {
				primero: mitad,
				segundo: mesesTotales,
				labelPrimero: `${mitad} ${mitad === 1 ? 'mes' : 'meses'}`,
				labelSegundo: `${mesesTotales} ${mesesTotales === 1 ? 'mes' : 'meses'}`,
			};
		} else {
			const años = Math.ceil(mesesTotales / 12);
			const mitadAños = Math.ceil(años / 2);
			return {
				primero: mitadAños * 12,
				segundo: mesesTotales,
				labelPrimero: `${mitadAños} ${mitadAños === 1 ? 'año' : 'años'}`,
				labelSegundo: `${años} ${años === 1 ? 'año' : 'años'}`,
			};
		}
	};

	const { primero, segundo, labelPrimero, labelSegundo } = getMesesMostrar();
	const aporteMensualNum = parseFloat(formData.aporteMensual.replace(/\./g, '')) || 0;
	const valorPrimero = aporteMensualNum * primero;
	const valorSegundo = aporteMensualNum * segundo;

	return (
		<div className='proyeccion-meta-container'>
			<header className='proyeccion-meta-header'>
				<button className='back-button' onClick={() => navigate('/SimuladorMeta')}>
					<IoChevronBack size={24} />
				</button>
				<h1 className='proyeccion-meta-titulo'>Simulador de meta</h1>
			</header>

			<div className='proyeccion-meta-content'>
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
								<label>Presupuesto de la meta</label>
								<input
									type='text'
									name='presupuestoMeta'
									value={formData.presupuestoMeta}
									onChange={(e) =>
										setFormData({ ...formData, presupuestoMeta: e.target.value })
									}
									className='form-input-edit'
								/>
							</div>
							<div className='form-group-edit'>
								<label>Aporte mensual</label>
								<input
									type='text'
									name='aporteMensual'
									value={formData.aporteMensual}
									onChange={(e) =>
										setFormData({ ...formData, aporteMensual: e.target.value })
									}
									className='form-input-edit'
								/>
							</div>
						</div>
					)}
				</div>

				{/* Título y descripción */}
				<div className='proyeccion-info'>
					<h2 className='proyeccion-titulo-seccion'>Proyección de meta</h2>
					<p className='proyeccion-descripcion'>
						Visualiza cuánto acumularás en diferentes periodos.
					</p>
				</div>

				{/* Gráfica */}
				<div className='grafica-container'>
					<ResponsiveContainer width='100%' height={280}>
						<ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
							<CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' vertical={false} />
							<XAxis
								dataKey='label'
								stroke='#9ca3af'
								fontSize={12}
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
							<Bar dataKey='valor' fill='#a8e6cf' radius={[12, 12, 12, 12]} maxBarSize={60} />
							<Line
								type='monotone'
								dataKey='valor'
								stroke='#4a90e2'
								strokeWidth={2}
								dot={{ fill: '#4a90e2', r: 4 }}
							/>
						</ComposedChart>
					</ResponsiveContainer>
					<p className='grafica-label'>
						Valor acumulado en {vistaGrafica === 'meses' ? 'meses' : 'años'}
					</p>
				</div>

				{/* Botones de vista */}
				<div className='vista-botones'>
					<button
						className={`vista-btn ${vistaGrafica === 'meses' ? 'activo' : ''}`}
						onClick={() => setVistaGrafica('meses')}
					>
						Meses
					</button>
					<button
						className={`vista-btn ${vistaGrafica === 'año' ? 'activo' : ''}`}
						onClick={() => setVistaGrafica('año')}
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
				<div className='botones-accion'>
					<button className='btn-compartir'>Compartir</button>
					<button className='btn-exportar'>Exportar</button>
				</div>

				<button className='btn-guardar-meta'>Guardar meta</button>
			</div>
		</div>
	);
};

export default ProyeccionMeta;
