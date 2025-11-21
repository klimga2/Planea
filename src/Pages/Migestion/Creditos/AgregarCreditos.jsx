import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowDropDown } from 'react-icons/md';
// Reutilizamos el CSS de la página de Agregar Cuenta
import './AgregarCreditos.css';

// -------------------------------------------------------------------
// 1. Componente Reutilizable: CustomDropdown (No hay cambios aquí)
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
// 2. Componente Principal: Agregar Crédito
// -------------------------------------------------------------------
export default function MigestionAgregarCredito() {
    const navigate = useNavigate();
    const iconColor = '#4D9DE0';

    // 1. Estados del formulario de Crédito
    const [nombreTitular, setNombreTitular] = useState('Eduardo Villamil');
    const [entidadFinanciera, setEntidadFinanciera] = useState('Selecciona la entidad');
    const [isEntidadDropdownOpen, setIsEntidadDropdownOpen] = useState(false);

    const [categoriaCredito, setCategoriaCredito] = useState('Selecciona la categoría');
    const [isCategoriaDropdownOpen, setIsCategoriaDropdownOpen] = useState(false);

    const [numeroReferencia, setNumeroReferencia] = useState('');
    const [montoInicial, setMontoInicial] = useState(''); // Se convierte en montoTotal al guardar
    const [fechaDesembolso, setFechaDesembolso] = useState('');
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');
    const [plazoTotalMeses, setPlazoTotalMeses] = useState(''); // Se convierte en plazo al guardar
    const [tasaInteres, setTasaInteres] = useState(''); // Se convierte en valorTasa al guardar
    const [cuotaMensual, setCuotaMensual] = useState(''); // Se convierte en cuota al guardar
    const [tipoCuota, setTipoCuota] = useState('Cuota fija');
    const [estado, setEstado] = useState('Activo'); // Estado por defecto: Activo

    // Opciones
    const entidadesOptions = ['Bancolombia', 'BBVA', 'AV Villas', 'Davivienda', 'Banco de Bogotá'];
    const categoriasOptions = ['Libre inversión', 'Vehículo', 'Hipotecario', 'Educativo', 'Microcrédito', 'Rotativo'];


    // 2. Funciones de Formato y Manejo (No hay cambios aquí)

    const formatCurrency = (value) => {
        if (!value) return '';
        const cleanValue = String(value).replace(/[^0-9]/g, '');
        const number = parseInt(cleanValue, 10);
        if (isNaN(number)) return '';
        return `$${number.toLocaleString('es-CO')}`;
    };

    const formatTasaValue = (value) => {
        if (!value) return '';
        let cleanValue = value.replace(/[^0-9.,]/g, '');
        cleanValue = cleanValue.replace(/,/, '.');
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

    const handleTasaChange = (e) => {
        let value = e.target.value.replace(/%/g, '');
        value = value.replace(/,/, '.');
        setTasaInteres(value);
    };


    // 3. Función de Guardado (No hay cambios aquí)
    const handleSaveProduct = () => {

        // 1. Validación de campos obligatorios
        if (
            entidadFinanciera === 'Selecciona la entidad' ||
            categoriaCredito === 'Selecciona la categoría' ||
            !numeroReferencia ||
            !montoInicial ||
            !cuotaMensual ||
            fechaDesembolso.length !== 10 ||
            fechaFinalizacion.length !== 10 ||
            !plazoTotalMeses ||
            !tasaInteres
        ) {
            alert('Por favor, completa todos los campos requeridos y asegúrate de que el formato de las fechas sea correcto (dd/mm/aaaa).');
            return;
        }

        const nuevoProducto = {
            // Genera el ID numérico que es persistente
            id: Date.now(),
            titular: nombreTitular,
            tipo: 'Crédito', // ⭐ Tipo de producto
            fechaCreacion: new Date().toISOString(),
            entidad: entidadFinanciera,
            tipoProducto: categoriaCredito,
            numeroReferencia: numeroReferencia,
            estado: estado, // USAMOS EL ESTADO SELECCIONADO (Activo, Pagado, Mora)

            // ⭐ PROPIEDADES CORREGIDAS PARA MATCH CON DETALLECREDITO.JS:
            montoTotal: Number(montoInicial), // Antes montoInicial
            cuota: Number(cuotaMensual),      // Antes cuotaMensual
            plazo: Number(plazoTotalMeses),   // Antes plazoTotalMeses
            valorTasa: parseFloat(tasaInteres.replace(/[^0-9.]/g, '')), // Antes tasaInteres

            tipoCuota: tipoCuota,
            fechaDesembolso: fechaDesembolso,
            fechaFinalizacion: fechaFinalizacion,
        };


        // 2. Guardar en localStorage
        const productosExistentesJSON = localStorage.getItem('productos_gestion');
        const productosExistentes = productosExistentesJSON ? JSON.parse(productosExistentesJSON) : [];

        productosExistentes.push(nuevoProducto);

        try {
            localStorage.setItem('productos_gestion', JSON.stringify(productosExistentes));
            alert(`¡Crédito de ${categoriaCredito} en ${entidadFinanciera} guardado exitosamente!`);

            navigate('/Migestion-miscreditos');

        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            alert("Hubo un error al intentar guardar el producto.");
        }
    };


    return (
        <div className='agregar-producto-container'>
            <div className='top-barcuenta'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-miscreditos")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Agregar Crédito</span>
            </div>

            <div className='agregar-producto-form-card'>
                {/* CAMPOS BASE */}

                {/* Input Nombre del titular */}
                <label className='form-label'>Nombre del titular</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={nombreTitular}
                    onChange={(e) => setNombreTitular(e.target.value)}
                    placeholder='Nombre del titular'
                />

                {/* Dropdown Entidad financiera */}
                <CustomDropdown
                    label="Entidad financiera"
                    value={entidadFinanciera}
                    options={entidadesOptions}
                    isOpen={isEntidadDropdownOpen}
                    setIsOpen={setIsEntidadDropdownOpen}
                    setValue={setEntidadFinanciera}
                />

                {/* Dropdown Categoría (Tipo de crédito) */}
                <CustomDropdown
                    label="Categoría de Crédito"
                    value={categoriaCredito}
                    options={categoriasOptions}
                    isOpen={isCategoriaDropdownOpen}
                    setIsOpen={setIsCategoriaDropdownOpen}
                    setValue={setCategoriaCredito}
                />

                {/* Input Número de referencia */}
                <label className='form-label'>Número de referencia del crédito</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={numeroReferencia}
                    onChange={(e) => setNumeroReferencia(e.target.value)}
                    placeholder='Ej: 123456789'
                />

                {/* Input Monto inicial (Se guarda como montoTotal) */}
                <label className='form-label'>Monto inicial desembolsado</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={formatCurrency(montoInicial)}
                    onChange={(e) => handleMontoChange(e, setMontoInicial)}
                    placeholder='$20.000.000'
                />

                {/* FECHAS Y PLAZO */}

                {/* Input Fecha de desembolso */}
                <label className='form-label'>Fecha de desembolso (dd/mm/aaaa)</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={fechaDesembolso}
                    onChange={(e) => handleFechaChange(e, setFechaDesembolso)}
                    maxLength={10}
                    placeholder='01/01/2024'
                />

                {/* Input Fecha de finalización */}
                <label className='form-label'>Fecha de finalización (dd/mm/aaaa)</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={fechaFinalizacion}
                    onChange={(e) => handleFechaChange(e, setFechaFinalizacion)}
                    maxLength={10}
                    placeholder='01/01/2028'
                />

                {/* Input Plazo total en meses (Se guarda como plazo) */}
                <label className='form-label'>Plazo total en meses</label>
                <div style={{ position: 'relative', marginBottom: '25px' }}>
                    <input
                        type='text'
                        className='form-input-agregar'
                        value={plazoTotalMeses}
                        onChange={(e) => {
                            const cleanValue = e.target.value.replace(/[^0-9]/g, '');
                            setPlazoTotalMeses(cleanValue);
                        }}
                        placeholder='48'
                        style={{ paddingRight: '60px', marginBottom: '0' }}
                    />
                    <span style={{
                        position: 'absolute',
                        right: '15px',
                        top: '12px',
                        color: '#999',
                        pointerEvents: 'none',
                        fontSize: '1rem',
                    }}>
                        meses
                    </span>
                </div>

                {/* CUOTA Y TASA */}

                {/* Input Tasa de interés (Se guarda como valorTasa) */}
                <label className='form-label'>Tasa de interés</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={formatTasaValue(tasaInteres)}
                    onChange={handleTasaChange}
                    placeholder='1.5%'
                />

                {/* Input Cuota mensual (Se guarda como cuota) */}
                <label className='form-label'>Cuota mensual</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={formatCurrency(cuotaMensual)}
                    onChange={(e) => handleMontoChange(e, setCuotaMensual)}
                    placeholder='$405.000'
                />

                {/* Botones Tipo de cuota */}
                <label className='form-label'>Tipo de cuota</label>
                <div className='tasa-checkbox-container'>
                    <button
                        className={`tasa-btn ${tipoCuota === 'Cuota fija' ? 'active' : ''}`}
                        onClick={() => setTipoCuota('Cuota fija')}
                    >
                        Cuota fija
                    </button>
                    <button
                        className={`tasa-btn ${tipoCuota === 'Cuota variable' ? 'active' : ''}`}
                        onClick={() => setTipoCuota('Cuota variable')}
                    >
                        Cuota variable
                    </button>
                </div>


                {/* ESTADO - CORREGIDO CON PAGADO Y EN MORA */}
                <label className='form-label'>Estado</label>
                <div className='estado-buttons-container'>
                    <button
                        className={`estado-btn ${estado === 'Activo' ? 'active' : ''}`}
                        onClick={() => setEstado('Activo')}
                    >
                        Activo
                    </button>
                    <button
                        className={`estado-btn ${estado === 'Pagado' ? 'active' : ''}`}
                        onClick={() => setEstado('Pagado')}
                    >
                        Pagado
                    </button>
                    <button
                        className={`estado-btn ${estado === 'Mora' ? 'active' : ''}`}
                        onClick={() => setEstado('Mora')}
                    >
                        En Mora
                    </button>
                </div>
            </div>

            {/* BOTÓN GUARDAR PRODUCTO */}
            <button
                className='guardar-producto-btn'
                onClick={handleSaveProduct}
            >
                Guardar nuevo crédito ({categoriaCredito})
            </button>
        </div>
    );
}