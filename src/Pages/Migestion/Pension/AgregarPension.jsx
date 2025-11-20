import React, { useState, useCallback } from 'react';
// ✅ IMPORTACIÓN REAL de React Router
import { useNavigate } from 'react-router-dom';
// Eliminada la importación de 'react-icons/md' para evitar el error de compilación.

// Icono SVG de flecha hacia abajo (simula MdArrowDropDown)
const DropdownIcon = ({ isOpen }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#A9A9A9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
    >
        <path d="m6 9 6 6 6-6"/>
    </svg>
);


import './AgregarPension.css';
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
            <DropdownIcon isOpen={isOpen} />
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
// 2. Componente Principal: App (Agregar Pensión)
// -------------------------------------------------------------------
export default function App() {
    const navigate = useNavigate();
    const iconColor = '#4D9DE0';

    // === ESTADOS GENERALES ===
    const [nombreTitular, setNombreTitular] = useState('Eduardo Villamil');

    // Dropdowns
    const tipoPensionOptions = ['Fondo obligatorio', 'Fondo voluntario', 'BEPS']; // Ajustado
    const [tipoPension, setTipoPension] = useState('Selecciona el tipo de pensión');
    const [isTipoPensionDropdownOpen, setIsTipoPensionDropdownOpen] = useState(false);

    const entidadesPensionOptions = ['Porvenir', 'Colpensiones', 'Colfondos', 'Skandia', 'Sura'];
    const [entidadPension, setEntidadPension] = useState('Selecciona la entidad');
    const [isEntidadDropdownOpen, setIsEntidadDropdownOpen] = useState(false);

    // Inputs Comunes/Base
    const [numeroReferencia, setNumeroReferencia] = useState('');
    const [valorAcumulado, setValorAcumulado] = useState(''); // Monto sin formato

    // Botones Comunes/Base
    const [estado, setEstado] = useState('Activa'); // Estado general

    // === ESTADOS ESPECÍFICOS DE FONDO OBLIGATORIO ===
    const cotizanteOptions = ['Dependiente', 'Independiente', 'Otro'];
    const [tipoCotizante, setTipoCotizante] = useState('Selecciona el tipo de cotizante');
    const [isCotizanteDropdownOpen, setIsCotizanteDropdownOpen] = useState(false);
    const [regimen, setRegimen] = useState('RAIS'); // RAIS o RPM
    const [fechaUltimoAporte, setFechaUltimoAporte] = useState(''); // Específico de Obligatorio (dd/mm/aaaa)

    // === ESTADOS ESPECÍFICOS DE FONDO VOLUNTARIO / BEPS ===
    const [aportesMensuales, setAportesMensuales] = useState(''); // Solo Voluntario (Monto sin formato)
    const [fechaVinculacion, setFechaVinculacion] = useState(''); // Voluntario y BEPS (dd/mm/aaaa)
    const [tipoTasa, setTipoTasa] = useState('EA'); // Solo Voluntario (EA o Nominal)
    const [rentabilidad, setRentabilidad] = useState(''); // Solo Voluntario (valor en %)

    // -------------------------------------------------------------------
    // 3. Funciones de Formato y Manejo
    // -------------------------------------------------------------------

    // Formato de Moneda (COP)
    const formatCurrency = (value) => {
        if (!value) return '';
        const cleanValue = String(value).replace(/[^0-9]/g, '');
        const number = parseInt(cleanValue, 10);
        if (isNaN(number)) return '';

        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Manejo de Inputs de Monto (limpieza de caracteres y actualización de estado)
    const handleMontoChange = (e, setStateFunction) => {
        const cleanValue = e.target.value.replace(/[^0-9]/g, '');
        setStateFunction(cleanValue);
    };

    // Manejo de Inputs de Fecha (formato dd/mm/aaaa)
    const handleFechaChange = (e, setStateFunction) => {
        let value = e.target.value.replace(/[^0-9]/g, '');

        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

        setStateFunction(value);
    };

    // Manejo de Input de Porcentaje (limpieza de caracteres y actualización de estado)
    const handleRentabilidadChange = (e) => {
        let value = e.target.value.replace(/[^0-9,.]/g, ''); // Permite números, comas y puntos

        // Formato básico para 7,8% o 7.8%
        if (value.includes(',')) value = value.replace(',', '.');

        setRentabilidad(value);
    };


    // -------------------------------------------------------------------
    // 4. Función de Guardado
    // -------------------------------------------------------------------
    const handleSaveProduct = useCallback(() => {

        // 1. Validación de campos comunes
        if (
            tipoPension === 'Selecciona el tipo de pensión' ||
            entidadPension === 'Selecciona la entidad' ||
            !numeroReferencia ||
            !valorAcumulado
        ) {
            console.error('ERROR: Por favor, completa los campos comunes (Tipo de Pensión, Entidad, Referencia y Valor Acumulado).');
            return;
        }

        let nuevoProducto = {
            id: Date.now(),
            titular: nombreTitular,
            tipo: 'Pensión',
            fechaCreacion: new Date().toISOString(),
            tipoProducto: tipoPension,
            entidad: entidadPension,
            numeroReferencia: numeroReferencia,
            valorAcumulado: Number(valorAcumulado),
            estado: estado,
        };

        // 2. Validación y asignación de campos específicos
        if (tipoPension === 'Fondo obligatorio') {
            if (tipoCotizante === 'Selecciona el tipo de cotizante' || !regimen || fechaUltimoAporte.length !== 10) {
                console.error('ERROR: Por favor, completa todos los campos requeridos para Fondo Obligatorio.');
                return;
            }
            nuevoProducto = {
                ...nuevoProducto,
                regimen: regimen,
                tipoCotizante: tipoCotizante,
                fechaUltimoAporte: fechaUltimoAporte,
            };
        } else if (tipoPension === 'Fondo voluntario') {
            if (!aportesMensuales || fechaVinculacion.length !== 10 || !rentabilidad) {
                console.error('ERROR: Por favor, completa todos los campos requeridos para Fondo Voluntario.');
                return;
            }
            nuevoProducto = {
                ...nuevoProducto,
                aportesMensuales: Number(aportesMensuales),
                fechaVinculacion: fechaVinculacion,
                tipoTasa: tipoTasa,
                rentabilidad: Number(rentabilidad),
            };
        } else if (tipoPension === 'BEPS') {
            if (fechaVinculacion.length !== 10) {
                console.error('ERROR: Por favor, completa la Fecha de vinculación para BEPS.');
                return;
            }
            nuevoProducto = {
                ...nuevoProducto,
                fechaVinculacion: fechaVinculacion,
            };
        }


        // 3. Guardar en localStorage (Mantenemos la lógica de persistencia)
        const productosExistentesJSON = localStorage.getItem('productos_gestion');
        const productosExistentes = productosExistentesJSON ? JSON.parse(productosExistentesJSON) : [];

        productosExistentes.push(nuevoProducto);

        try {
            localStorage.setItem('productos_gestion', JSON.stringify(productosExistentes));
            console.log(`¡Pensión de tipo "${nuevoProducto.tipoProducto}" en ${nuevoProducto.entidad} guardada exitosamente!`);

            // ✅ NAVEGA a la ruta de pensiones
            navigate('/Migestion-pensiones');

        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            console.error("Hubo un error al intentar guardar el producto.");
        }
    }, [
        nombreTitular, tipoPension, entidadPension, numeroReferencia, valorAcumulado, estado, navigate,
        // Específicos de Obligatorio
        tipoCotizante, regimen, fechaUltimoAporte,
        // Específicos de Voluntario/BEPS
        aportesMensuales, fechaVinculacion, tipoTasa, rentabilidad
    ]);


    // -------------------------------------------------------------------
    // 5. Componente de Renderizado Condicional
    // -------------------------------------------------------------------
    const renderSpecificFields = () => {
        if (tipoPension === 'Fondo obligatorio') {
            return (
                <>
                    {/* Tipo de régimen (RAIS, RPM) */}
                    <label className='form-label'>Tipo de régimen</label>
                    <div className='tasa-checkbox-container'>
                        <button
                            className={`tasa-btn ${regimen === 'RAIS' ? 'active' : ''}`}
                            onClick={() => setRegimen('RAIS')}
                        >
                            RAIS
                        </button>
                        <button
                            className={`tasa-btn ${regimen === 'RPM' ? 'active' : ''}`}
                            onClick={() => setRegimen('RPM')}
                        >
                            RPM
                        </button>
                    </div>

                    {/* Dropdown Tipo de cotizante */}
                    <CustomDropdown
                        label="Tipo de cotizante"
                        value={tipoCotizante}
                        options={cotizanteOptions}
                        isOpen={isCotizanteDropdownOpen}
                        setIsOpen={setIsCotizanteDropdownOpen}
                        setValue={setTipoCotizante}
                    />

                    {/* Fecha último aporte recibido */}
                    <label className='form-label'>Fecha último aporte recibido (dd/mm/aaaa)</label>
                    <input
                        type='text'
                        className='form-input-agregar'
                        value={fechaUltimoAporte}
                        onChange={(e) => handleFechaChange(e, setFechaUltimoAporte)}
                        maxLength={10}
                        placeholder='15/10/2024'
                    />
                </>
            );
        }

        if (tipoPension === 'Fondo voluntario') {
            return (
                <>
                    {/* Aportes Mensuales */}
                    <label className='form-label'>Aportes Mensuales</label>
                    <input
                        type='text'
                        className='form-input-agregar'
                        value={formatCurrency(aportesMensuales)}
                        onChange={(e) => handleMontoChange(e, setAportesMensuales)}
                        placeholder='Ej: $300.000'
                    />

                    {/* Fecha de vinculacion */}
                    <label className='form-label'>Fecha de vinculación (dd/mm/aaaa)</label>
                    <input
                        type='text'
                        className='form-input-agregar'
                        value={fechaVinculacion}
                        onChange={(e) => handleFechaChange(e, setFechaVinculacion)}
                        maxLength={10}
                        placeholder='01/01/2020'
                    />

                    {/* Botones de Tasa (EA, Nominal) */}
                    <label className='form-label'>Tasa (EA, Nominal)</label>
                    <div className='tasa-checkbox-container'>
                        <button
                            className={`tasa-btn ${tipoTasa === 'EA' ? 'active' : ''}`}
                            onClick={() => setTipoTasa('EA')}
                        >
                            EA
                        </button>
                        <button
                            className={`tasa-btn ${tipoTasa === 'Nominal' ? 'active' : ''}`}
                            onClick={() => setTipoTasa('Nominal')}
                        >
                            Nominal
                        </button>
                    </div>

                    {/* Rentabilidad */}
                    <label className='form-label'>Rentabilidad (en porcentaje)</label>
                    <div className='input-with-suffix'>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={rentabilidad}
                            onChange={handleRentabilidadChange}
                            placeholder='7,8'
                        />
                        <span className="suffix">%</span>
                    </div>
                </>
            );
        }

        if (tipoPension === 'BEPS') {
            return (
                <>
                    {/* Fecha de vinculacion */}
                    <label className='form-label'>Fecha de vinculación (dd/mm/aaaa)</label>
                    <input
                        type='text'
                        className='form-input-agregar'
                        value={fechaVinculacion}
                        onChange={(e) => handleFechaChange(e, setFechaVinculacion)}
                        maxLength={10}
                        placeholder='01/01/2020'
                    />
                </>
            );
        }

        return null; // No renderizar nada si el tipo de pensión no está seleccionado
    };


    // -------------------------------------------------------------------
    // 6. JSX Principal (Estructura de la Vista)
    // -------------------------------------------------------------------
    return (
        <div className='agregar-producto-container'>

            <div className='top-barcuenta'>
                {/* ✅ FLECHA DE RETROCESO FUNCIONAL (SVG reemplazando MdArrowBack) */}
                <span className='back-arrow' onClick={() => navigate("/Migestion-pensiones")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
                </span>
                <span className='top-bar-title'>Agregar Pensión</span>
            </div>

            <div className='agregar-producto-form-card'>
                {/* 1. Input Nombre del titular (Común) */}
                <label className='form-label'>Nombre del titular</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={nombreTitular}
                    onChange={(e) => setNombreTitular(e.target.value)}
                    placeholder='Nombre del titular'
                />

                {/* 2. Dropdown Tipo de pensión (Común/Controlador) */}
                <CustomDropdown
                    label="Tipo de pensión"
                    value={tipoPension}
                    options={tipoPensionOptions}
                    isOpen={isTipoPensionDropdownOpen}
                    setIsOpen={setIsTipoPensionDropdownOpen}
                    setValue={setTipoPension}
                />

                {/* 3. Dropdown Entidad (Común) */}
                <CustomDropdown
                    label="Entidad"
                    value={entidadPension}
                    options={entidadesPensionOptions}
                    isOpen={isEntidadDropdownOpen}
                    setIsOpen={setIsEntidadDropdownOpen}
                    setValue={setEntidadPension}
                />

                {/* 4. Input Número de referencia (Común) */}
                <label className='form-label'>Número de referencia</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={numeroReferencia}
                    onChange={(e) => setNumeroReferencia(e.target.value)}
                    placeholder='Ej: 987654321'
                />

                {/* 5. Input Valor acumulado (Común) */}
                <label className='form-label'>Valor acumulado</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={formatCurrency(valorAcumulado)}
                    onChange={(e) => handleMontoChange(e, setValorAcumulado)}
                    placeholder='$4.000.000'
                />

                {/* 6. CAMPOS ESPECÍFICOS SEGÚN EL TIPO DE PENSIÓN */}
                {renderSpecificFields()}


                {/* 7. Botones Estado (Activa, Traslado en tramite) (Común) */}
                <label className='form-label'>Estado</label>
                <div className='estado-buttons-containerM'>
                    <button
                        className={`estado-btnM ${estado === 'Activa' ? 'active' : ''}`}
                        onClick={() => setEstado('Activa')}
                    >
                        Activa
                    </button>
                    <button
                        className={`estado-btnM ${estado === 'Traslado en trámite' ? 'active' : ''}`}
                        onClick={() => setEstado('Traslado en trámite')}
                    >
                        Traslado en trámite
                    </button>
                </div>
            </div>

            {/* BOTÓN GUARDAR PRODUCTO */}
            <button
                className='guardar-producto-btn'
                onClick={handleSaveProduct}
                disabled={tipoPension === 'Selecciona el tipo de pensión'}
            >
                Guardar nueva pensión ({tipoPension !== 'Selecciona el tipo de pensión' ? tipoPension : '...'})
            </button>
        </div>
    );
}