import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SimuladorAhorro.css';
import { IoChevronBack } from 'react-icons/io5';
import { HiLightBulb } from 'react-icons/hi';

const SimuladorAhorro = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		sueldoMensual: '3000000',
		porcentajeAhorrar: '10',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const calcularAhorro = () => {
		const sueldo = parseFloat(formData.sueldoMensual.replace(/\./g, '')) || 0;
		const porcentaje = parseFloat(formData.porcentajeAhorrar) || 0;
		const ahorroMensual = (sueldo * porcentaje) / 100;
		const disponibleGastos = sueldo - ahorroMensual;
		return { ahorroMensual, disponibleGastos };
	};

	const { ahorroMensual, disponibleGastos } = calcularAhorro();

	const formatearMoneda = (valor) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: 'COP',
			minimumFractionDigits: 0,
		}).format(valor);
	};

	const handleVerProyeccion = () => {
		navigate('/ProyeccionAhorro', { 
			state: { 
				formData: {
					...formData,
					ahorroMensual,
					disponibleGastos
				}
			} 
		});
	};

	return (
		<div className='simulador-ahorro-container'>
			<header className='simulador-ahorro-header'>
				<button className='back-button' onClick={() => navigate('/Simuladores')}>
					<IoChevronBack size={24} />
				</button>
				<h1 className='simulador-ahorro-titulo'>Simulador de ahorro</h1>
			</header>

			<div className='ahorro-content'>
				{/* Banner de consejo */}
				<div className='consejo-banner'>
					<div className='consejo-icon'>
						<HiLightBulb size={24} />
					</div>
					<div className='consejo-texto'>
						<strong>Consejo...</strong>
						<p>Expertos recomiendan ahorrar al menos el 10% de tus ingresos.</p>
					</div>
				</div>

				{/* Formulario */}
				<div className='formulario-ahorro'>
					<h2 className='formulario-titulo'>Ingresa los datos</h2>

					<div className='form-group'>
						<label className='form-label'>Sueldo mensual</label>
						<input
							type='text'
							name='sueldoMensual'
							value={formData.sueldoMensual}
							onChange={handleChange}
							className='form-input'
							placeholder='$ 3.000.000'
						/>
					</div>

					<div className='form-group'>
						<label className='form-label'>Porcentaje a ahorrar</label>
						<input
							type='text'
							name='porcentajeAhorrar'
							value={formData.porcentajeAhorrar}
							onChange={handleChange}
							className='form-input'
							placeholder='10 %'
						/>
					</div>

					{/* Resultados */}
					<div className='resultados-ahorro'>
						<div className='resultado-item destacado'>
							<p className='resultado-valor'>{formatearMoneda(ahorroMensual)}</p>
							<p className='resultado-label'>Ahorro mensual</p>
						</div>

						<div className='resultado-item'>
							<p className='resultado-valor'>{formatearMoneda(disponibleGastos)}</p>
							<p className='resultado-label'>Disponible para gastos</p>
						</div>
					</div>

					<button className='btn-proyeccion-ahorro' onClick={handleVerProyeccion}>
						Ver proyección
					</button>
				</div>
			</div>
		</div>
	);
};

export default SimuladorAhorro;
