import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowDropDown } from 'react-icons/md';
// Reutilizamos el CSS existente
import '../Cuentas/AgregarCuenta.css';

// Componente para la página de agregar Inversión
export default function MigestionAgregarInversion() {
    const navigate = useNavigate();
    const iconColor = '#4D9DE0';

    // 1. Estados Fijos/Comunes (Adaptados)
    const [nombreTitular, setNombreTitular] = useState('Eduardo Villamil');
    const [entidadFinanciera, setEntidadFinanciera] = useState('Selecciona la entidad');
    const [isEntidadDropdownOpen, setIsEntidadDropdownOpen] = useState(false);

    // ⭐ ESTADO CLAVE: Ahora es el tipo de Inversión
    const [tipoInversion, setTipoInversion] = useState('CDT'); // Valor por defecto
    const [isTipoInversionDropdownOpen, setIsTipoInversionDropdownOpen] = useState(false);

    const [numeroReferencia, setNumeroReferencia] = useState('');
    const [estado, setEstado] = useState('Activa');

    // ⭐ ESTADOS DEL DEPÓSITO A TÉRMINO (Reutilizados para la Inversión)
    const [montoInversion, setMontoInversion] = useState(''); // Monto de la Inversión
    const [fechaApertura, setFechaApertura] = useState(''); // Fecha de Apertura/Constitución
    const [fechaVencimiento, setFechaVencimiento] = useState(''); // Fecha de Vencimiento/Periodo
    const [tasaPactada, setTasaPactada] = useState('EA');
    const [valorTasa, setValorTasa] = useState('');
    const [plazoInversion, setPlazoInversion] = useState('Selecciona el plazo');
    const [isPlazoDropdownOpen, setIsPlazoDropdownOpen] = useState(false);
    const [modalidadInversion, setModalidadInversion] = useState('Reinversión automatica'); // Adaptado el nombre


    // Opciones
    const entidadesOptions = ['Bancolombia', 'BBVA', 'AV Villas', 'Davivienda', 'Banco de Bogotá', 'Fiduciaria X', 'Comisionista Y'];

    // ⭐ CAMBIO CLAVE: Opciones de Inversión
    const tiposInversionOptions = ['CDT', 'Fondo de inversión', 'Cartera Colectiva'];

    const plazoOptions = ['30 dias', '60 dias', '90 dias', '180 dias', '360 dias', 'Indefinido'];


    // 2. Funciones de Formato y Manejo (Copiadas del código original)
    const formatCurrency = (value) => {
        if (!value) return '';
        const cleanValue = String(value).replace(/[^0-9]/g, '');
        const number = parseInt(cleanValue, 10);
        if (isNaN(number)) return '';
        return `$${number.toLocaleString('es-CO')}`;
    };

    const formatTasaValue = (value) => {
        if (!value) return '';
        let cleanValue = value.replace(/[^0-9.]/g, '');
        if (cleanValue.includes('.')) {
            const parts = cleanValue.split('.');
            cleanValue = parts[0] + '.' + parts[1].slice(0, 2);
        }
        return `${cleanValue}%`;
    };

    const handleMontoChange = (e, setStateFunction) => {
        const cleanValue = e.target.value.replace(/[^0-9]/g, '');
        setStateFunction(cleanValue);
    };

    const handleFechaChange = (e, setStateFunction) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
        setStateFunction(value);
    };

    // 3. Función de Guardado Adaptada
    const handleSaveProduct = () => {
        const inversionTipo = tipoInversion;

        // 1. Validación (se ajusta la validación del DT para que sea la base)
        if (entidadFinanciera === 'Selecciona la entidad' || !inversionTipo || !numeroReferencia ||
            !montoInversion || !fechaApertura || fechaApertura.length !== 10 ||
            !valorTasa || plazoInversion === 'Selecciona el plazo') {

            alert('Por favor, completa todos los campos requeridos para la Inversión.');
            return;
        }

        // La fecha de vencimiento es opcional si el plazo es 'Indefinido', sino es requerida.
        if(plazoInversion !== 'Indefinido' && (!fechaVencimiento || fechaVencimiento.length !== 10)) {
            alert('Por favor, ingresa la Fecha de vencimiento o selecciona Plazo: Indefinido.');
            return;
        }

        let nuevoProducto = {
            id: Date.now(),
            titular: nombreTitular,
            // ⭐ CAMBIO CLAVE: Tipo de producto guardado
            tipo: 'Inversión',
            fechaCreacion: new Date().toISOString(),
            entidad: entidadFinanciera,
            tipoProducto: inversionTipo, // Usamos 'tipoProducto' para ser consistentes con la lista de Inversiones
            numeroReferencia: numeroReferencia,
            estado: estado,

            // Campos de Inversión (antes DT)
            monto: Number(montoInversion),
            fechaApertura: fechaApertura,
            fechaVencimiento: plazoInversion === 'Indefinido' ? 'N/A' : fechaVencimiento,
            tasaPactadaTipo: tasaPactada,
            valorTasa: parseFloat(valorTasa.replace(/[^0-9.]/g, '')),
            plazo: plazoInversion,
            modalidad: modalidadInversion,
        };

        // 2. Guardar en localStorage
        const productosExistentesJSON = localStorage.getItem('productos_gestion');
        const productosExistentes = productosExistentesJSON ? JSON.parse(productosExistentesJSON) : [];

        productosExistentes.push(nuevoProducto);

        try {
            localStorage.setItem('productos_gestion', JSON.stringify(productosExistentes));
            alert(`¡${inversionTipo} en ${entidadFinanciera} guardada exitosamente!`);

            // ⭐ CAMBIO DE RUTA: Redirige a Mis Inversiones
            navigate('/Migestion-misinversiones');

        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            alert("Hubo un error al intentar guardar el producto.");
        }
    };

    // 4. Componente reusable para Dropdown (Se mantiene intacto)
    const CustomDropdown = ({ label, value, options, isOpen, setIsOpen, setValue }) => (
        <div className='detallesec'>
            <label className='form-label'>{label}</label>
            <div
                className='dropdown-select-agregar'
                onClick={() => {
                    setIsOpen(!isOpen);
                    // Lógica para cerrar otros dropdowns
                    if (label === 'Entidad financiera') {
                        setIsTipoInversionDropdownOpen(false);
                        setIsPlazoDropdownOpen(false);
                    } else if (label === 'Tipo de inversión') { // Cambiado el label
                        setIsEntidadDropdownOpen(false);
                        setIsPlazoDropdownOpen(false);
                    } else if (label === 'Tipo de plazo') {
                        setIsEntidadDropdownOpen(false);
                        setIsTipoInversionDropdownOpen(false);
                    }
                }}
            >
                <span className={value.includes('Selecciona') ? 'placeholder' : ''}>
                    {value}
                </span>
                <MdArrowDropDown
                    size={28}
                    color="#A9A9A9"
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
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


    // 5. Renderizado
    return (
        <div className='agregar-producto-container'>
            <div className='top-barcuenta'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-misinversiones")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Agregar Inversión ({tipoInversion})</span>
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

                {/* Entidad financiera (con opciones ampliadas) */}
                <CustomDropdown
                    label="Entidad financiera"
                    value={entidadFinanciera}
                    options={entidadesOptions}
                    isOpen={isEntidadDropdownOpen}
                    setIsOpen={setIsEntidadDropdownOpen}
                    setValue={setEntidadFinanciera}
                />

                {/* Tipo de Inversión (Dropdown cambiado) */}
                <CustomDropdown
                    label="Tipo de inversión"
                    value={tipoInversion}
                    options={tiposInversionOptions}
                    isOpen={isTipoInversionDropdownOpen}
                    setIsOpen={setIsTipoInversionDropdownOpen}
                    setValue={setTipoInversion}
                />

                {/* ------------------------------------------------------------------- */}
                {/* ⭐ CAMPOS DE LA INVERSIÓN (Basados en el DT) ⭐ */}
                {/* ------------------------------------------------------------------- */}

                {/* Número de referencia / Certificado */}
                <label className='form-label'>Número de referencia o Certificado</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={numeroReferencia}
                    onChange={(e) => setNumeroReferencia(e.target.value)}
                    placeholder='Ej: Certificado 00123'
                />

                {/* Monto */}
                <label className='form-label'>Monto invertido</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={formatCurrency(montoInversion)}
                    onChange={(e) => handleMontoChange(e, setMontoInversion)}
                    placeholder='$10.000.000'
                />

                {/* Fechas */}
                <label className='form-label'>Fecha de constitución/apertura (dd/mm/aaaa)</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={fechaApertura}
                    onChange={(e) => handleFechaChange(e, setFechaApertura)}
                    maxLength={10}
                    placeholder='01/01/2024'
                />

                {/* Fecha de vencimiento (Visible si el plazo NO es Indefinido) */}
                {plazoInversion !== 'Indefinido' && (
                    <>
                        <label className='form-label'>Fecha de vencimiento (dd/mm/aaaa)</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={fechaVencimiento}
                            onChange={(e) => handleFechaChange(e, setFechaVencimiento)}
                            maxLength={10}
                            placeholder='01/01/2025'
                        />
                    </>
                )}


                {/* Tasa Pactada (EA/Nominal) */}
                <label className='form-label'>Tasa pactada</label>
                <div className='tasa-checkbox-container'>
                    <button
                        className={`tasa-btn ${tasaPactada === 'EA' ? 'active' : ''}`}
                        onClick={() => setTasaPactada('EA')}
                    >
                        EA
                    </button>
                    <button
                        className={`tasa-btn ${tasaPactada === 'Nominal' ? 'active' : ''}`}
                        onClick={() => setTasaPactada('Nominal')}
                    >
                        Nominal
                    </button>
                </div>

                {/* Valor de Tasa */}
                <label className='form-label'>Valor de Tasa</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={formatTasaValue(valorTasa)}
                    onChange={(e) => {
                        const cleanValue = e.target.value.replace(/%/g, '');
                        setValorTasa(cleanValue);
                    }}
                    placeholder='9.20%'
                />

                {/* Tipo de Plazo (Añadimos 'Indefinido') */}
                <CustomDropdown
                    label="Tipo de plazo"
                    value={plazoInversion}
                    options={plazoOptions}
                    isOpen={isPlazoDropdownOpen}
                    setIsOpen={setIsPlazoDropdownOpen}
                    setValue={setPlazoInversion}
                />

                {/* Modalidad */}
                <label className='form-label'>Modalidad</label>
                <div className='modalidad-buttons-container'>
                    <button
                        className={`modalidad-btn ${modalidadInversion === 'Renovacion automatica' ? 'active' : ''}`}
                        onClick={() => setModalidadInversion('Renovacion automatica')}
                    >
                        Renovación automática
                    </button>
                    <button
                        className={`modalidad-btn ${modalidadInversion === 'Ultimo periodo' ? 'active' : ''}`}
                        onClick={() => setModalidadInversion('Ultimo periodo')}
                    >
                        Último periodo
                    </button>
                </div>

                {/* ------------------------------------------------------------------- */}

                {/* Estado (Común a todas) */}
                <label className='form-label'>Estado</label>
                <div className='estado-buttons-container'>
                    <button
                        className={`estado-btn ${estado === 'Activa' ? 'active' : ''}`}
                        onClick={() => setEstado('Activa')}
                    >
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
            <button
                className='guardar-producto-btn'
                onClick={handleSaveProduct}
            >
                Guardar nueva inversión ({tipoInversion})
            </button>
        </div>
    );
}