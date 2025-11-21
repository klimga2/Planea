import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdEdit, MdOutlineAccountBalanceWallet, MdCreditCard, MdWork, MdTrendingUp, MdAccountBalance } from 'react-icons/md';
import './DetalleCuenta.css';

// Helper para formatear monto a formato moneda ($X.XXX.XXX)
const formatCurrency = (value) => {
    if (value === null || value === undefined) return '';
    const cleanValue = String(value).replace(/[^0-9]/g, '');
    const number = parseInt(cleanValue, 10);
    if (isNaN(number)) return '';
    return `$${number.toLocaleString('es-CO')}`;
};

// Helper para formatear valor de tasa a porcentaje (X.XX%)
const formatTasaValue = (value) => {
    if (!value) return '';
    // Permite números y un solo punto o coma, limita a dos decimales
    let cleanValue = String(value).replace(/[^0-9.]/g, '');
    if (cleanValue.includes('.')) {
        const parts = cleanValue.split('.');
        cleanValue = parts[0] + '.' + parts[1].slice(0, 2);
    }
    return `${cleanValue}%`;
};

// Componente principal
export default function DetalleCuenta() {
    const navigate = useNavigate();
    const { id } = useParams(); // Captura el ID de la URL

    // Estado para cargar la información inicial de la cuenta
    const [cuenta, setCuenta] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({}); // Estado editable del formulario
    const [loading, setLoading] = useState(true);

    const iconColor = '#4D9DE0';

    // ------------------------------------------
    // FUNCIONES DE CARGA DE DATOS
    // ------------------------------------------

    useEffect(() => {
        const loadAccountData = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productos = productosJSON ? JSON.parse(productosJSON) : [];

                // Buscar la cuenta por ID (el ID es numérico, lo convertimos)
                const targetId = parseInt(id);
                const currentAccount = productos.find(p => p.id === targetId);

                if (currentAccount) {
                    setCuenta(currentAccount);
                    // Inicializar el formulario con los datos de la cuenta
                    setFormData(currentAccount);
                } else {
                    alert('Cuenta no encontrada.');
                    navigate('/Migestion-miscuentas');
                }
            } catch (error) {
                console.error("Error al cargar datos de la cuenta:", error);
                alert('Error al cargar datos.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadAccountData();
        }
    }, [id, navigate]);

    // ------------------------------------------
    // MANEJADORES DEL FORMULARIO
    // ------------------------------------------

    // Maneja el cambio de cualquier campo de texto simple
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Maneja el cambio de monto y lo formatea (para Cupo y Monto Depósito)
    const handleMontoChange = (e, fieldName) => {
        // Solo guarda números
        const cleanValue = e.target.value.replace(/[^0-9]/g, '');
        setFormData(prev => ({ ...prev, [fieldName]: cleanValue }));
    };

    // Maneja y formatea cualquier fecha a dd/mm/aaaa
    const handleFechaChange = (e, fieldName) => {
        let value = e.target.value.replace(/[^0-9]/g, ''); // Solo números

        // Aplica el formato dd/mm/aaaa
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    // Maneja el guardado de la edición
    const handleSaveEdit = () => {
        // Simulación de validación (deberías añadir validación completa aquí)
        if (!formData.numeroReferencia || !formData.entidad) {
            alert('El número de referencia y la entidad son obligatorios.');
            return;
        }

        try {
            const productosJSON = localStorage.getItem('productos_gestion');
            let productos = productosJSON ? JSON.parse(productosJSON) : [];

            // Encontrar el índice del producto a actualizar
            const index = productos.findIndex(p => p.id === cuenta.id);

            if (index !== -1) {
                // Actualizar el producto en el array con los nuevos datos (formData)
                productos[index] = { ...formData };

                localStorage.setItem('productos_gestion', JSON.stringify(productos));

                // Actualizar el estado de la cuenta y deshabilitar la edición
                setCuenta(formData);
                setIsEditing(false);
                alert('¡Cuenta actualizada exitosamente! ✅');
            } else {
                alert('Error: No se pudo encontrar la cuenta para actualizar.');
            }
        } catch (error) {
            console.error("Error al guardar la edición:", error);
            alert("Hubo un error al intentar guardar los cambios.");
        }
    };

    // Maneja la eliminación del producto
    const handleDeleteProduct = () => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar la cuenta ${cuenta.tipoCuenta} de ${cuenta.entidad}?`)) {
            return;
        }

        try {
            const productosJSON = localStorage.getItem('productos_gestion');
            let productos = productosJSON ? JSON.parse(productosJSON) : [];

            // Filtrar para mantener solo las cuentas cuyo ID no coincide con el actual
            const productosActualizados = productos.filter(p => p.id !== cuenta.id);

            localStorage.setItem('productos_gestion', JSON.stringify(productosActualizados));
            alert('Cuenta eliminada exitosamente. 🗑️');

            // Redirigir a Mis Cuentas
            navigate('/Migestion-miscuentas');

        } catch (error) {
            console.error("Error al eliminar la cuenta:", error);
            alert("Hubo un error al intentar eliminar la cuenta.");
        }
    };

    // ------------------------------------------
    // RENDERIZADO Y LÓGICA DE VISTA
    // ------------------------------------------

    if (loading) {
        return <div style={{padding: '20px'}}>Cargando...</div>;
    }

    if (!cuenta) {
        return <div style={{padding: '20px'}}>Error al cargar la cuenta.</div>;
    }

    // 1. Lógica para obtener el ícono
    const getIcon = (tipoCuenta) => {
        switch (tipoCuenta) {
            case 'Ahorro': return <MdOutlineAccountBalanceWallet size={30} />;
            case 'Corriente': return <MdCreditCard size={30} />;
            case 'Depósito electrónico': return <MdWork size={30} />;
            case 'Depósito a término': return <MdTrendingUp size={30} />;
            default: return <MdAccountBalance size={30} />;
        }
    };

    // 2. Lógica para obtener la clase de color de la tarjeta
    const getCardColorClass = (tipoCuenta) => {
        switch (tipoCuenta) {
            case 'Ahorro': return 'card-color-ahorro';
            case 'Corriente': return 'card-color-corriente';
            case 'Depósito electrónico': return 'card-color-deposito-elec';
            case 'Depósito a término': return 'card-color-deposito-term';
            default: return 'card-color-default';
        }
    };

    // Renderizado de campos condicionales
    const renderConditionalFields = () => {
        const tipo = formData.tipoCuenta;
        const disabled = !isEditing;

        if (tipo === 'Corriente') {
            return (
                <>
                    <label className='form-label'>Cupo de sobregiro</label>
                    <input
                        type='text'
                        className='form-input'
                        name='cupoSobregiro'
                        value={formatCurrency(formData.cupoSobregiro)}
                        onChange={(e) => handleMontoChange(e, 'cupoSobregiro')}
                        disabled={disabled}
                    />
                </>
            );
        } else if (tipo === 'Depósito electrónico') {
            return (
                <>
                    <label className='form-label'>Monto</label>
                    <input
                        type='text'
                        className='form-input'
                        name='montoInicial'
                        value={formatCurrency(formData.montoInicial)}
                        onChange={(e) => handleMontoChange(e, 'montoInicial')}
                        disabled={disabled}
                    />

                    <label className='form-label'>Fecha de apertura (dd/mm/aaaa)</label>
                    <input
                        type='text'
                        className='form-input'
                        name='fechaApertura'
                        value={formData.fechaApertura}
                        onChange={(e) => handleFechaChange(e, 'fechaApertura')}
                        maxLength={10}
                        disabled={disabled}
                    />
                </>
            );
        } else if (tipo === 'Depósito a término') {
            return (
                <>
                    <label className='form-label'>Monto</label>
                    <input
                        type='text'
                        className='form-input'
                        name='monto'
                        value={formatCurrency(formData.monto)}
                        onChange={(e) => handleMontoChange(e, 'monto')}
                        disabled={disabled}
                    />

                    <div className='input-row'>
                        <div className='input-col'>
                            <label className='form-label'>Fecha de apertura</label>
                            <input
                                type='text'
                                className='form-input'
                                name='fechaApertura'
                                value={formData.fechaApertura}
                                onChange={(e) => handleFechaChange(e, 'fechaApertura')}
                                maxLength={10}
                                disabled={disabled}
                            />
                        </div>
                        <div className='input-col'>
                            <label className='form-label'>Fecha de vencimiento</label>
                            <input
                                type='text'
                                className='form-input'
                                name='fechaVencimiento'
                                value={formData.fechaVencimiento}
                                onChange={(e) => handleFechaChange(e, 'fechaVencimiento')}
                                maxLength={10}
                                disabled={disabled}
                            />
                        </div>
                    </div>

                    <label className='form-label'>Tasa pactada</label>
                    <div className='tasa-checkbox-container' style={{pointerEvents: disabled ? 'none' : 'auto'}}>
                        <button
                            className={`tasa-btn ${formData.tasaPactadaTipo === 'EA' ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, tasaPactadaTipo: 'EA' }))}
                            disabled={disabled}
                        >
                            EA
                        </button>
                        <button
                            className={`tasa-btn ${formData.tasaPactadaTipo === 'Nominal' ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, tasaPactadaTipo: 'Nominal' }))}
                            disabled={disabled}
                        >
                            Nominal
                        </button>
                    </div>

                    <label className='form-label'>Valor de tasa</label>
                    <input
                        type='text'
                        className='form-input'
                        name='valorTasa'
                        value={formatTasaValue(formData.valorTasa)}
                        onChange={(e) => {
                            const cleanValue = e.target.value.replace(/[^0-9.]/g, '');
                            setFormData(prev => ({ ...prev, valorTasa: cleanValue }));
                        }}
                        disabled={disabled}
                    />

                    <label className='form-label'>Modalidad</label>
                    <div className='modalidad-buttons-container' style={{pointerEvents: disabled ? 'none' : 'auto'}}>
                        <button
                            className={`modalidad-btn ${formData.modalidad === 'Renovacion automatica' ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, modalidad: 'Renovacion automatica' }))}
                            disabled={disabled}
                        >
                            Renovación automática
                        </button>
                        <button
                            className={`modalidad-btn ${formData.modalidad === 'Ultimo periodo' ? 'active' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, modalidad: 'Ultimo periodo' }))}
                            disabled={disabled}
                        >
                            Último periodo
                        </button>
                    </div>
                </>
            );
        }
        return null;
    };


    return (
        <div className='detalle-cuenta-container'>
            {/* Top Bar */}
            <div className='top-bar'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-miscuentas")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Información de tu cuenta</span>
            </div>

            {/* Banner/Card superior - Clase de color dinámica */}
            <div className={`detalle-header-card ${getCardColorClass(cuenta.tipoCuenta)}`}>
                <div className='header-icon'>
                    {getIcon(cuenta.tipoCuenta)}
                </div>
                <div className='header-text'>
                    <h2>{cuenta.tipoCuenta}</h2>
                    <h1>{cuenta.entidad}</h1>
                </div>
            </div>

            {/* Formulario de Detalle/Edición */}
            <div className='detalle-form-container'>

               <div className='edit-button-wrapper' onClick={() => setIsEditing(!isEditing)}>

                <MdEdit
                    size={28}
                    color={isEditing ? '#FF6347' : iconColor} // Color diferente para el modo edición
                    style={{ cursor: 'pointer' }}
                />

            </div>

                {/* Nombre del titular (AHORA EDITABLE) */}
                <label className='form-label'>Nombre del titular</label>
                <input
                    type='text'
                    className='form-input'
                    name='titular' // AGREGADO el atributo name para handleChange
                    value={formData.titular}
                    onChange={handleChange} // AGREGADO el manejador de cambio
                    disabled={!isEditing} // CAMBIADO a ¡disabled={!isEditing}!
                />

                {/* Entidad financiera (AHORA EDITABLE) */}
                <label className='form-label'>Entidad financiera</label>
                <input
                    type='text'
                    className='form-input'
                    name='entidad' // AGREGADO el atributo name para handleChange
                    value={formData.entidad}
                    onChange={handleChange} // AGREGADO el manejador de cambio
                    disabled={!isEditing} // CAMBIADO a ¡disabled={!isEditing}!
                />


                {/* Tipo de cuenta (Solo lectura) */}
                <label className='form-label'>Tipo de cuenta</label>
                <input
                    type='text'
                    className='form-input'
                    value={formData.tipoCuenta}
                    disabled={true} // Se mantiene disabled=true
                />

                {/* Número o referencia (Editable) */}
                <label className='form-label'>Número o referencia</label>
                <input
                    type='text'
                    className='form-input'
                    name='numeroReferencia'
                    value={formData.numeroReferencia}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* CAMPOS CONDICIONALES RENDERIZADOS AQUÍ */}
                {renderConditionalFields()}

                {/* Estado (Editable con botones) */}
                <label className='form-label'>Estado</label>
                <div className='estado-buttons-container' style={{pointerEvents: !isEditing ? 'none' : 'auto'}}>
                    <button
                        className={`estado-btn ${formData.estado === 'Activa' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, estado: 'Activa' }))}
                        disabled={!isEditing}
                    >
                        Activa
                    </button>
                    <button
                        className={`estado-btn ${formData.estado === 'Inactiva' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, estado: 'Inactiva' }))}
                        disabled={!isEditing}
                    >
                        Inactiva
                    </button>
                </div>

                {/* Botones de acción (Guardar / Eliminar / Regresar) */}
                <div className='action-buttons'>
                    {isEditing && (
                        <button className='guardar-edicion-btn' onClick={handleSaveEdit}>
                            Guardar
                        </button>
                    )}

                    {/* El botón de eliminar se muestra siempre, como en el código original */}
                    <button className='eliminar-producto-btn' onClick={handleDeleteProduct}>
                        Eliminar producto ⊗
                    </button>

                    {/* ✅ CAMBIO: Mostrar el botón 'Regresar' SOLO cuando NO se esté editando */}
                    {!isEditing && (
                        <button className='regresar-btn' onClick={() => navigate("/Migestion-miscuentas")}>
                            Regresar a mis productos
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}