import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProyeccionCredito.css';
import { IoChevronBack, IoChevronDown } from 'react-icons/io5';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ProyeccionCredito = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const initialFormData = location.state?.formData || {
		valorCredito: '1000000',
		plazo: '24',
		cuotaMensual: '500000',
		cuotaAtraso: '3',
	};
	const [formData, setFormData] = useState(initialFormData);
	const [mostrarDatos, setMostrarDatos] = useState(false);

	// Calcular impacto del crédito
	const calcularImpacto = () => {
		const valorCredito = parseFloat(formData.valorCredito.replace(/\./g, '')) || 0;
		const plazoMeses = parseInt(formData.plazo) || 24;
		const cuotaMensual = parseFloat(formData.cuotaMensual.replace(/\./g, '')) || 0;
		const cuotasAtraso = parseInt(formData.cuotaAtraso) || 0;

		// Calcular pago puntual (sin intereses de mora)
		const pagoPuntual = cuotaMensual * plazoMeses;

		// Calcular pago con retraso (asumiendo 20% de interés adicional por mes de atraso)
		const tasaMora = 0.20; // 20% por cuota atrasada
		const interesesMora = valorCredito * tasaMora * cuotasAtraso;
		const pagoConRetraso = pagoPuntual + interesesMora;

		// Porcentaje adicional por el retraso
		const porcentajeAdicional = ((pagoConRetraso - pagoPuntual) / pagoPuntual * 100).toFixed(1);

		// Datos para la gráfica con barras apiladas
		const data = [
			{
				nombre: 'Pago puntual',
				pagoPuntual: pagoPuntual,
				pagoRetraso: 0,
			},
			{
				nombre: 'Pago con retraso',
				pagoPuntual: pagoPuntual,
				pagoRetraso: interesesMora,
			},
		];

		return {
			data,
			pagoPuntual,
			pagoConRetraso,
			porcentajeAdicional,
			interesesMora,
		};
	};

	const { data, pagoPuntual, pagoConRetraso, porcentajeAdicional } = useMemo(
		() => calcularImpacto(),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[formData]
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
			const total = payload.reduce((sum, entry) => sum + entry.value, 0);
			return (
				<div className='custom-tooltip-credito'>
					<p className='tooltip-valor'>{formatearMoneda(total)}</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div className='proyeccion-credito-container'>
			<header className='proyeccion-credito-header'>
				<button className='back-button' onClick={() => navigate('/SimuladorCredito')}>
					<IoChevronBack size={24} />
				</button>
				<h1 className='proyeccion-credito-titulo'>Simulador de crédito</h1>
			</header>

			<div className='proyeccion-credito-content'>
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
								<label>Valor del crédito</label>
								<input
									type='text'
									name='valorCredito'
									value={formData.valorCredito}
									onChange={(e) =>
										setFormData({ ...formData, valorCredito: e.target.value })
									}
									className='form-input-edit'
								/>
							</div>
							<div className='form-group-edit'>
								<label>Plazo (meses)</label>
								<input
									type='text'
									name='plazo'
									value={formData.plazo}
									onChange={(e) =>
										setFormData({ ...formData, plazo: e.target.value })
									}
									className='form-input-edit'
								/>
							</div>
							<div className='form-group-edit'>
								<label>Cuota mensual</label>
								<input
									type='text'
									name='cuotaMensual'
									value={formData.cuotaMensual}
									onChange={(e) =>
										setFormData({ ...formData, cuotaMensual: e.target.value })
									}
									className='form-input-edit'
								/>
							</div>
							<div className='form-group-edit'>
								<label>Cuotas de atraso</label>
								<input
									type='text'
									name='cuotaAtraso'
									value={formData.cuotaAtraso}
									onChange={(e) =>
										setFormData({ ...formData, cuotaAtraso: e.target.value })
									}
									className='form-input-edit'
								/>
							</div>
						</div>
					)}
				</div>

				{/* Título y descripción */}
				<div className='proyeccion-info'>
					<h2 className='proyeccion-titulo-seccion'>Visualiza el impacto</h2>
					<p className='proyeccion-descripcion'>
						financiero de los atrasos en tu crédito
					</p>
				</div>

				{/* Gráfica de barras comparativa */}
				<div className='grafica-container'>
					<ResponsiveContainer width='100%' height={280}>
						<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
							<CartesianGrid strokeDasharray='3 3' stroke='#e2e8f0' vertical={false} />
							<XAxis 
								dataKey='nombre' 
								stroke='#9ca3af'
								fontSize={12}
								axisLine={false}
								tickLine={false}
								angle={0}
								textAnchor='middle'
								interval={0}
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
							<Bar dataKey='pagoPuntual' stackId="a" fill='#a8e6cf' radius={[0, 0, 12, 12]} maxBarSize={80} />
							<Bar dataKey='pagoRetraso' stackId="a" fill='#ff6b6b' radius={[12, 12, 0, 0]} maxBarSize={80} />
						</BarChart>
					</ResponsiveContainer>
					<p className='grafica-label'>Valor total</p>
				</div>

				{/* Valores comparativos */}
				<div className='valores-comparativos'>
					<div className='valor-comparativo-item'>
						<p className='valor-comparativo-numero'>{formatearMoneda(pagoPuntual)}</p>
						<p className='valor-comparativo-label'>Pago puntual</p>
					</div>
					<div className='valor-comparativo-item'>
						<p className='valor-comparativo-numero rojo'>{formatearMoneda(pagoConRetraso)}</p>
						<p className='valor-comparativo-label'>Pago con retraso</p>
					</div>
				</div>

				{/* Mensaje de impacto */}
				<div className='impacto-mensaje'>
					<p>Pagarás {porcentajeAdicional}% más por el retraso</p>
				</div>

				{/* Botón volver */}
				<button className='btn-volver' onClick={() => navigate('/SimuladorCredito')}>
					Volver
				</button>
			</div>
		</div>
	);
};

export default ProyeccionCredito;
