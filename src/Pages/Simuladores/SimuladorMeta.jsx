import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SimuladorMeta.css';
import { IoChevronBack } from 'react-icons/io5';
import { HiLightBulb } from 'react-icons/hi';

const SimuladorMeta = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		presupuestoMeta: '180000000',
		aporteMensual: '1000000',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const calcularMeta = () => {
		const presupuesto = parseFloat(formData.presupuestoMeta.replace(/\./g, '')) || 0;
		const aporte = parseFloat(formData.aporteMensual.replace(/\./g, '')) || 0;

		if (aporte === 0) {
			return {
				meses: 0,
				años: 0,
				aporteFormateado: '$ 0',
			};
		}

		const meses = Math.ceil(presupuesto / aporte);
		const años = Math.floor(meses / 12);
		const mesesRestantes = meses % 12;

		return {
			meses,
			años,
			mesesRestantes,
			aporteFormateado: formatearMoneda(aporte),
		};
	};

	const formatearMoneda = (valor) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0,
		}).format(valor);
	};

	const { meses, años, mesesRestantes, aporteFormateado } = calcularMeta();

	const handleVerProyeccion = () => {
		navigate('/ProyeccionMeta', {
			state: { formData },
		});
	};

	return (
		<div className='simulador-meta-container'>
			<header className='simulador-meta-header'>
				<button className='back-button' onClick={() => navigate('/Simuladores')}>
					<IoChevronBack size={24} />
				</button>
				<h1 className='simulador-meta-titulo'>Simulador de meta</h1>
			</header>

			<div className='meta-content'>
				{/* Consejo */}
				<div className='consejo-banner'>
					<div className='consejo-icon'>
						<HiLightBulb size={24} />
					</div>
					<div className='consejo-texto'>
						<p className='consejo-titulo'>Consejo...</p>
						<p className='consejo-descripcion'>
							Expertos recomiendan ahorrar al menos 10% de tus ingresos.
						</p>
					</div>
				</div>

				{/* Formulario */}
				<div className='formulario-meta'>
					<h2 className='formulario-titulo'>Ingresa los datos</h2>

					<div className='form-group'>
						<label className='form-label'>Presupuesto de la meta</label>
						<input
							type='text'
							name='presupuestoMeta'
							value={formData.presupuestoMeta}
							onChange={handleChange}
							className='form-input'
							placeholder='$ 180.000.000'
						/>
					</div>

					<div className='form-group'>
						<label className='form-label'>Aporte mensual</label>
						<input
							type='text'
							name='aporteMensual'
							value={formData.aporteMensual}
							onChange={handleChange}
							className='form-input'
							placeholder='$ 1.000.000'
						/>
					</div>
				</div>

				{/* Calculadora de meta */}
				<div className='calculadora-meta-section'>
					<h2 className='calculadora-titulo'>Calculadora de meta</h2>

					<div className='resultado-meta'>
						<p className='resultado-label'>Tu meta</p>
						<p className='resultado-valor'>
							{formatearMoneda(parseFloat(formData.presupuestoMeta.replace(/\./g, '')) || 0)}
						</p>
						<p className='resultado-descripcion'>
							Alcanzable en {años > 0 ? `${años} ${años === 1 ? 'año' : 'años'}` : ''}{' '}
							{mesesRestantes > 0 && años > 0 ? 'y ' : ''}
							{mesesRestantes > 0 || años === 0
								? `${meses} ${meses === 1 ? 'mes' : 'meses'}`
								: ''}{' '}
							con aportes mensuales de {aporteFormateado}
						</p>
					</div>
				</div>

				{/* Botón Ver proyección */}
				<button className='btn-ver-proyeccion' onClick={handleVerProyeccion}>
					Ver proyección
				</button>
			</div>
		</div>
	);
};

export default SimuladorMeta;
