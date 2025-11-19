import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProyeccionInversion.css';
import { IoChevronBack, IoChevronDown } from 'react-icons/io5';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, ComposedChart } from 'recharts';

const ProyeccionInversion = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const initialFormData = location.state?.formData || {
		montoInvertir: '1000000',
		frecuencia: 'Anual',
		plazo: '1 año',
		tipoInversion: 'CDT',
		sueldo: '6000000',
		nivelRiesgo: 'Bajo',
	};
	const [formData, setFormData] = useState(initialFormData);
	const [mostrarDatos, setMostrarDatos] = useState(false);
	const [vistaGrafica, setVistaGrafica] = useState('Meses'); // 'Meses' o 'Año'

	// Calcular proyección basada en los datos del formulario
	const calcularProyeccion = () => {
		if (!formData) return { data: [], valorFinal: 0, ganancias: 0, rendimiento: 0 };

		const montoInicial = parseFloat(formData.montoInvertir.replace(/\./g, '')) || 1000000;
		const tasaAnual = 0.08; // 8% anual (ejemplo)
		const plazoTexto = formData.plazo || '1 año';
		const mesesPlazo = plazoTexto.includes('meses') 
			? parseInt(plazoTexto) 
			: parseInt(plazoTexto) * 12;

		const tasaMensual = tasaAnual / 12;
		const dataCompleta = [];

		// Calcular todos los meses
		for (let mes = 0; mes <= mesesPlazo; mes++) {
			const valorAcumulado = montoInicial * Math.pow(1 + tasaMensual, mes);
			dataCompleta.push({
				mes: mes,
				valor: Math.round(valorAcumulado),
			});
		}

		// Determinar qué puntos mostrar según el plazo y la vista
		let dataMostrar = [];
		if (vistaGrafica === 'Meses') {
			// Vista mensual: mostrar 4 puntos distribuidos proporcionalmente
			const puntosAMostrar = Math.min(4, mesesPlazo + 1);
			for (let i = 0; i < puntosAMostrar; i++) {
				const indice = Math.round((i / (puntosAMostrar - 1)) * mesesPlazo);
				dataMostrar.push({
					mes: i + 1,
					valor: dataCompleta[indice].valor,
				});
			}
		} else {
			// Vista anual: mostrar por años (trimestres si es menos de 1 año)
			if (mesesPlazo <= 12) {
				// Menos de 1 año: mostrar trimestres (0, 3, 6, 9, 12 meses)
				const mesesClave = [0, 3, 6, 9, 12].filter(m => m <= mesesPlazo);
				dataMostrar = mesesClave.map((m, i) => ({
					mes: i + 1,
					valor: dataCompleta[m].valor,
				}));
			} else {
				// 1 año o más: mostrar por años
				const años = Math.ceil(mesesPlazo / 12);
				for (let i = 0; i <= años; i++) {
					const mesIndice = Math.min(i * 12, mesesPlazo);
					dataMostrar.push({
						mes: i + 1,
						valor: dataCompleta[mesIndice].valor,
					});
				}
			}
		}

		const valorFinal = dataCompleta[dataCompleta.length - 1].valor;
		const ganancias = valorFinal - montoInicial;
		const rendimiento = ((ganancias / montoInicial) * 100).toFixed(2);

		return { data: dataMostrar, valorFinal, ganancias, rendimiento, mesesPlazo };
	};

	const { data, valorFinal, ganancias, rendimiento, mesesPlazo } = useMemo(() => 
		calcularProyeccion(), 
		[formData, vistaGrafica]
	);

	// Para vista de año, mantener los mismos 4 puntos
	const dataAnual = data;

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
				<div className="custom-tooltip">
					<p className="tooltip-valor">{formatearMoneda(payload[0].value)}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className='proyeccion-container'>
			<header className='proyeccion-header'>
				<button className='back-button' onClick={() => navigate('/SimuladorInversion')}>
					<IoChevronBack size={24} />
				</button>
				<h1 className='proyeccion-titulo'>Simulador de inversión</h1>
			</header>

			<div className='proyeccion-content'>
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
								transition: 'transform 0.3s'
							}}
						/>
					</button>
					{mostrarDatos && (
						<div className='datos-actuales'>
							<div className='form-group-edit'>
								<label>Monto a invertir</label>
								<input
									type='text'
									name='montoInvertir'
									value={formData.montoInvertir}
									onChange={(e) => setFormData({ ...formData, montoInvertir: e.target.value })}
									className='form-input-edit'
								/>
							</div>
							<div className='form-group-edit'>
								<label>Plazo</label>
								<select
									name='plazo'
									value={formData.plazo}
									onChange={(e) => setFormData({ ...formData, plazo: e.target.value })}
									className='form-input-edit'
								>
									<option value='6 meses'>6 meses</option>
									<option value='1 año'>1 año</option>
									<option value='2 años'>2 años</option>
									<option value='3 años'>3 años</option>
									<option value='5 años'>5 años</option>
								</select>
							</div>
							<div className='form-group-edit'>
								<label>Frecuencia</label>
								<select
									name='frecuencia'
									value={formData.frecuencia}
									onChange={(e) => setFormData({ ...formData, frecuencia: e.target.value })}
									className='form-input-edit'
								>
									<option value='Mensual'>Mensual</option>
									<option value='Trimestral'>Trimestral</option>
									<option value='Semestral'>Semestral</option>
									<option value='Anual'>Anual</option>
								</select>
							</div>
						</div>
					)}
				</div>

				{/* Título y descripción */}
				<div className='proyeccion-info'>
					<h2 className='proyeccion-titulo-seccion'>Proyección de inversión</h2>
					<p className='proyeccion-descripcion'>
						Visualiza cuánto ganas en diferentes periodos.
					</p>
				</div>

				{/* Gráfica */}
				<div className='grafica-container'>
					<ResponsiveContainer width="100%" height={280}>
						<ComposedChart data={vistaGrafica === 'Meses' ? data : dataAnual}>
							<defs>
								<linearGradient id="colorBarra" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#7dd3c0" stopOpacity={0.9}/>
									<stop offset="100%" stopColor="#6bc5b3" stopOpacity={0.7}/>
								</linearGradient>
							</defs>
							<CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
							<XAxis 
								dataKey="mes" 
								stroke="#9ca3af"
								fontSize={13}
								axisLine={false}
								tickLine={false}
							/>
							<YAxis 
								stroke="#9ca3af"
								fontSize={12}
								tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
								axisLine={false}
								tickLine={false}
								domain={[0, 'auto']}
							/>
							<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
							<Bar 
								dataKey="valor" 
								fill="url(#colorBarra)" 
								radius={[4, 4, 0, 0]}
								maxBarSize={50}
							/>
							<Line 
								type="monotone" 
								dataKey="valor" 
								stroke="#2d3748" 
								strokeWidth={2.5}
								dot={false}
								activeDot={{ r: 5, fill: '#2d3748', strokeWidth: 2, stroke: '#fff' }}
							/>
						</ComposedChart>
					</ResponsiveContainer>
					<p className='grafica-label'>Valor acumulado en {vistaGrafica === 'Meses' ? 'meses' : 'años'}</p>
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

				{/* Valores finales */}
				<div className='valores-finales'>
					<div className='valor-principal'>
						<p className='valor-final-numero'>{formatearMoneda(valorFinal)}</p>
						<p className='valor-final-label'>Valor final</p>
					</div>

					<div className='valores-secundarios'>
						<div className='valor-item'>
							<p className='valor-numero verde'>{formatearMoneda(ganancias)}</p>
							<p className='valor-label'>Ganancias</p>
						</div>
						<div className='valor-item'>
							<p className='valor-numero azul'>{rendimiento} %</p>
							<p className='valor-label'>Rendimiento</p>
						</div>
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

export default ProyeccionInversion;
