import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    MdArrowBack,
    MdEdit,
    MdFavoriteBorder, // Icono para Vida/Salud
    MdDirectionsCar, // Icono para Vehículo
    MdHome, // Icono para Hogar
    MdSchool, // Icono para Educación
    MdAttachMoney, // Icono genérico para otros
} from 'react-icons/md';

// Importa el mismo CSS de detalle de cuenta para mantener el estilo
import './DetalleSeguro.css'; // Asegúrate de que este archivo exista

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

// Manejo interno para el cambio de fecha (dd/mm/aaaa)
const handleFechaInputChange = (value, fieldName, setFormData) => {
    let cleanValue = value.replace(/[^0-9]/g, '');

    if (cleanValue.length > 2) cleanValue = cleanValue.slice(0, 2) + '/' + cleanValue.slice(2);
    if (cleanValue.length > 5) cleanValue = cleanValue.slice(0, 5) + '/' + cleanValue.slice(5, 9);

    setFormData(prev => ({ ...prev, [fieldName]: cleanValue }));
};

// ------------------------------------------
// COMPONENTE PRINCIPAL
// ------------------------------------------
export default function DetalleSeguro() {
    const navigate = useNavigate();
    const { id } = useParams(); // Captura el ID de la URL (string)

    // Estado para cargar la información inicial de la Póliza/Seguro
    const [seguro, setSeguro] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({}); // Estado editable del formulario
    const [loading, setLoading] = useState(true);

    const iconColor = '#4D9DE0';

    // Opciones para Checkboxes de Coberturas (Tomadas de AgregarSeguro.js)
    const coberturasOptions = ['Fallecimiento', 'Auxilio Exequial', 'Incapacidad Total', 'Daños Materiales', 'Responsabilidad Civil', 'Asistencia Jurídica'];


    // ------------------------------------------
    // FUNCIONES DE CARGA DE DATOS
    // ------------------------------------------

    useEffect(() => {
        const loadSeguroData = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productos = productosJSON ? JSON.parse(productosJSON) : [];

                // Convertir el ID de la URL a número ANTES de buscar.
                const idToFind = Number(id);

                // Buscar el producto por ID y asegurar que sea de tipo 'Póliza'
                const currentSeguro = productos.find(p => Number(p.id) === idToFind);

                if (currentSeguro && currentSeguro.tipo === 'Póliza') {
                    setSeguro(currentSeguro);
                    setFormData(currentSeguro);
                } else {
                    alert('Póliza/Seguro no encontrado o el producto no es de tipo Póliza.');
                    navigate('/Migestion-polizasyseguros'); // Redirigir a la vista de seguros
                }
            } catch (error) {
                console.error("Error al cargar datos del seguro:", error);
                alert('Error al cargar datos.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadSeguroData();
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

    // Maneja el cambio de monto (valorAsegurado) y lo guarda como número limpio
    const handleMontoChange = (e, fieldName) => {
        // Solo guarda números
        const cleanValue = e.target.value.replace(/[^0-9]/g, '');
        setFormData(prev => ({ ...prev, [fieldName]: cleanValue }));
    };

    // Maneja el cambio de fecha (dd/mm/aaaa)
    const handleFechaChange = (e, fieldName) => {
        handleFechaInputChange(e.target.value, fieldName, setFormData);
    };

    // Lógica para Checkboxes de Coberturas (Multi-select)
    const handleCoberturaChange = (cobertura) => {
        if (!isEditing) return; // No permitir cambios si no está en modo edición

        setFormData(prev => {
            const currentCoberturas = prev.coberturas || [];
            const updatedCoberturas = currentCoberturas.includes(cobertura)
                ? currentCoberturas.filter(c => c !== cobertura)
                : [...currentCoberturas, cobertura];
            return { ...prev, coberturas: updatedCoberturas };
        });
    };

    // Maneja el guardado de la edición
    const handleSaveEdit = () => {
        // Simulación de validación
        if (!formData.numeroReferencia || !formData.entidad || !formData.tipoProducto) {
            alert('La entidad, el tipo de seguro y el número de referencia son obligatorios.');
            return;
        }

        // Validación de fechas
        if (formData.fechaInicio.length !== 10 || formData.fechaExpiracion.length !== 10) {
            alert('Asegúrate de que el formato de las fechas de inicio y expiración sea correcto (dd/mm/aaaa).');
            return;
        }

        try {
            const productosJSON = localStorage.getItem('productos_gestion');
            let productos = productosJSON ? JSON.parse(productosJSON) : [];

            // Encontrar el índice del producto a actualizar (buscando por ID numérico)
            const index = productos.findIndex(p => Number(p.id) === Number(seguro.id));

            if (index !== -1) {
                // Prepara los datos para guardar (limpiando valorAsegurado)
                const updatedData = {
                    ...formData,
                    valorAsegurado: Number(formData.valorAsegurado),
                };

                // Actualizar el producto en el array con los nuevos datos
                productos[index] = updatedData;

                localStorage.setItem('productos_gestion', JSON.stringify(productos));

                // Actualizar el estado del seguro y deshabilitar la edición
                setSeguro(updatedData);
                setFormData(updatedData); // Asegura que el estado editable también se actualice con los números limpios
                setIsEditing(false);
                alert('¡Póliza/Seguro actualizado exitosamente! ✅');
            } else {
                alert('Error: No se pudo encontrar la Póliza/Seguro para actualizar.');
            }
        } catch (error) {
            console.error("Error al guardar la edición:", error);
            alert("Hubo un error al intentar guardar los cambios.");
        }
    };

    // Maneja la eliminación del producto
    const handleDeleteProduct = () => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar la póliza ${seguro.tipoProducto} de ${seguro.entidad}?`)) {
            return;
        }

        try {
            const productosJSON = localStorage.getItem('productos_gestion');
            let productos = productosJSON ? JSON.parse(productosJSON) : [];

            // Filtrar para mantener solo los productos cuyo ID no coincide con el actual
            const idToDelete = Number(seguro.id);
            const productosActualizados = productos.filter(p => Number(p.id) !== idToDelete);

            localStorage.setItem('productos_gestion', JSON.stringify(productosActualizados));
            alert('Póliza/Seguro eliminado exitosamente. 🗑️');

            // Redirigir a Mis Pólizas
            navigate('/Migestion-polizasyseguros');

        } catch (error) {
            console.error("Error al eliminar el seguro:", error);
            alert("Hubo un error al intentar eliminar la póliza/seguro.");
        }
    };

    // ------------------------------------------
    // RENDERIZADO Y LÓGICA DE VISTA
    // ------------------------------------------

    if (loading) {
        return <div style={{padding: '20px'}}>Cargando...</div>;
    }

    if (!seguro) {
        return <div style={{padding: '20px'}}>Error al cargar la póliza/seguro.</div>;
    }

    // 1. Lógica para obtener el ícono
    const getIcon = (tipoProducto) => {
        const tipoUpper = tipoProducto ? tipoProducto.toUpperCase() : '';

        if (tipoUpper.includes('VIDA') || tipoUpper.includes('SALUD') || tipoUpper.includes('MÉDICO')) {
             return <MdFavoriteBorder size={30} />;
        }
        if (tipoUpper.includes('VEHÍCULO') || tipoUpper.includes('CARRO') || tipoUpper.includes('AUTO')) {
            return <MdDirectionsCar size={30} />;
        }
        if (tipoUpper.includes('HOGAR') || tipoUpper.includes('INCENDIO') || tipoUpper.includes('DOMICILIO')) {
            return <MdHome size={30} />;
        }
        if (tipoUpper.includes('EDUCACIÓN')) {
            return <MdSchool size={30} />;
        }
        return <MdAttachMoney size={30} />;
    };

    // 2. Lógica para obtener la clase de color de la tarjeta
    const getCardColorClass = (tipoProducto) => {
        switch (tipoProducto) {
            case 'Vida':
            case 'Salud': return 'card-color-salud'; // Necesitas definir esta clase CSS
            case 'Vehículo': return 'card-color-vehiculo';
            case 'Hogar': return 'card-color-hipotecario';
            case 'Educación': return 'card-color-educativo';
            default: return 'card-color-seguro-default'; // Define esta clase CSS
        }
    };

    // Renderizado de campos específicos para Póliza/Seguro
    const renderSeguroFields = () => {
        const disabled = !isEditing;

        return (
            <>
                {/* Valor Asegurado (valorAsegurado) */}
                <label className='form-label'>Valor Asegurado</label>
                <input
                    type='text'
                    className='form-input'
                    name='valorAsegurado'
                    value={formatCurrency(formData.valorAsegurado)}
                    onChange={(e) => handleMontoChange(e, 'valorAsegurado')}
                    disabled={disabled}
                />

                {/* Fecha de inicio (fechaInicio) */}
                <label className='form-label'>Fecha de Inicio de Vigencia (dd/mm/aaaa)</label>
                <input
                    type='text'
                    className='form-input'
                    name='fechaInicio'
                    value={formData.fechaInicio || ''}
                    onChange={(e) => handleFechaChange(e, 'fechaInicio')}
                    maxLength={10}
                    disabled={disabled}
                />

                {/* Fecha de expiración (fechaExpiracion) */}
                <label className='form-label'>Fecha de Expiración (dd/mm/aaaa)</label>
                <input
                    type='text'
                    className='form-input'
                    name='fechaExpiracion'
                    value={formData.fechaExpiracion || ''}
                    onChange={(e) => handleFechaChange(e, 'fechaExpiracion')}
                    maxLength={10}
                    disabled={disabled}
                />

                {/* Coberturas (coberturas - Checkbox/Multi-select) */}
                <label className='form-label'>Coberturas Incluidas</label>
                <div className='checkbox-group-container' style={{ marginBottom: '25px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {coberturasOptions.map((cobertura, index) => (
                        <label key={index} style={{ display: 'flex', alignItems: 'center', cursor: disabled ? 'default' : 'pointer', fontSize: '1rem', color: disabled ? '#888' : '#444' }}>
                            <input
                                type="checkbox"
                                checked={formData.coberturas.includes(cobertura)}
                                onChange={() => handleCoberturaChange(cobertura)}
                                disabled={disabled}
                                style={{ marginRight: '10px', width: '18px', height: '18px' }}
                            />
                            {cobertura}
                        </label>
                    ))}
                </div>
            </>
        );
    };


    return (
        <div className='detalle-cuenta-container'> {/* Reutilizamos la clase principal */}
            {/* Top Bar */}
            <div className='top-bar'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-polizasyseguros")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Información de tu Póliza/Seguro</span>
            </div>

            {/* Banner/Card superior - Clase de color dinámica */}
            <div className={`detalle-header-card ${getCardColorClass(seguro.tipoProducto)}`}>
                <div className='header-icon'>
                    {getIcon(seguro.tipoProducto)}
                </div>
                <div className='header-text'>
                    <h2>{seguro.tipoProducto}</h2>
                    <h1>{seguro.entidad}</h1>
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

                {/* Entidad aseguradora (EDITABLE) */}
                <label className='form-label'>Entidad aseguradora</label>
                <input
                    type='text'
                    className='form-input'
                    name='entidad'
                    value={formData.entidad}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* Tipo de producto (Solo lectura) */}
                <label className='form-label'>Tipo de Seguro</label>
                <input
                    type='text'
                    className='form-input'
                    value={formData.tipoProducto}
                    disabled={true}
                />

                {/* Número o referencia (Editable) */}
                <label className='form-label'>Número de Póliza/Referencia</label>
                <input
                    type='text'
                    className='form-input'
                    name='numeroReferencia'
                    value={formData.numeroReferencia}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                {/* CAMPOS ESPECÍFICOS DE SEGURO RENDERIZADOS AQUÍ */}
                {renderSeguroFields()}

                {/* Estado (Editable con botones) */}
                <label className='form-label'>Estado de la póliza</label>
                <div className='estado-buttons-container' style={{pointerEvents: !isEditing ? 'none' : 'auto'}}>
                    <button
                        className={`estado-btn ${formData.estado === 'Activa' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, estado: 'Activa' }))}
                        disabled={!isEditing}
                    >
                        Activa
                    </button>
                    <button
                        className={`estado-btn ${formData.estado === 'Vencida' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, estado: 'Vencida' }))}
                        disabled={!isEditing}
                    >
                        Vencida
                    </button>
                    <button
                        className={`estado-btn ${formData.estado === 'En renovación' ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, estado: 'En renovación' }))}
                        disabled={!isEditing}
                    >
                        En renovación
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
                        Eliminar póliza ⊗
                    </button>

                    {!isEditing && (
                        <button className='regresar-btn' onClick={() => navigate("/Migestion-polizasyseguros")}>
                            Regresar a mis pólizas
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}