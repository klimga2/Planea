import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack, MdEdit, MdTrendingUp } from 'react-icons/md';

// ✅ Importa el CSS (Asegúrate de copiar los estilos de botones de DetalleCuenta.css a este archivo)
import './DetalleInversion.css';

// ------------------------------------------
// HELPERS
// ------------------------------------------

// Helper para formatear monto a formato moneda ($X.XXX.XXX)
const formatCurrency = (value) => {
    if (value === null || value === undefined || value === '') return '';
    const cleanValue = String(value).replace(/[^0-9]/g, '');
    const number = parseInt(cleanValue, 10);
    if (isNaN(number)) return '';
    return `$${number.toLocaleString('es-CO')}`;
};

// Helper para formatear valor de tasa a porcentaje (X.XX%)
const formatTasaValue = (value) => {
    if (!value) return '';
    let cleanValue = String(value).replace(/[^0-9.]/g, '');
    if (cleanValue.includes('.')) {
        const parts = cleanValue.split('.');
        cleanValue = parts[0] + '.' + parts[1].slice(0, 2);
    }
    return cleanValue ? `${cleanValue}%` : '';
};

// ------------------------------------------
// COMPONENTE PRINCIPAL
// ------------------------------------------
export default function DetalleInversion() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [inversion, setInversion] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    const iconColor = '#4D9DE0';

    // ------------------------------------------
    // FUNCIONES DE CARGA DE DATOS
    // ------------------------------------------

    useEffect(() => {
        const loadInversionData = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productos = productosJSON ? JSON.parse(productosJSON) : [];

                const targetId = Number(id);

                // Buscar la inversión por ID y asegurar que el tipo general sea 'Inversión'.
                const currentInversion = productos.find(p => Number(p.id) === targetId && p.tipo === 'Inversión');

                if (currentInversion) {
                    setInversion(currentInversion);
                    setFormData(currentInversion);
                } else {
                    alert('Inversión no encontrada o no es un producto de Inversión válido.');
                    navigate('/Migestion-misinversiones');
                }
            } catch (error) {
                console.error("Error al cargar datos de la inversión:", error);
                alert('Error al cargar datos.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadInversionData();
        }
    }, [id, navigate]);

    // ------------------------------------------
    // MANEJADORES DEL FORMULARIO
    // ------------------------------------------

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMontoChange = (e, fieldName) => {
        const cleanValue = e.target.value.replace(/[^0-9]/g, '');
        setFormData(prev => ({ ...prev, [fieldName]: cleanValue }));
    };

    const handleTasaChange = (e, fieldName) => {
        let value = e.target.value.replace(/%/g, '');
        value = value.replace(/,/, '.'); // Permite coma como separador decimal
        const cleanValue = value.replace(/[^0-9.]/g, '');

        if (cleanValue.includes('.')) {
            const parts = cleanValue.split('.');
            // Limitar a 2 decimales
            value = parts[0] + (parts[1] ? '.' + parts[1].slice(0, 2) : '');
        } else {
            value = cleanValue;
        }

        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };


    const handleFechaChange = (e, fieldName) => {
        let value = e.target.value.replace(/[^0-9]/g, '');

        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleSaveEdit = () => {
        if (!formData.numeroReferencia || !formData.entidad) {
            alert('El número de referencia y la entidad son obligatorios.');
            return;
        }

        try {
            const productosJSON = localStorage.getItem('productos_gestion');
            let productos = productosJSON ? JSON.parse(productosJSON) : [];

            const index = productos.findIndex(p => Number(p.id) === Number(inversion.id));

            if (index !== -1) {
                const updatedData = {
                    ...formData,
                    // Asegurar que los campos numéricos se guarden como números
                    monto: Number(formData.monto),
                    valorTasa: parseFloat(String(formData.valorTasa).replace(/[^0-9.]/g, '')),
                };

                productos[index] = updatedData;

                localStorage.setItem('productos_gestion', JSON.stringify(productos));

                setInversion(updatedData);
                setFormData(updatedData); // Actualiza el estado editable también
                setIsEditing(false);
                alert('¡Inversión actualizada exitosamente! ✅');
            } else {
                alert('Error: No se pudo encontrar la inversión para actualizar.');
            }
        } catch (error) {
            console.error("Error al guardar la edición:", error);
            alert("Hubo un error al intentar guardar los cambios.");
        }
    };

    const handleDeleteProduct = () => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar la inversión ${inversion.tipoProducto} de ${inversion.entidad}?`)) {
            return;
        }

        try {
            const productosJSON = localStorage.getItem('productos_gestion');
            let productos = productosJSON ? JSON.parse(productosJSON) : [];

            const idToDelete = Number(inversion.id);
            const productosActualizados = productos.filter(p => Number(p.id) !== idToDelete);

            localStorage.setItem('productos_gestion', JSON.stringify(productosActualizados));
            alert('Inversión eliminada exitosamente. 🗑️');

            navigate('/Migestion-misinversiones');

        } catch (error) {
            console.error("Error al eliminar la inversión:", error);
            alert("Hubo un error al intentar eliminar la inversión.");
        }
    };

    // ------------------------------------------
    // RENDERIZADO Y LÓGICA DE VISTA
    // ------------------------------------------

    if (loading) {
        return <div style={{ padding: '20px' }}>Cargando...</div>;
    }

    if (!inversion) {
        return <div style={{ padding: '20px' }}>Error al cargar la inversión.</div>;
    }

    // 1. Lógica para obtener el ícono (Fijo para Inversiones)
    const getIcon = () => {
        return <MdTrendingUp size={30} />;
    };

    // 2. Lógica para obtener la clase de color de la tarjeta
    const getCardColorClass = () => {
        // Usamos la clase de Depósito a Término que definiste para Inversiones
        return 'card-color-deposito-term';
    };

    // Renderizado de campos específicos para Inversiones
    const renderInvestmentFields = () => {
        const disabled = !isEditing;

        return (
            <>
                {/* Monto Inicial */}
                <label className='form-label'>Monto Inicial</label>
                <input
                    type='text'
                    className='form-input'
                    name='monto'
                    value={formatCurrency(formData.monto)}
                    onChange={(e) => handleMontoChange(e, 'monto')}
                    disabled={disabled}
                />

                {/* Fecha de apertura */}
                <label className='form-label'>Fecha de apertura (dd/mm/aaaa)</label>
                <input
                    type='text'
                    className='form-input'
                    name='fechaApertura'
                    value={formData.fechaApertura || ''}
                    onChange={(e) => handleFechaChange(e, 'fechaApertura')}
                    maxLength={10}
                    disabled={disabled}
                />

                {/* Fecha de vencimiento (Solo si no es N/A) */}
                {formData.fechaVencimiento && formData.fechaVencimiento !== 'N/A' && (
                    <>
                        <label className='form-label'>Fecha de vencimiento (dd/mm/aaaa)</label>
                        <input
                            type='text'
                            className='form-input'
                            name='fechaVencimiento'
                            value={formData.fechaVencimiento || ''}
                            onChange={(e) => handleFechaChange(e, 'fechaVencimiento')}
                            maxLength={10}
                            disabled={disabled}
                        />
                    </>
                )}

                {/* --- CAMBIO: Tipo de Tasa ahora usa botones en lugar de Input --- */}
                <label className='form-label'>Tipo de Tasa</label>
                <div className='tasa-checkbox-container' style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
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

                {/* Valor de Tasa */}
                <label className='form-label'>Valor de Tasa</label>
                <input
                    type='text'
                    className='form-input'
                    name='valorTasa'
                    value={formatTasaValue(formData.valorTasa)}
                    onChange={(e) => handleTasaChange(e, 'valorTasa')}
                    disabled={disabled}
                />

                {/* Plazo (Se mantiene como input porque puede ser cualquier valor) */}
                <label className='form-label'>Plazo</label>
                <input
                    type='text'
                    className='form-input'
                    name='plazo'
                    value={formData.plazo || ''}
                    onChange={handleChange}
                    disabled={disabled}
                />

                {/* --- CAMBIO: Modalidad ahora usa botones en lugar de Input --- */}
                <label className='form-label'>Modalidad</label>
                <div className='modalidad-buttons-container' style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
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
    };

    return (
        <div className='detalle-cuenta-container'>
            {/* Top Bar */}
            <div className='top-bar'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-misinversiones")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Detalle de tu Inversión</span>
            </div>

            {/* Banner/Card superior */}
            <div className={`detalle-header-card ${getCardColorClass()}`}>
                <div className='header-icon'>
                    {getIcon()}
                </div>
                <div className='header-text'>
                    <h2>{inversion.tipoProducto || 'Inversión'}</h2>
                    <h1>{inversion.entidad}</h1>
                </div>
            </div>

            {/* Formulario de Detalle/Edición */}
            <div className='detalle-form-container'>

                {/* Botón de Edición */}
                <div className='edit-button-wrapper' onClick={() => setIsEditing(!isEditing)}>
                    <MdEdit
                        size={28}
                        color={isEditing ? '#FF6347' : iconColor}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                {/* Nombre del titular (EDITABLE) */}
                <label className='form-label'>Nombre del titular</label>
                <input
                    type='text'
                    className='form-input'
                    name='titular'
                    value={formData.titular || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* Entidad financiera (EDITABLE) */}
                <label className='form-label'>Entidad financiera</label>
                <input
                    type='text'
                    className='form-input'
                    name='entidad'
                    value={formData.entidad || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* Tipo de producto (Solo lectura) */}
                <label className='form-label'>Tipo de Producto</label>
                <input
                    type='text'
                    className='form-input'
                    value={formData.tipoProducto || ''}
                    disabled={true}
                />

                {/* Número o referencia (Editable) */}
                <label className='form-label'>Número de Referencia/Certificado</label>
                <input
                    type='text'
                    className='form-input'
                    name='numeroReferencia'
                    value={formData.numeroReferencia || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* CAMPOS ESPECÍFICOS DE INVERSIÓN RENDERIZADOS AQUÍ */}
                {renderInvestmentFields()}

                {/* Estado (Editable con input simple para ser flexible) */}
                <label className='form-label'>Estado</label>
                <input
                    type='text'
                    className='form-input'
                    name='estado'
                    value={formData.estado || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* Botones de acción (Guardar / Eliminar / Regresar) */}
                <div className='action-buttons'>
                    {isEditing && (
                        <button className='guardar-edicion-btn' onClick={handleSaveEdit}>
                            Guardar
                        </button>
                    )}

                    <button className='eliminar-producto-btn' onClick={handleDeleteProduct}>
                        Eliminar producto ⊗
                    </button>

                    {!isEditing && (
                        <button className='regresar-btn' onClick={() => navigate("/Migestion-misinversiones")}>
                            Regresar a mis inversiones
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}