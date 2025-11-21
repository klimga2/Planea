import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowDropDown } from 'react-icons/md';
import './AgregarCuenta.css';

// Componente para la página de agregar producto, ahora fijo para Cuentas
export default function MigestionAgregarCuentaAhorro() {
    const navigate = useNavigate();
    const iconColor = '#4D9DE0';

    // 1. Estados Fijos/Comunes
    const [nombreTitular, setNombreTitular] = useState('Eduardo Villamil');
    const [entidadFinanciera, setEntidadFinanciera] = useState('Selecciona la entidad');
    const [isEntidadDropdownOpen, setIsEntidadDropdownOpen] = useState(false);

    // ⭐ El estado clave para la lógica condicional:
    const [tipoCuenta, setTipoCuenta] = useState('Ahorro');
    const [isTipoCuentaDropdownOpen, setIsTipoCuentaDropdownOpen] = useState(false);

    const [numeroReferencia, setNumeroReferencia] = useState('');
    const [estado, setEstado] = useState('Activa');

    // ⭐ ESTADOS CONDICIONALES EXISTENTES
    const [cupoSobregiro, setCupoSobregiro] = useState(''); // Para 'Corriente'
    const [montoDeposito, setMontoDeposito] = useState(''); // Para 'Depósito electrónico'
    const [fechaApertura, setFechaApertura] = useState(''); // Para 'Depósito electrónico'

    // ⭐ ESTADOS PARA 'DEPÓSITO A TÉRMINO'
    const [montoDT, setMontoDT] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [tasaPactada, setTasaPactada] = useState('EA'); // EA o Nominal
    const [valorTasa, setValorTasa] = useState(''); // Valor en porcentaje (Ej: 9.20)
    const [plazoDT, setPlazoDT] = useState('Selecciona el plazo');
    const [isPlazoDropdownOpen, setIsPlazoDropdownOpen] = useState(false);
    const [modalidadDT, setModalidadDT] = useState('Renovacion automatica'); // Renovación o Último periodo


    // Opciones
    const entidadesOptions = ['Bancolombia', 'BBVA', 'AV Villas', 'Davivienda', 'Banco de Bogotá'];
    const tiposCuentaOptions = ['Ahorro', 'Corriente', 'Depósito electrónico', 'Depósito a término'];
    const plazoOptions = ['30 dias', '60 dias', '90 dias', '180 dias', '360 dias'];


    // 2. Funciones de Formato y Manejo

    // Helper para formatear monto a formato moneda ($X.XXX.XXX)
    const formatCurrency = (value) => {
        if (!value) return '';
        const cleanValue = String(value).replace(/[^0-9]/g, '');
        const number = parseInt(cleanValue, 10);
        if (isNaN(number)) return '';
        return `$${number.toLocaleString('es-CO')}`;
    };

    // Helper para formatear valor de tasa a porcentaje (X.XX%)
    const formatTasaValue = (value) => {
        if (!value) return '';
        // Permite números y un solo punto o coma, limita a dos decimales
        let cleanValue = value.replace(/[^0-9.]/g, '');
        if (cleanValue.includes('.')) {
            const parts = cleanValue.split('.');
            cleanValue = parts[0] + '.' + parts[1].slice(0, 2);
        }
        return `${cleanValue}%`;
    };

    // Maneja el cambio de monto y lo formatea (para Cupo y Monto Depósito)
    const handleMontoChange = (e, setStateFunction) => {
        const cleanValue = e.target.value.replace(/[^0-9]/g, '');
        setStateFunction(cleanValue);
    };

    // Maneja y formatea cualquier fecha a dd/mm/aaaa
    const handleFechaChange = (e, setStateFunction) => {
        let value = e.target.value.replace(/[^0-9]/g, ''); // Solo números

        // Aplica el formato dd/mm/aaaa
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

        setStateFunction(value);
    };

    // Función de guardado centralizada
    const handleSaveProduct = () => {
        const cuentaTipo = tipoCuenta;

        // 1. Validación común
        if (entidadFinanciera === 'Selecciona la entidad' || !cuentaTipo || !numeroReferencia) {
            alert('Por favor, completa los campos básicos: Entidad, Tipo de cuenta y Número de referencia.');
            return;
        }

        let nuevoProducto = {
            id: Date.now(),
            titular: nombreTitular,
            tipo: 'Cuenta Bancaria',
            fechaCreacion: new Date().toISOString(),
            entidad: entidadFinanciera,
            tipoCuenta: cuentaTipo,
            numeroReferencia: numeroReferencia,
            estado: estado,
        };

        // 2. Validación y adición de campos condicionales
        if (cuentaTipo === 'Corriente') {
            if (!cupoSobregiro) {
                alert('Para la Cuenta Corriente, debes ingresar el Cupo de sobregiro.');
                return;
            }
            nuevoProducto.cupoSobregiro = Number(cupoSobregiro);
        } else if (cuentaTipo === 'Depósito electrónico') {
            if (!montoDeposito || !fechaApertura || fechaApertura.length !== 10) {
                alert('Para el Depósito Electrónico, debes ingresar el Monto y la Fecha de apertura (dd/mm/aaaa).');
                return;
            }
            nuevoProducto.montoInicial = Number(montoDeposito);
            nuevoProducto.fechaApertura = fechaApertura;
        } else if (cuentaTipo === 'Depósito a término') {
            // Validación para Depósito a Término (D.T.)
            if (!montoDT || !fechaApertura || fechaApertura.length !== 10 || !fechaVencimiento || fechaVencimiento.length !== 10 || !valorTasa || plazoDT === 'Selecciona el plazo') {
                alert('Por favor, completa todos los campos requeridos para el Depósito a Término.');
                return;
            }

            nuevoProducto = {
                ...nuevoProducto,
                monto: Number(montoDT),
                fechaApertura: fechaApertura,
                fechaVencimiento: fechaVencimiento,
                tasaPactadaTipo: tasaPactada,
                valorTasa: parseFloat(valorTasa.replace(/[^0-9.]/g, '')), // Limpia el porcentaje para guardar
                plazo: plazoDT,
                modalidad: modalidadDT,
            };
        }

        // 3. Guardar en localStorage
        const productosExistentesJSON = localStorage.getItem('productos_gestion');
        const productosExistentes = productosExistentesJSON ? JSON.parse(productosExistentesJSON) : [];

        productosExistentes.push(nuevoProducto);

        try {
            localStorage.setItem('productos_gestion', JSON.stringify(productosExistentes));
            alert(`¡${cuentaTipo} en ${entidadFinanciera} guardada exitosamente!`);

            // ⭐ CAMBIO REALIZADO AQUÍ ⭐
            navigate('/Migestion-miscuentas');

        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            alert("Hubo un error al intentar guardar el producto.");
        }
    };

    // 3. Componente reusable para Dropdown (se mantiene)
    const CustomDropdown = ({ label, value, options, isOpen, setIsOpen, setValue }) => (
        <div className='detallesec'>
            <label className='form-label'>{label}</label>
            <div
                className='dropdown-select-agregar'
                onClick={() => {
                    setIsOpen(!isOpen);
                    // Lógica para cerrar otros dropdowns
                    if (label === 'Entidad financiera') {
                        setIsTipoCuentaDropdownOpen(false);
                        setIsPlazoDropdownOpen(false);
                    } else if (label === 'Tipo de cuenta') {
                        setIsEntidadDropdownOpen(false);
                        setIsPlazoDropdownOpen(false);
                    } else if (label === 'Tipo de plazo') {
                        setIsEntidadDropdownOpen(false);
                        setIsTipoCuentaDropdownOpen(false);
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


    return (
        <div className='agregar-producto-container'>
            <div className='top-barcuenta'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-miscuentas")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Agregar Cuenta ({tipoCuenta})</span>
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
                    label="Entidad financiera"
                    value={entidadFinanciera}
                    options={entidadesOptions}
                    isOpen={isEntidadDropdownOpen}
                    setIsOpen={setIsEntidadDropdownOpen}
                    setValue={setEntidadFinanciera}
                />

                {/* Tipo de cuenta (Clave para la lógica condicional) */}
                <CustomDropdown
                    label="Tipo de cuenta"
                    value={tipoCuenta}
                    options={tiposCuentaOptions}
                    isOpen={isTipoCuentaDropdownOpen}
                    setIsOpen={setIsTipoCuentaDropdownOpen}
                    setValue={setTipoCuenta}
                />

                {/* ------------------------------------------------------------------- */}
                {/* ⭐ CAMPOS CONDICIONALES basados en tipoCuenta ⭐ */}
                {/* ------------------------------------------------------------------- */}

                {/* Número de referencia (Común, pero se gestiona para el D.T. en su bloque) */}
                {(tipoCuenta === 'Ahorro' || tipoCuenta === 'Corriente' || tipoCuenta === 'Depósito electrónico') && (
                    <>
                        <label className='form-label'>Número o referencia</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={numeroReferencia}
                            onChange={(e) => setNumeroReferencia(e.target.value)}
                            placeholder='Ej: 7291 3782 182'
                        />
                    </>
                )}


                {/* CASO: Cuenta Corriente (Añadir Cupo de sobregiro) */}
                {tipoCuenta === 'Corriente' && (
                    <>
                        <label className='form-label'>Cupo de sobregiro</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={formatCurrency(cupoSobregiro)}
                            onChange={(e) => handleMontoChange(e, setCupoSobregiro)}
                            placeholder='$4.000.000'
                        />
                    </>
                )}

                {/* CASO: Depósito electrónico (Añadir Monto y Fecha de apertura) */}
                {tipoCuenta === 'Depósito electrónico' && (
                    <>
                        <label className='form-label'>Monto</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={formatCurrency(montoDeposito)}
                            onChange={(e) => handleMontoChange(e, setMontoDeposito)}
                            placeholder='$820.500'
                        />

                        <label className='form-label'>Fecha de apertura (dd/mm/aaaa)</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={fechaApertura}
                            onChange={(e) => handleFechaChange(e, setFechaApertura)}
                            maxLength={10}
                            placeholder='01/01/2024'
                        />
                    </>
                )}

                {/* CASO: Depósito a término (Nuevos campos) */}
                {tipoCuenta === 'Depósito a término' && (
                    <>
                        {/* Número de referencia */}
                        <label className='form-label'>Número de referencia</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={numeroReferencia}
                            onChange={(e) => setNumeroReferencia(e.target.value)}
                            placeholder='Ej: Certificado 00123'
                        />

                        <label className='form-label'>Monto</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={formatCurrency(montoDT)}
                            onChange={(e) => handleMontoChange(e, setMontoDT)}
                            placeholder='$10.000.000'
                        />

                        {/* Fechas */}
                        <label className='form-label'>Fecha de apertura (dd/mm/aaaa)</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={fechaApertura}
                            onChange={(e) => handleFechaChange(e, setFechaApertura)}
                            maxLength={10}
                            placeholder='01/01/2024'
                        />
                        <label className='form-label'>Fecha de vencimiento (dd/mm/aaaa)</label>
                        <input
                            type='text'
                            className='form-input-agregar'
                            value={fechaVencimiento}
                            onChange={(e) => handleFechaChange(e, setFechaVencimiento)}
                            maxLength={10}
                            placeholder='01/01/2025'
                        />

                        {/* Tasa Pactada */}
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

                        {/* Tipo de Plazo */}
                        <CustomDropdown
                            label="Tipo de plazo"
                            value={plazoDT}
                            options={plazoOptions}
                            isOpen={isPlazoDropdownOpen}
                            setIsOpen={setIsPlazoDropdownOpen}
                            setValue={setPlazoDT}
                        />

                        {/* Modalidad */}
                        <label className='form-label'>Modalidad</label>
                        <div className='modalidad-buttons-container'>
                            <button
                                className={`modalidad-btn ${modalidadDT === 'Renovacion automatica' ? 'active' : ''}`}
                                onClick={() => setModalidadDT('Renovacion automatica')}
                            >
                                Renovación automática
                            </button>
                            <button
                                className={`modalidad-btn ${modalidadDT === 'Ultimo periodo' ? 'active' : ''}`}
                                onClick={() => setModalidadDT('Ultimo periodo')}
                            >
                                Último periodo
                            </button>
                        </div>
                    </>
                )}

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
                Guardar nueva cuenta ({tipoCuenta})
            </button>
        </div>
    );
}