import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowDropDown } from 'react-icons/md';
import './AgregarMediodepago.css'; // Reutilizamos el mismo CSS

// --- Funciones Helper de Formato ---

// Helper para formatear monto a formato moneda ($X.XXX.XXX)
const formatCurrency = (value) => {
	if (!value) return '';
	const cleanValue = String(value).replace(/[^0-9]/g, '');
	const number = parseInt(cleanValue, 10);
	if (isNaN(number)) return '';
	return `$${number.toLocaleString('es-CO')}`;
};

// Helper para manejar el cambio de monto (solo números)
const handleMontoChange = (e, setStateFunction) => {
	const cleanValue = e.target.value.replace(/[^0-9]/g, '');
	setStateFunction(cleanValue);
};

// Helper para formatear fecha de corte/pago a dd/mm/aaaa
const handleFechaLargaChange = (e, setStateFunction) => {
	let value = e.target.value.replace(/[^0-9]/g, ''); // Solo números

	// Aplica el formato dd/mm/aaaa
	if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
	if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

	setStateFunction(value);
};

// Helper para formatear fecha de expiración a mm/aa
const handleFechaExpiracionChange = (e, setStateFunction) => {
	let value = e.target.value.replace(/[^0-9]/g, ''); // Solo números

	// Aplica el formato mm/aa
	if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2, 4);

	setStateFunction(value);
};

// 3. Componente reusable para Dropdown (se mantiene)
const CustomDropdown = ({ label, value, options, isOpen, setIsOpen, setValue }) => (
	<div className='detallesec'>
		<label className='form-label'>{label}</label>
		<div
			className='dropdown-select-agregar'
			onClick={() => {
				setIsOpen(!isOpen);
				// NOTA: Se eliminaría la lógica de cerrar otros dropdowns si solo hay 2
			}}
		>
			<span className={value.includes('Selecciona') ? 'placeholder' : ''}>{value}</span>
			<MdArrowDropDown size={28} color='#A9A9A9' style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
		</div>
		{isOpen && (
			<div className='dropdown-list-agregar'>
				{options.map((option, index) => (
					<div
						key={index}
						className={`dropdown-list-item-agregar ${value === option ? 'selected' : ''}`}
						onClick={() => {
							setValue(option);
							setIsOpen(false);
						}}
					>
						{option}
					</div>
				))}
			</div>
		)}
	</div>
);

// --- Componente Principal ---
export default function AgregarMediodePago() {
	const navigate = useNavigate();
	const iconColor = '#4D9DE0';

	// 1. ESTADOS PRINCIPALES
	const [nombreTitular, setNombreTitular] = useState('Eduardo Villamil');
	const [entidadFinanciera, setEntidadFinanciera] = useState('Selecciona la entidad');
	const [isEntidadDropdownOpen, setIsEntidadDropdownOpen] = useState(false);

	// ⭐ ESTADOS ESPECÍFICOS DE MEDIO DE PAGO
	const [tipoProducto, setTipoProducto] = useState('Tarjeta Débito'); // Nuevo estado clave
	const [isTipoProductoDropdownOpen, setIsTipoProductoDropdownOpen] = useState(false);

	const [numeroTarjeta, setNumeroTarjeta] = useState('');
	const [fechaExpiracion, setFechaExpiracion] = useState(''); // mm/aa
	const [cvv, setCvv] = useState(''); // 3 números
	const [cupoDisponible, setCupoDisponible] = useState(''); // Solo para Crédito, pero útil para Débito como Límite

	// ⭐ ESTADOS CONDICIONALES (Solo para Tarjeta Crédito)
	const [fechaCorte, setFechaCorte] = useState(''); // dd/mm/aaaa
	const [fechaPago, setFechaPago] = useState(''); // dd/mm/aaaa

	const [estado, setEstado] = useState('Activa');

	// Opciones
	const entidadesOptions = ['Bancolombia', 'BBVA', 'AV Villas', 'Davivienda', 'Banco de Bogotá'];
	const tiposProductoOptions = ['Tarjeta Débito', 'Tarjeta Crédito']; // Opciones de medio de pago

	// 2. Función de guardado centralizada
	const handleSaveProduct = () => {
		const tipoMedio = tipoProducto;

		// 1. Validación común
		if (
			entidadFinanciera === 'Selecciona la entidad' ||
			!tipoMedio ||
			!nombreTitular ||
			!numeroTarjeta ||
			!fechaExpiracion ||
			!cvv ||
			cvv.length !== 3
		) {
			alert(
				'Por favor, completa todos los campos básicos: Entidad, Tipo de producto, Nombre, Número de tarjeta, Fecha de expiración y CVV (3 dígitos).'
			);
			return;
		}

		let nuevoProducto = {
			id: Date.now(),
			titular: nombreTitular,
			tipo: 'Medio de Pago', // Tipo general de producto
			fechaCreacion: new Date().toISOString(),
			entidad: entidadFinanciera,
			tipoProducto: tipoMedio, // Tarjeta Débito/Crédito
			numeroReferencia: numeroTarjeta,
			fechaExpiracion: fechaExpiracion,
			cvv: cvv, // Solo para la demo, en la vida real no se guarda
			estado: estado,
			cupoDisponible: Number(cupoDisponible),
		};

		// 2. Validación y adición de campos condicionales (Tarjeta Crédito)
		if (tipoMedio === 'Tarjeta Crédito') {
			if (!fechaCorte || fechaCorte.length !== 10 || !fechaPago || fechaPago.length !== 10) {
				alert('Para Tarjeta de Crédito, debes ingresar la Fecha de corte y la Fecha de pago (dd/mm/aaaa).');
				return;
			}
			nuevoProducto.fechaCorte = fechaCorte;
			nuevoProducto.fechaPago = fechaPago;
		}

		// 3. Guardar en localStorage
		const productosExistentesJSON = localStorage.getItem('productos_gestion');
		const productosExistentes = productosExistentesJSON ? JSON.parse(productosExistentesJSON) : [];

		productosExistentes.push(nuevoProducto);

		try {
			localStorage.setItem('productos_gestion', JSON.stringify(productosExistentes));
			alert(`¡${tipoMedio} en ${entidadFinanciera} guardada exitosamente!`);

			// ⭐ REDIRIGE A LA VISTA DE MEDIOS DE PAGO ⭐
			navigate('/Migestion-mediosdepago');
		} catch (error) {
			console.error('Error al guardar en localStorage:', error);
			alert('Hubo un error al intentar guardar el producto.');
		}
	};

	return (
		<div className='agregar-producto-container'>
			<div className='top-barcuenta'>
				{/* ✏️ CAMBIO: La flecha vuelve a la vista de Medios de Pago */}
				<span className='back-arrow' onClick={() => navigate('/Migestion-mediosdepago')}>
					<MdArrowBack size={24} color={iconColor} />
				</span>
				{/* ✏️ CAMBIO: Título adaptado */}
				<span className='top-bar-title'>Agregar Medio de Pago ({tipoProducto.split(' ')[1]})</span>
			</div>

			<div className='agregar-producto-form-card'>
				{/* Nombre del titular */}
				<label className='form-label'>Nombre del titular</label>
				<input
					type='text'
					className='form-input-agregar'
					value={nombreTitular}
					onChange={(e) => setNombreTitular(e.target.value)}
					placeholder='Nombre del titular'
				/>

				{/* Entidad financiera */}
				<CustomDropdown
					label='Entidad financiera'
					value={entidadFinanciera}
					options={entidadesOptions}
					isOpen={isEntidadDropdownOpen}
					setIsOpen={setIsEntidadDropdownOpen}
					setValue={setEntidadFinanciera}
				/>

				{/* Tipo de producto (Tarjeta Débito/Crédito) */}
				<CustomDropdown
					label='Tipo de producto'
					value={tipoProducto}
					options={tiposProductoOptions}
					isOpen={isTipoProductoDropdownOpen}
					setIsOpen={setIsTipoProductoDropdownOpen}
					setValue={setTipoProducto}
				/>

				{/* Número de tarjeta */}
				<label className='form-label'>Número de tarjeta</label>
				<input
					type='text'
					className='form-input-agregar'
					value={numeroTarjeta}
					onChange={(e) => setNumeroTarjeta(e.target.value)}
					placeholder='XXXX XXXX XXXX XXXX'
				/>

				{/* Fechas y CVV - Agrupados en 3 filas */}
				{/* Fila 1: Fecha de expiración */}
				<div className='bothvv' style={{ display: 'flex', gap: '15px' }}>
					<div style={{ flex: 2 }}>
						<label className='form-label'>Fecha de expiración (MM/AA)</label>
						<input
							type='text'
							className='form-input-agregar'
							value={fechaExpiracion}
							onChange={(e) => handleFechaExpiracionChange(e, setFechaExpiracion)}
							maxLength={5}
							placeholder='MM/AA'
							style={{ marginBottom: '25px' }}
						/>
					</div>
					{/* Fila 2: CVV */}
					<div style={{ flex: 1 }}>
						<label className='form-label'>CVV</label>
						<input
							type='text'
							className='form-input-agregar'
							value={cvv}
							onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))} // Solo 3 números
							maxLength={3}
							placeholder='XXX'
							style={{ marginBottom: '25px' }}
						/>
					</div>
				</div>

				{/* Cupo disponible (Se usa el mismo estado y helper de monto) */}
				<label className='form-label'>
					{tipoProducto === 'Tarjeta Crédito' ? 'Cupo disponible' : 'Límite de Retiro/Compra'}
				</label>
				<input
					type='text'
					className='form-input-agregar'
					value={formatCurrency(cupoDisponible)}
					onChange={(e) => handleMontoChange(e, setCupoDisponible)}
					placeholder='$4.000.000'
				/>

				{/* ------------------------------------------------------------------- */}
				{/* ⭐ CAMPOS CONDICIONALES: Solo para Tarjeta Crédito ⭐ */}
				{/* ------------------------------------------------------------------- */}
				{tipoProducto === 'Tarjeta Crédito' && (
					<>
						<label className='form-label'>Fecha de corte (dd/mm/aaaa)</label>
						<input
							type='text'
							className='form-input-agregar'
							value={fechaCorte}
							onChange={(e) => handleFechaLargaChange(e, setFechaCorte)}
							maxLength={10}
							placeholder='01/01/2024'
						/>

						<label className='form-label'>Fecha de pago (dd/mm/aaaa)</label>
						<input
							type='text'
							className='form-input-agregar'
							value={fechaPago}
							onChange={(e) => handleFechaLargaChange(e, setFechaPago)}
							maxLength={10}
							placeholder='15/01/2024'
						/>
					</>
				)}
				{/* ------------------------------------------------------------------- */}

				{/* Estado (Común a todas) */}
				<label className='form-label'>Estado</label>
				<div className='estado-buttons-container'>
					<button className={`estado-btn ${estado === 'Activa' ? 'active' : ''}`} onClick={() => setEstado('Activa')}>
						Activa
					</button>
					<button
						className={`estado-btn ${estado === 'Inactiva' ? 'active' : ''}`}
						onClick={() => setEstado('Inactiva')}
					>
						Inactiva
					</button>
				</div>
			</div>

			{/* BOTÓN GUARDAR PRODUCTO */}
			<button className='guardar-producto-btn' onClick={handleSaveProduct}>
				Guardar {tipoProducto}
			</button>
		</div>
	);
}
