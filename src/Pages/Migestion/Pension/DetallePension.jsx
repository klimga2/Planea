import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	MdArrowBack,
	MdEdit,
	MdDelete,
	MdWork, // 💼 Para Pensión Obligatoria
	MdTrendingUp, // 📈 Para BEPS
	MdFavoriteBorder, // ❤️ Para Pensión Voluntaria
	MdShield, // 🛡️ Genérico de Protección
	MdArrowDropDown,
} from 'react-icons/md';

import './DetallePension.css';

// ------------------------------------------
// HELPERS & DROPDOWN
// ------------------------------------------

// Helper para formatear monto a formato moneda ($X.XXX.XXX)
const formatCurrency = (value) => {
	if (value === null || value === undefined || value === '') return '';
	const cleanValue = String(value).replace(/[^0-9]/g, '');
	const number = parseInt(cleanValue, 10);
	if (isNaN(number)) return '';
	// Usamos toLocaleString para mantener el formato de separadores de miles
	return new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0,
	}).format(number);
};

// Maneja el cambio de monto (valorAcumulado, aportesMensuales) y lo guarda como número limpio
const handleMontoChange = (e, fieldName, setFormData) => {
	const cleanValue = e.target.value.replace(/[^0-9]/g, '');
	setFormData((prev) => ({ ...prev, [fieldName]: cleanValue }));
};

// Maneja el cambio de fecha (dd/mm/aaaa)
const handleFechaChange = (e, fieldName, setFormData) => {
	let value = e.target.value.replace(/[^0-9]/g, '');

	if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
	if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

	setFormData((prev) => ({ ...prev, [fieldName]: value }));
};

// Maneja el input de Porcentaje (Rentabilidad)
const handleRentabilidadChange = (e, setFormData) => {
	let value = e.target.value.replace(/[^0-9,.]/g, ''); // Permite números, comas y puntos

	// Formato básico para 7,8% o 7.8% (lo convertimos a punto para guardar)
	if (value.includes(',')) value = value.replace(',', '.');

	setFormData((prev) => ({ ...prev, rentabilidad: value }));
};

/**
 * Componente Reutilizable: CustomDropdown
 */
const CustomDropdown = ({ label, fieldName, value, options, isEditing, setFormData }) => {
	const [isOpen, setIsOpen] = useState(false);

	// Aseguramos que el valor de visualización sea el valor, o el placeholder
	const displayValue = value && value !== '' ? value : `Selecciona ${label.toLowerCase()}`;

	const handleSelect = (option) => {
		setFormData((prev) => ({ ...prev, [fieldName]: option }));
		setIsOpen(false);
	};

	return (
		<div className='input-col'>
			<label className='form-label'>{label}</label>
			<div
				className='dropdown-select-agregar form-input' // Reutilizamos clases de input y agregar
				onClick={() => isEditing && setIsOpen(!isOpen)}
				style={{ cursor: isEditing ? 'pointer' : 'default', backgroundColor: isEditing ? '#fff' : '#f7f7f7' }}
			>
				<span className={displayValue.includes('Selecciona') ? 'placeholder' : ''}>{displayValue}</span>
				{isEditing && (
					<MdArrowDropDown
						size={28}
						color='#A9A9A9'
						style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
					/>
				)}
			</div>
			{isOpen && isEditing && (
				<div
					className='dropdown-list-agregar'
					style={{
						position: 'absolute',
						zIndex: 100,
						width: '100%',
						maxWidth: '280px',
						backgroundColor: 'white',
						border: '1px solid #ccc',
						borderRadius: '8px',
						boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
					}}
				>
					{options.map((option, index) => (
						<div
							key={index}
							className={`dropdown-list-item-agregar ${value === option ? 'selected' : ''}`}
							onClick={() => handleSelect(option)}
							style={{
								padding: '10px',
								borderBottom: '1px solid #eee',
								cursor: 'pointer',
								backgroundColor: value === option ? '#e6f0ff' : 'white',
							}}
						>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

// ------------------------------------------
// COMPONENTE PRINCIPAL: DetallePension
// ------------------------------------------
export default function DetallePension() {
	const navigate = useNavigate();
	const { id } = useParams();

	// Estados de control
	const [pension, setPension] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(true);

	const iconColor = '#4D9DE0';

	// Opciones para Dropdowns
	const tipoPensionOptions = ['Fondo obligatorio', 'Fondo voluntario', 'BEPS']; // Usamos el mismo texto que en AGREGAR PENSION
	const entidadesPensionOptions = ['Porvenir', 'Colpensiones', 'Colfondos', 'Skandia', 'Sura'];
	const cotizanteOptions = ['Dependiente', 'Independiente', 'Otro'];

	// ------------------------------------------
	// FUNCIONES DE CARGA Y MANEJO
	// ------------------------------------------

	// Carga los datos iniciales de la pensión
	useEffect(() => {
		const loadPensionData = () => {
			try {
				const productosJSON = localStorage.getItem('productos_gestion');
				const productos = productosJSON ? JSON.parse(productosJSON) : [];

				const idToFind = Number(id);

				// Buscar el producto por ID y asegurar que sea de tipo 'Pensión'
				const currentPension = productos.find((p) => Number(p.id) === idToFind && p.tipo === 'Pensión');

				if (currentPension) {
					setPension(currentPension);
					setFormData(currentPension);
				} else {
					alert('Pensión no encontrada o el producto no es de tipo Pensión.');
					navigate('/Migestion-pensiones');
				}
			} catch (error) {
				console.error('Error al cargar datos de la pensión:', error);
				alert('Error al cargar datos.');
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			loadPensionData();
		}
	}, [id, navigate]);

	// Maneja el cambio de cualquier campo de texto simple
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Maneja el guardado de la edición (Validación mejorada por tipo de pensión)
	const handleSaveEdit = useCallback(() => {
		let validationError = null;

		// 1. Validaciones Comunes
		if (
			formData.tipoProducto.includes('Selecciona') ||
			formData.entidad.includes('Selecciona') ||
			!formData.numeroReferencia ||
			!formData.valorAcumulado
		) {
			validationError =
				'Por favor, completa los campos comunes (Tipo de Pensión, Entidad, Referencia y Valor Acumulado).';
		}

		// 2. Validaciones Específicas
		if (!validationError) {
			if (formData.tipoProducto === 'Fondo obligatorio') {
				if (
					formData.tipoCotizante.includes('Selecciona') ||
					!formData.regimen ||
					!formData.fechaUltimoAporte ||
					formData.fechaUltimoAporte.length !== 10
				) {
					validationError =
						'Por favor, completa todos los campos requeridos para Fondo Obligatorio (Régimen, Cotizante y Fecha).';
				}
			} else if (formData.tipoProducto === 'Fondo voluntario') {
				if (
					!formData.aportesMensuales ||
					!formData.fechaVinculacion ||
					formData.fechaVinculacion.length !== 10 ||
					!formData.rentabilidad
				) {
					validationError =
						'Por favor, completa todos los campos requeridos para Fondo Voluntario (Aportes, Vinculación, Tasa y Rentabilidad).';
				}
			} else if (formData.tipoProducto === 'BEPS') {
				if (!formData.fechaVinculacion || formData.fechaVinculacion.length !== 10) {
					validationError = 'Por favor, completa la Fecha de vinculación para BEPS.';
				}
			}
		}

		if (validationError) {
			alert(`⚠️ ERROR: ${validationError}`);
			return;
		}

		try {
			const productosJSON = localStorage.getItem('productos_gestion');
			let productos = productosJSON ? JSON.parse(productosJSON) : [];

			const index = productos.findIndex((p) => Number(p.id) === Number(pension.id));

			if (index !== -1) {
				// Prepara los datos para guardar (Asegurando la conversión a Number para montos/porcentajes)
				const updatedData = {
					...formData,
					valorAcumulado: Number(formData.valorAcumulado),
					// Campos condicionales a número:
					...(formData.tipoProducto === 'Fondo voluntario' && {
						aportesMensuales: Number(formData.aportesMensuales),
						rentabilidad: Number(formData.rentabilidad),
					}),
					// Limpia campos no relevantes para el tipo actual (opcional, pero buena práctica)
					...(formData.tipoProducto !== 'Fondo obligatorio' && {
						regimen: undefined,
						tipoCotizante: undefined,
						fechaUltimoAporte: undefined,
					}),
					...(formData.tipoProducto !== 'Fondo voluntario' && {
						aportesMensuales: undefined,
						tipoTasa: undefined,
						rentabilidad: undefined,
					}),
					...(formData.tipoProducto === 'Fondo obligatorio' && {
						fechaVinculacion: undefined, // Obligatorio no tiene fechaVinculacion
					}),
				};

				productos[index] = updatedData;

				localStorage.setItem('productos_gestion', JSON.stringify(productos));

				// Actualizar el estado y deshabilitar la edición
				setPension(updatedData);
				setFormData(updatedData);
				setIsEditing(false);
				alert('¡Pensión actualizada exitosamente! ✅');
			} else {
				alert('Error: No se pudo encontrar la pensión para actualizar.');
			}
		} catch (error) {
			console.error('Error al guardar la edición:', error);
			alert('Hubo un error al intentar guardar los cambios.');
		}
	}, [formData, pension]);

	// Maneja la eliminación del producto
	const handleDeleteProduct = useCallback(() => {
		if (
			!window.confirm(`¿Estás seguro de que deseas eliminar la pensión ${pension.tipoProducto} de ${pension.entidad}?`)
		) {
			return;
		}

		try {
			const productosJSON = localStorage.getItem('productos_gestion');
			let productos = productosJSON ? JSON.parse(productosJSON) : [];

			const idToDelete = Number(pension.id);
			const productosActualizados = productos.filter((p) => Number(p.id) !== idToDelete);

			localStorage.setItem('productos_gestion', JSON.stringify(productosActualizados));
			alert('Pensión eliminada exitosamente. 🗑️');

			// Redirigir a Mis Pensiones
			navigate('/Migestion-pensiones');
		} catch (error) {
			console.error('Error al eliminar la pensión:', error);
			alert('Hubo un error al intentar eliminar la pensión.');
		}
	}, [pension, navigate]);

	// ------------------------------------------
	// RENDERIZADO CONDICIONAL DE CAMPOS ESPECÍFICOS (MODIFICADO)
	// ------------------------------------------
	const renderPensionFields = () => {
		const disabled = !isEditing;

		if (formData.tipoProducto === 'Fondo obligatorio') {
			return (
				<>
					{/* 4. Botones Tipo de régimen (RAIS, RPM) */}
					<label className='form-label'>Tipo de régimen</label>
					<div className='tasa-checkbox-container' style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
						<button
							className={`tasa-btn ${formData.regimen === 'RAIS' ? 'active' : ''}`}
							onClick={() => setFormData((prev) => ({ ...prev, regimen: 'RAIS' }))}
							disabled={disabled}
						>
							RAIS
						</button>
						<button
							className={`tasa-btn ${formData.regimen === 'RPM' ? 'active' : ''}`}
							onClick={() => setFormData((prev) => ({ ...prev, regimen: 'RPM' }))}
							disabled={disabled}
						>
							RPM
						</button>
					</div>

					{/* 6. Dropdown Tipo de cotizante */}
					<CustomDropdown
						label='Tipo de cotizante'
						fieldName='tipoCotizante'
						value={formData.tipoCotizante || 'Selecciona el tipo de cotizante'}
						options={cotizanteOptions}
						isEditing={isEditing}
						setFormData={setFormData}
					/>

					{/* 7. Fecha último aporte recibido (fechaUltimoAporte) */}
					<label className='form-label'>Fecha último aporte recibido (dd/mm/aaaa)</label>
					<input
						type='text'
						className='form-input'
						name='fechaUltimoAporte'
						value={formData.fechaUltimoAporte || ''}
						onChange={(e) => handleFechaChange(e, 'fechaUltimoAporte', setFormData)}
						maxLength={10}
						disabled={disabled}
					/>
				</>
			);
		}

		if (formData.tipoProducto === 'Fondo voluntario') {
			return (
				<>
					{/* Aportes Mensuales */}
					<label className='form-label'>Aportes Mensuales</label>
					<input
						type='text'
						className='form-input'
						name='aportesMensuales'
						value={formatCurrency(formData.aportesMensuales)}
						onChange={(e) => handleMontoChange(e, 'aportesMensuales', setFormData)}
						disabled={disabled}
					/>

					{/* Fecha de vinculacion */}
					<label className='form-label'>Fecha de vinculación (dd/mm/aaaa)</label>
					<input
						type='text'
						className='form-input'
						name='fechaVinculacion'
						value={formData.fechaVinculacion || ''}
						onChange={(e) => handleFechaChange(e, 'fechaVinculacion', setFormData)}
						maxLength={10}
						disabled={disabled}
					/>

					{/* Botones de Tasa (EA, Nominal) */}
					<label className='form-label'>Tasa (EA, Nominal)</label>
					<div className='tasa-checkbox-container' style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
						<button
							className={`tasa-btnN ${formData.tipoTasa === 'EA' ? 'active' : ''}`}
							onClick={() => setFormData((prev) => ({ ...prev, tipoTasa: 'EA' }))}
							disabled={disabled}
						>
							EA
						</button>
						<button
							className={`tasa-btnN ${formData.tipoTasa === 'Nominal' ? 'active' : ''}`}
							onClick={() => setFormData((prev) => ({ ...prev, tipoTasa: 'Nominal' }))}
							disabled={disabled}
						>
							Nominal
						</button>
					</div>

					{/* Rentabilidad */}
					<label className='form-label'>Rentabilidad (en porcentaje)</label>
					<div className='input-with-suffix'>
						<input
							type='text'
							className='form-input'
							name='rentabilidad'
							value={formData.rentabilidad || ''}
							onChange={(e) => handleRentabilidadChange(e, setFormData)}
							disabled={disabled}
						/>
						<span className='suffix'>%</span>
					</div>
				</>
			);
		}

		if (formData.tipoProducto === 'BEPS') {
			return (
				<>
					{/* Fecha de vinculacion */}
					<label className='form-label'>Fecha de vinculación (dd/mm/aaaa)</label>
					<input
						type='text'
						className='form-input'
						name='fechaVinculacion'
						value={formData.fechaVinculacion || ''}
						onChange={(e) => handleFechaChange(e, 'fechaVinculacion', setFormData)}
						maxLength={10}
						disabled={disabled}
					/>
				</>
			);
		}

		return null;
	};

	// ------------------------------------------
	// LÓGICA DE VISTA (Resto del componente)
	// ------------------------------------------

	if (loading) {
		return <div style={{ padding: '20px' }}>Cargando...</div>;
	}

	if (!pension) {
		return <div style={{ padding: '20px' }}>Error al cargar la pensión.</div>;
	}

	// ... (El resto de funciones getIcon y getCardColorClass se mantienen)
	const getIcon = (tipoProducto) => {
		const tipoUpper = tipoProducto ? tipoProducto.toUpperCase() : '';
		const iconStyle = { size: 30 };

		if (tipoUpper.includes('BEPS')) {
			return <MdTrendingUp {...iconStyle} />;
		}
		if (tipoUpper.includes('OBLIGATORIO')) {
			return <MdWork {...iconStyle} />;
		}
		if (tipoUpper.includes('VOLUNTARIO')) {
			return <MdFavoriteBorder {...iconStyle} />;
		}
		return <MdShield {...iconStyle} />;
	};

	const getCardColorClass = (tipoProducto) => {
		const tipoUpper = tipoProducto ? tipoProducto.toUpperCase() : '';

		if (tipoUpper.includes('BEPS')) {
			return 'card-color-ahorro';
		}
		if (tipoUpper.includes('OBLIGATORIO')) {
			return 'card-color-deposito-elec';
		}
		if (tipoUpper.includes('VOLUNTARIO')) {
			return 'card-color-vehiculo';
		}
		return 'card-color-default';
	};

	return (
		<div className='detalle-cuenta-container'>
			{/* Top Bar */}
			<div className='top-bar'>
				<span className='back-arrow' onClick={() => navigate('/Migestion-pensiones')}>
					<MdArrowBack size={24} color={iconColor} />
				</span>
				<span className='top-bar-title'>Información de tu Pensión</span>
			</div>

			{/* Banner/Card superior - Clase de color dinámica */}
			<div className={`detalle-header-card ${getCardColorClass(pension.tipoProducto)}`}>
				<div className='header-icon'>{getIcon(pension.tipoProducto)}</div>
				<div className='header-text'>
					<h2>{pension.tipoProducto}</h2>
					<h1>{pension.entidad}</h1>
				</div>
			</div>

			{/* Formulario de Detalle/Edición */}
			<div className='detalle-form-container'>
				<div className='edit-button-wrapper' onClick={() => setIsEditing(!isEditing)}>
					<MdEdit size={28} color={isEditing ? '#FF6347' : iconColor} style={{ cursor: 'pointer' }} />
				</div>

				{/* 1. Nombre del titular */}
				<label className='form-label'>Nombre del titular</label>
				<input
					type='text'
					className='form-input'
					name='titular'
					value={formData.titular || ''}
					onChange={handleChange}
					disabled={!isEditing}
				/>

				{/* 2. Dropdown Tipo de pensión (Editable) */}
				<CustomDropdown
					label='Tipo de pensión'
					fieldName='tipoProducto'
					value={formData.tipoProducto || 'Selecciona el tipo de pensión'}
					options={tipoPensionOptions}
					isEditing={isEditing}
					setFormData={setFormData}
				/>

				{/* 3. Dropdown Entidad (Editable) */}
				<CustomDropdown
					label='Entidad'
					fieldName='entidad'
					value={formData.entidad || 'Selecciona la entidad'}
					options={entidadesPensionOptions}
					isEditing={isEditing}
					setFormData={setFormData}
				/>

				{/* 5. Número o referencia (Editable) */}
				<label className='form-label'>Número de Referencia</label>
				<input
					type='text'
					className='form-input'
					name='numeroReferencia'
					value={formData.numeroReferencia || ''}
					onChange={handleChange}
					disabled={!isEditing}
				/>

				{/* VALOR ACUMULADO - MOVIDO AQUÍ PARA QUE SEA COMÚN A TODOS ANTES DE LOS ESPECÍFICOS */}
				<label className='form-label'>Valor acumulado</label>
				<input
					type='text'
					className='form-input'
					name='valorAcumulado'
					value={formatCurrency(formData.valorAcumulado)}
					onChange={(e) => handleMontoChange(e, 'valorAcumulado', setFormData)}
					disabled={!isEditing}
				/>

				{/* CAMPOS ESPECÍFICOS DE PENSIÓN RENDERIZADOS AQUÍ */}
				{renderPensionFields()}

				{/* 9. Estado (Editable con botones) */}
				<label className='form-label'>Estado</label>
				<div className='estado-buttons-containerN' style={{ pointerEvents: !isEditing ? 'none' : 'auto' }}>
					<button
						className={`estado-btnN ${formData.estado === 'Activa' ? 'active' : ''}`}
						onClick={() => setFormData((prev) => ({ ...prev, estado: 'Activa' }))}
						disabled={!isEditing}
					>
						Activa
					</button>
					<button
						className={`estado-btnN ${formData.estado === 'Traslado en trámite' ? 'active' : ''}`}
						onClick={() => setFormData((prev) => ({ ...prev, estado: 'Traslado en trámite' }))}
						disabled={!isEditing}
					>
						Traslado en trámite
					</button>
				</div>

				{/* Botones de acción (Guardar / Eliminar / Regresar) */}
				<div className='action-buttons'>
					{isEditing && (
						<button className='guardar-edicion-btn' onClick={handleSaveEdit}>
							Guardar Cambios
						</button>
					)}

					<button className='eliminar-producto-btn' onClick={handleDeleteProduct}>
						Eliminar Pensión ⊗
					</button>

					{!isEditing && (
						<button className='regresar-btn' onClick={() => navigate('/Migestion-pensiones')}>
							Regresar a mis pensiones
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
