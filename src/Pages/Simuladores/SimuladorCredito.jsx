import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SimuladorCredito.css';
import { IoChevronBack } from 'react-icons/io5';
import { HiLightBulb } from 'react-icons/hi';
import { AiOutlineWarning } from 'react-icons/ai';

const SimuladorCredito = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		valorCredito: '1000000',
		plazo: '24',
		cuotaMensual: '500000',
		cuotaAtraso: '3',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleVerProyeccion = () => {
		navigate('/ProyeccionCredito', { 
			state: { formData } 
		});
	};

	return (
		<div className='simulador-credito-container'>
			<header className='simulador-credito-header'>
				<button className='back-button' onClick={() => navigate('/Simuladores')}>
					<IoChevronBack size={24} />
				</button>
				<h1 className='simulador-credito-titulo'>Simulador de crédito</h1>
			</header>

			<div className='credito-content'>
				{/* Formulario */}
				<div className='formulario-credito'>
					<h2 className='formulario-titulo'>Ingresa los datos</h2>

					<div className='form-group'>
						<label className='form-label'>Valor del crédito</label>
						<input
							type='text'
							name='valorCredito'
							value={formData.valorCredito}
							onChange={handleChange}
							className='form-input'
							placeholder='$ 1.000.000'
						/>
					</div>

					<div className='form-group'>
						<label className='form-label'>Plazo</label>
						<input
							type='text'
							name='plazo'
							value={formData.plazo}
							onChange={handleChange}
							className='form-input'
							placeholder='24 meses'
						/>
					</div>

					<div className='form-group'>
						<label className='form-label'>Cuota mensual</label>
						<input
							type='text'
							name='cuotaMensual'
							value={formData.cuotaMensual}
							onChange={handleChange}
							className='form-input'
							placeholder='$ 500.000'
						/>
					</div>

					{/* Escenario de retraso */}
					<div className='escenario-retraso'>
						<div className='retraso-header'>
							<AiOutlineWarning size={20} color='#ef4444' />
							<span className='retraso-titulo'>Escenario de retraso</span>
						</div>

						<div className='form-group'>
							<label className='form-label'>Cuota de atraso</label>
							<input
								type='text'
								name='cuotaAtraso'
								value={formData.cuotaAtraso}
								onChange={handleChange}
								className='form-input'
								placeholder='3'
							/>
						</div>
					</div>

					{/* Banner de advertencia */}
					<div className='advertencia-banner'>
						<div className='advertencia-icon'>
							<HiLightBulb size={24} />
						</div>
						<div className='advertencia-texto'>
							<strong>Ten cuidado...</strong>
							<p>Los atrasos afectan tu historial crediticio y pueden generar costos adicionales significativos.</p>
						</div>
					</div>

					<button className='btn-proyeccion-credito' onClick={handleVerProyeccion}>
						Ver proyección
					</button>
				</div>
			</div>
		</div>
	);
};

export default SimuladorCredito;
