import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SimuladorInversion.css';
import { IoChevronBack } from 'react-icons/io5';

const SimuladorInversion = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		montoInvertir: '1000000',
		frecuencia: 'Anual',
		plazo: '1 año',
		tipoInversion: 'CDT',
		sueldo: '6000000',
		nivelRiesgo: 'Bajo',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const calcularRetorno = () => {
		// Lógica básica de cálculo de retorno
		const monto = parseFloat(formData.montoInvertir.replace(/\./g, ''));
		const tasaAnual = 0.08; // 8% ejemplo
		return (monto * tasaAnual).toFixed(0);
	};

	const retornoEstimado = calcularRetorno();
	const porcentajeRetorno = '8.0%';

	return (
		<div className='simulador-inversion-container'>
			<header className='simulador-inversion-header'>
				<button className='back-button' onClick={() => navigate('/Simuladores')}>
					<IoChevronBack size={24} />
				</button>
				<h1 className='simulador-inversion-titulo'>Simulador de inversión</h1>
			</header>

			<div className='formulario-container'>
				<h2 className='formulario-titulo'>Ingresa los datos</h2>

				<div className='form-group'>
					<label className='form-label'>Monto a invertir</label>
					<input
						type='text'
						name='montoInvertir'
						value={formData.montoInvertir}
						onChange={handleChange}
						className='form-input'
						placeholder='$1.000.000'
					/>
				</div>

				<div className='form-group'>
					<label className='form-label'>Frecuencia</label>
					<select
						name='frecuencia'
						value={formData.frecuencia}
						onChange={handleChange}
						className='form-select'
					>
						<option value='Mensual'>Mensual</option>
						<option value='Trimestral'>Trimestral</option>
						<option value='Semestral'>Semestral</option>
						<option value='Anual'>Anual</option>
					</select>
				</div>

				<div className='form-group'>
					<label className='form-label'>Plazo</label>
					<select
						name='plazo'
						value={formData.plazo}
						onChange={handleChange}
						className='form-select'
					>
						<option value='6 meses'>6 meses</option>
						<option value='1 año'>1 año</option>
						<option value='2 años'>2 años</option>
						<option value='3 años'>3 años</option>
						<option value='5 años'>5 años</option>
					</select>
				</div>

				<div className='form-group'>
					<label className='form-label'>Tipo de inversión</label>
					<select
						name='tipoInversion'
						value={formData.tipoInversion}
						onChange={handleChange}
						className='form-select'
					>
						<option value='CDT'>CDT</option>
						<option value='Acciones'>Acciones</option>
						<option value='Bonos'>Bonos</option>
						<option value='Fondos'>Fondos</option>
					</select>
				</div>

				<div className='form-group'>
					<label className='form-label'>Sueldo mensual (opcional)</label>
					<input
						type='text'
						name='sueldo'
						value={formData.sueldo}
						onChange={handleChange}
						className='form-input'
						placeholder='$6.000.000'
					/>
				</div>

				<div className='form-group'>
					<label className='form-label'>Nivel de riesgo</label>
					<div className='nivel-riesgo-container'>
						<span className='nivel-riesgo-valor'>Bajo</span>
					</div>
				</div>

				<div className='form-group'>
					<label className='form-label'>Retorno estimado</label>
					<input
						type='text'
						value={porcentajeRetorno}
						readOnly
						className='form-input'
					/>
				</div>

				<button className='btn-proyeccion'>Ver proyección</button>
			</div>
		</div>
	);
};

export default SimuladorInversion;
