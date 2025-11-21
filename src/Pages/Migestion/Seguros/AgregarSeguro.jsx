import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowDropDown } from 'react-icons/md';
// Reutilizamos el CSS de las páginas de agregar producto
import './AgregarSeguro.css';

// -------------------------------------------------------------------
// 1. Componente Reutilizable: CustomDropdown
// -------------------------------------------------------------------
const CustomDropdown = ({ label, value, options, isOpen, setIsOpen, setValue }) => (
    <div className='detallesec'>
        <label className='form-label'>{label}</label>
        <div
            className='dropdown-select-agregar'
            onClick={() => setIsOpen(!isOpen)}
        >
            <span className={value.includes('Selecciona') ? 'placeholder' : ''}>
                {value}
            </span>
            <MdArrowDropDown
                size={28}
                color="#A9A9A9"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
            />
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


// -------------------------------------------------------------------
// 2. Funciones Auxiliares
// -------------------------------------------------------------------

// Formato de moneda (Ej: $4.000.000)
const formatCurrency = (value) => {
    if (!value) return '';
    const cleanValue = String(value).replace(/[^0-9]/g, '');
    const number = parseInt(cleanValue, 10);
    if (isNaN(number)) return '';
    return `$${number.toLocaleString('es-CO')}`;
};

// Manejo del cambio de input de moneda, guarda solo el número
const handleMontoChange = (e, setStateFunction) => {
    const cleanValue = e.target.value.replace(/[^0-9]/g, '');
    setStateFunction(cleanValue);
};

// Manejo del cambio de input de fecha (dd/mm/aaaa)
const handleFechaChange = (e, setStateFunction) => {
    let value = e.target.value.replace(/[^0-9]/g, '');

    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

    setStateFunction(value);
};


// -------------------------------------------------------------------
// 3. Componente Principal: Agregar Póliza
// -------------------------------------------------------------------
export default function MigestionAgregarPoliza() {
    const navigate = useNavigate();
    const iconColor = '#4D9DE0';

    // 1. Estados del formulario de Póliza/Seguro
    const [nombreTitular, setNombreTitular] = useState('Eduardo Villamil');
    const [entidadFinanciera, setEntidadFinanciera] = useState('Selecciona la entidad');
    const [isEntidadDropdownOpen, setIsEntidadDropdownOpen] = useState(false);

    const [tipoSeguro, setTipoSeguro] = useState('Selecciona el tipo de seguro');
    const [isTipoSeguroDropdownOpen, setIsTipoSeguroDropdownOpen] = useState(false);

    const [numeroReferencia, setNumeroReferencia] = useState('');
    const [valorAsegurado, setValorAsegurado] = useState(''); // Monto

    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaExpiracion, setFechaExpiracion] = useState('');

    // Estado para las coberturas (multi-select)
    const [coberturas, setCoberturas] = useState([]);
    const [estado, setEstado] = useState('Activa'); // Botones: Activa, Vencida, En renovación

    // Opciones para Dropdowns y Checkboxes
    const entidadesOptions = ['Sura', 'Allianz', 'Seguros Bolívar', 'Mapfre', 'Axa Colpatria', 'Otros'];
    const tiposSeguroOptions = ['Vida', 'Salud', 'Vehículo', 'Hogar', 'Educación', 'Otros'];
    const coberturasOptions = ['Fallecimiento', 'Auxilio Exequial', 'Incapacidad Total', 'Daños Materiales', 'Responsabilidad Civil', 'Asistencia Jurídica'];

    // 2. Lógica para Checkboxes de Coberturas
    const handleCoberturaChange = (cobertura) => {
        setCoberturas(prev =>
            prev.includes(cobertura)
                ? prev.filter(c => c !== cobertura)
                : [...prev, cobertura]
        );
    };

    // 3. Función de Guardado
    const handleSaveProduct = () => {

        // 1. Validación de campos obligatorios
        if (
            entidadFinanciera === 'Selecciona la entidad' ||
            tipoSeguro === 'Selecciona el tipo de seguro' ||
            !numeroReferencia ||
            !valorAsegurado ||
            fechaInicio.length !== 10 ||
            fechaExpiracion.length !== 10
        ) {
            console.error('Por favor, completa todos los campos requeridos y verifica el formato de las fechas (dd/mm/aaaa).');
            // Nota: En una app real, usarías un modal o mensaje en el UI en lugar de alert().
            return;
        }

        const nuevoProducto = {
            id: Date.now(),
            titular: nombreTitular,
            tipo: 'Póliza', // ⭐ Tipo de producto: Póliza/Seguro
            fechaCreacion: new Date().toISOString(),
            entidad: entidadFinanciera,
            tipoProducto: tipoSeguro,
            numeroReferencia: numeroReferencia,
            estado: estado,

            // Propiedades específicas de Seguros
            valorAsegurado: Number(valorAsegurado),
            fechaInicio: fechaInicio,
            fechaExpiracion: fechaExpiracion,
            coberturas: coberturas, // Array de strings
        };


        // 2. Guardar en localStorage
        const productosExistentesJSON = localStorage.getItem('productos_gestion');
        const productosExistentes = productosExistentesJSON ? JSON.parse(productosExistentesJSON) : [];

        productosExistentes.push(nuevoProducto);

        try {
            localStorage.setItem('productos_gestion', JSON.stringify(productosExistentes));
            console.log(`¡Póliza de ${tipoSeguro} en ${entidadFinanciera} guardada exitosamente!`);

            // 3. Navegar a la vista de Mis Seguros
            navigate('/Migestion-polizasyseguros');

        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            // Nota: En una app real, usarías un modal o mensaje en el UI.
        }
    };


    return (
        <div className='agregar-producto-container'>
            <div className='top-barcuenta'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-polizasyseguros")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Agregar Póliza/Seguro</span>
            </div>

            <div className='agregar-producto-form-card'>
                {/* 1. Input Nombre del titular */}
                <label className='form-label'>Nombre del titular</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={nombreTitular}
                    onChange={(e) => setNombreTitular(e.target.value)}
                    placeholder='Nombre del titular'
                />

                {/* 2. Dropdown Entidad aseguradora */}
                <CustomDropdown
                    label="Entidad aseguradora"
                    value={entidadFinanciera}
                    options={entidadesOptions}
                    isOpen={isEntidadDropdownOpen}
                    setIsOpen={setIsEntidadDropdownOpen}
                    setValue={setEntidadFinanciera}
                />

                {/* 3. Dropdown Tipo de seguro */}
                <CustomDropdown
                    label="Tipo de seguro"
                    value={tipoSeguro}
                    options={tiposSeguroOptions}
                    isOpen={isTipoSeguroDropdownOpen}
                    setIsOpen={setIsTipoSeguroDropdownOpen}
                    setValue={setTipoSeguro}
                />

                {/* 4. Input Número de referencia */}
                <label className='form-label'>Número de referencia de la póliza</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={numeroReferencia}
                    onChange={(e) => setNumeroReferencia(e.target.value)}
                    placeholder='Ej: 123456789'
                />

                {/* 5. Checkboxs Coberturas incluidas */}
                <label className='form-label'>Coberturas incluidas</label>
                <div className='checkbox-group-container' style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {coberturasOptions.map((cobertura, index) => (
                        <label key={index} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1rem', color: '#444' }}>
                            <input
                                type="checkbox"
                                checked={coberturas.includes(cobertura)}
                                onChange={() => handleCoberturaChange(cobertura)}
                                style={{ marginRight: '10px', width: '18px', height: '18px' }}
                            />
                            {cobertura}
                        </label>
                    ))}
                </div>


                {/* 6. Inputs Fecha de inicio y fecha de expiración */}
                <div className='cosiitofechas' >
                    <div style={{ flex: 1 }}>
                        <label className='form-label'>Fecha de inicio </label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={fechaInicio}
                            onChange={(e) => handleFechaChange(e, setFechaInicio)}
                            maxLength={10}
                            placeholder='01/01/2024'
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label className='form-label'>Fecha de expiración</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={fechaExpiracion}
                            onChange={(e) => handleFechaChange(e, setFechaExpiracion)}
                            maxLength={10}
                            placeholder='01/01/2025'
                        />
                    </div>
                </div>

                {/* 7. Input Valor asegurado */}
                <label className='form-label'>Valor asegurado</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={formatCurrency(valorAsegurado)}
                    onChange={(e) => handleMontoChange(e, setValorAsegurado)}
                    placeholder='$40.000.000'
                />

                {/* 8. Botones Estado */}
                <label className='form-label'>Estado de la póliza</label>
                <div className='estado-buttons-containerS'>
                    <button
                        className={`estado-btnS ${estado === 'Activa' ? 'active' : ''}`}
                        onClick={() => setEstado('Activa')}
                    >
                        Activa
                    </button>
                    <button
                        className={`estado-btnS ${estado === 'Vencida' ? 'active' : ''}`}
                        onClick={() => setEstado('Vencida')}
                    >
                        Vencida
                    </button>
                    <button
                        className={`estado-btnS ${estado === 'En renovación' ? 'active' : ''}`}
                        onClick={() => setEstado('En renovación')}
                    >
                        En renovación
                    </button>
                </div>

            </div>

            {/* BOTÓN GUARDAR PRODUCTO */}
            <button
                className='guardar-producto-btn'
                onClick={handleSaveProduct}
            >
                Guardar Póliza/Seguro ({tipoSeguro})
            </button>
        </div>
    );
}