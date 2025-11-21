import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    MdArrowBack,
    MdEdit,
    MdHome,
    MdDirectionsCar,
    MdSchool,
    MdAttachMoney,
    MdAccountBalance,
    MdRepeat,
    MdWork
} from 'react-icons/md';

// Importa el mismo CSS de detalle de cuenta para mantener el estilo
import './DetalleCredito.css';

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
    // Permite números y un solo punto o coma, limita a dos decimales
    let cleanValue = String(value).replace(/[^0-9.]/g, '');
    if (cleanValue.includes('.')) {
        const parts = cleanValue.split('.');
        cleanValue = parts[0] + '.' + parts[1].slice(0, 2);
    }
    return `${cleanValue}%`;
};

// ------------------------------------------
// COMPONENTE PRINCIPAL
// ------------------------------------------
export default function DetalleCredito() {
    const navigate = useNavigate();
    const { id } = useParams(); // Captura el ID de la URL (string)

    // Estado para cargar la información inicial del crédito
    const [credito, setCredito] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({}); // Estado editable del formulario
    const [loading, setLoading] = useState(true);

    const iconColor = '#4D9DE0';

    // ------------------------------------------
    // FUNCIONES DE CARGA DE DATOS
    // ------------------------------------------

    useEffect(() => {
        const loadCreditData = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productos = productosJSON ? JSON.parse(productosJSON) : [];

                // Convertir el ID de la URL a número ANTES de buscar.
                const idToFind = Number(id);

                // Buscar el producto por ID y asegurar que sea de tipo 'Crédito'
                const currentCredit = productos.find(p => Number(p.id) === idToFind);

                if (currentCredit && currentCredit.tipo === 'Crédito') {
                    setCredito(currentCredit);
                    setFormData(currentCredit);
                } else {
                     alert('Crédito no encontrado o el producto no es de tipo Crédito.');
                     navigate('/Migestion-miscreditos');
                }
            } catch (error) {
                console.error("Error al cargar datos del crédito:", error);
                alert('Error al cargar datos.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadCreditData();
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

    // Maneja el cambio de monto (montoTotal y cuota) y lo guarda como número limpio
    const handleMontoChange = (e, fieldName) => {
        // Solo guarda números
        const cleanValue = e.target.value.replace(/[^0-9]/g, '');
        setFormData(prev => ({ ...prev, [fieldName]: cleanValue }));
    };

    // Maneja el cambio de fecha (dd/mm/aaaa)
    const handleFechaChange = (e, fieldName) => {
        let value = e.target.value.replace(/[^0-9]/g, '');

        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);

        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    // Maneja el guardado de la edición
    const handleSaveEdit = () => {
        // Simulación de validación
        if (!formData.numeroReferencia || !formData.entidad) {
            alert('El número de referencia y la entidad son obligatorios.');
            return;
        }

        // Validación de fechas
        if (formData.fechaDesembolso.length !== 10 || formData.fechaFinalizacion.length !== 10) {
            alert('Asegúrate de que el formato de las fechas sea correcto (dd/mm/aaaa).');
            return;
        }

        try {
            const productosJSON = localStorage.getItem('productos_gestion');
            let productos = productosJSON ? JSON.parse(productosJSON) : [];

            // Encontrar el índice del producto a actualizar (buscando por ID numérico)
            const index = productos.findIndex(p => Number(p.id) === Number(credito.id));

            if (index !== -1) {
                // Prepara los datos para guardar (limpiando valorTasa por si se edita con %)
                const updatedData = {
                    ...formData,
                    valorTasa: parseFloat(String(formData.valorTasa).replace(/[^0-9.]/g, '')),
                    montoTotal: Number(formData.montoTotal),
                    cuota: Number(formData.cuota),
                    plazo: Number(formData.plazo),
                };

                // Actualizar el producto en el array con los nuevos datos
                productos[index] = updatedData;

                localStorage.setItem('productos_gestion', JSON.stringify(productos));

                // Actualizar el estado del crédito y deshabilitar la edición
                setCredito(updatedData);
                setFormData(updatedData); // Asegura que el estado editable también se actualice con los números limpios
                setIsEditing(false);
                alert('¡Crédito actualizado exitosamente! ✅');
            } else {
                alert('Error: No se pudo encontrar el crédito para actualizar.');
            }
        } catch (error) {
            console.error("Error al guardar la edición:", error);
            alert("Hubo un error al intentar guardar los cambios.");
        }
    };

    // Maneja la eliminación del producto
    const handleDeleteProduct = () => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar el crédito ${credito.tipoProducto} de ${credito.entidad}?`)) {
            return;
        }

        try {
            const productosJSON = localStorage.getItem('productos_gestion');
            let productos = productosJSON ? JSON.parse(productosJSON) : [];

            // Filtrar para mantener solo los productos cuyo ID no coincide con el actual
            const idToDelete = Number(credito.id);
            const productosActualizados = productos.filter(p => Number(p.id) !== idToDelete);

            localStorage.setItem('productos_gestion', JSON.stringify(productosActualizados));
            alert('Crédito eliminado exitosamente. 🗑️');

            // Redirigir a Mis Créditos
            navigate('/Migestion-miscreditos');

        } catch (error) {
            console.error("Error al eliminar el crédito:", error);
            alert("Hubo un error al intentar eliminar el crédito.");
        }
    };

    // ------------------------------------------
    // RENDERIZADO Y LÓGICA DE VISTA
    // ------------------------------------------

    if (loading) {
        return <div style={{padding: '20px'}}>Cargando...</div>;
    }

    if (!credito) {
        return <div style={{padding: '20px'}}>Error al cargar el crédito.</div>;
    }

    // 1. Lógica para obtener el ícono
    const getIcon = (tipoProducto) => {
        switch (tipoProducto) {
            case 'Hipotecario': return <MdHome size={30} />;
            case 'Vehículo': return <MdDirectionsCar size={30} />;
            case 'Educativo': return <MdSchool size={30} />;
            case 'Rotativo': return <MdRepeat size={30} />;
            case 'Microcrédito': return <MdWork size={30} />;
            case 'Libre inversión': return <MdAttachMoney size={30} />;
            default: return <MdAccountBalance size={30} />;
        }
    };

    // 2. Lógica para obtener la clase de color de la tarjeta
    const getCardColorClass = (tipoProducto) => {
        switch (tipoProducto) {
            case 'Hipotecario': return 'card-color-hipotecario';
            case 'Vehículo': return 'card-color-vehiculo';
            case 'Educativo': return 'card-color-educativo';
            case 'Rotativo': return 'card-color-rotativo';
            case 'Microcrédito': return 'card-color-microcredito';
            case 'Libre inversión': return 'card-color-libre-inversion';
            default: return 'card-color-credito-default';
        }
    };

    // Renderizado de campos específicos para Créditos (CORREGIDO)
    const renderCreditFields = () => {
        const disabled = !isEditing;

        return (
            <>
                {/* Monto Total (montoTotal) */}
                <label className='form-label'>Monto Inicial Desembolsado</label>
                <input
                    type='text'
                    className='form-input'
                    name='montoTotal'
                    value={formatCurrency(formData.montoTotal)}
                    onChange={(e) => handleMontoChange(e, 'montoTotal')}
                    disabled={disabled}
                />

                {/* Cuota Mensual (cuota) */}
                <label className='form-label'>Cuota Mensual</label>
                <input
                    type='text'
                    className='form-input'
                    name='cuota'
                    value={formatCurrency(formData.cuota)}
                    onChange={(e) => handleMontoChange(e, 'cuota')}
                    disabled={disabled}
                />

                {/* Tipo de Cuota (Solo lectura o botones si quieres editar el tipo) */}
                <label className='form-label'>Tipo de Cuota</label>
                 <div className='tasa-checkbox-container' style={{pointerEvents: disabled ? 'none' : 'auto'}}>
                    <button
                        className={`tasa-btn ${formData.tipoCuota === 'Cuota fija' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, tipoCuota: 'Cuota fija' }))}
                        disabled={disabled}
                    >
                        Cuota fija
                    </button>
                    <button
                        className={`tasa-btn ${formData.tipoCuota === 'Cuota variable' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, tipoCuota: 'Cuota variable' }))}
                        disabled={disabled}
                    >
                        Cuota variable
                    </button>
                </div>


                {/* Tasa de Interés (valorTasa) */}
                <label className='form-label'>Tasa de Interés</label>
                <input
                    type='text'
                    className='form-input'
                    name='valorTasa'
                    value={formatTasaValue(formData.valorTasa)}
                    onChange={(e) => {
                        // Permite editar el valor de la tasa
                        let value = e.target.value.replace(/%/g, '');
                        value = value.replace(/,/, '.');
                        setFormData(prev => ({ ...prev, valorTasa: value }));
                    }}
                    disabled={disabled}
                />

                {/* Plazo (plazo) */}
                <label className='form-label'>Plazo Total (meses)</label>
                <input
                    type='number'
                    className='form-input'
                    name='plazo'
                    value={formData.plazo || ''}
                    onChange={handleChange}
                    disabled={disabled}
                    min="1"
                />

                {/* Fecha de desembolso (fechaDesembolso) */}
                <label className='form-label'>Fecha de Desembolso (dd/mm/aaaa)</label>
                <input
                    type='text'
                    className='form-input'
                    name='fechaDesembolso'
                    value={formData.fechaDesembolso || ''}
                    onChange={(e) => handleFechaChange(e, 'fechaDesembolso')}
                    maxLength={10}
                    disabled={disabled}
                />

                {/* Fecha de finalización (fechaFinalizacion) */}
                <label className='form-label'>Fecha de Finalización (dd/mm/aaaa)</label>
                <input
                    type='text'
                    className='form-input'
                    name='fechaFinalizacion'
                    value={formData.fechaFinalizacion || ''}
                    onChange={(e) => handleFechaChange(e, 'fechaFinalizacion')}
                    maxLength={10}
                    disabled={disabled}
                />
            </>
        );
    };


    return (
        <div className='detalle-cuenta-container'>
            {/* Top Bar */}
            <div className='top-bar'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-miscreditos")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Información de tu Crédito</span>
            </div>

            {/* Banner/Card superior - Clase de color dinámica */}
            <div className={`detalle-header-card ${getCardColorClass(credito.tipoProducto)}`}>
                <div className='header-icon'>
                    {getIcon(credito.tipoProducto)}
                </div>
                <div className='header-text'>
                    <h2>{credito.tipoProducto}</h2>
                    <h1>{credito.entidad}</h1>
                </div>
            </div>

            {/* Formulario de Detalle/Edición */}
            <div className='detalle-form-container'>

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
                    value={formData.titular}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* Entidad financiera (EDITABLE) */}
                <label className='form-label'>Entidad financiera</label>
                <input
                    type='text'
                    className='form-input'
                    name='entidad'
                    value={formData.entidad}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* Tipo de producto (Solo lectura) */}
                <label className='form-label'>Tipo de Crédito</label>
                <input
                    type='text'
                    className='form-input'
                    value={formData.tipoProducto}
                    disabled={true}
                />

                {/* Número o referencia (Editable) */}
                <label className='form-label'>Número de Crédito/Referencia</label>
                <input
                    type='text'
                    className='form-input'
                    name='numeroReferencia'
                    value={formData.numeroReferencia}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* CAMPOS ESPECÍFICOS DE CRÉDITO RENDERIZADOS AQUÍ */}
                {renderCreditFields()}

                {/* Estado (Editable con botones) */}
                <label className='form-label'>Estado</label>
                <div className='estado-buttons-container' style={{pointerEvents: !isEditing ? 'none' : 'auto'}}>
                    <button
                        className={`estado-btn ${formData.estado === 'Activo' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, estado: 'Activo' }))}
                        disabled={!isEditing}
                    >
                        Activo
                    </button>
                    <button
                        className={`estado-btn ${formData.estado === 'Pagado' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, estado: 'Pagado' }))}
                        disabled={!isEditing}
                    >
                        Pagado
                    </button>
                    <button
                        className={`estado-btn ${formData.estado === 'Mora' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, estado: 'Mora' }))}
                        disabled={!isEditing}
                    >
                        En Mora
                    </button>
                </div>

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
                        <button className='regresar-btn' onClick={() => navigate("/Migestion-miscreditos")}>
                            Regresar a mis créditos
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}