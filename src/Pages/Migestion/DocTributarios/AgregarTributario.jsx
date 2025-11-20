import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowDropDown, MdAttachFile, MdDelete, MdCheckCircle } from 'react-icons/md';
// Reutilizamos el CSS de la página de Agregar Crédito/Cuenta
import './AgregarTributarios.css';

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
// 2. Componente Principal: Agregar Documento Tributario
// -------------------------------------------------------------------
export default function MigestionAgregarDocumento() {
    const navigate = useNavigate();
    const iconColor = '#4D9DE0';
    const fileInputRef = useRef(null); // Referencia para el input de archivo oculto

    // 1. Estados del formulario de Documento
    const [nombreDocumento, setNombreDocumento] = useState('');

    const defaultTipo = 'Selecciona el tipo';
    const [tipoDocumento, setTipoDocumento] = useState(defaultTipo);
    const [isTipoDropdownOpen, setIsTipoDropdownOpen] = useState(false);

    const [año, setAño] = useState('');

    // Estados para manejar el archivo adjunto
    const [documentFile, setDocumentFile] = useState(null); // Almacena el objeto File (solo para metadatos)
    const [documentBase64, setDocumentBase64] = useState(null); // Almacena el contenido en Base64 para localStorage

    // Opciones del Dropdown
    const tiposDocumentoOptions = [
        'Declaración de renta',
        'Certificado de ingresos y retenciones',
        'RUT',
        'Certificado de aportes',
        'Soporte de deducciones',
        'Otro documento fiscal',
    ];

    // 2. Manejo del input de Año (solo 4 dígitos)
    const handleAñoChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
        setAño(value);
    };

    // 3. Manejo de Subida de Archivo (Convierte a Base64)
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDocumentFile(file);

            // Convertir el archivo a Base64
            const reader = new FileReader();
            reader.onload = (event) => {
                setDocumentBase64(event.target.result);
            };
            reader.onerror = (error) => {
                console.error("Error al leer el archivo:", error);
                setDocumentBase64(null);
            };
            reader.readAsDataURL(file);
        }
    };

    // 4. Eliminar Archivo Adjunto
    const handleRemoveFile = () => {
        setDocumentFile(null);
        setDocumentBase64(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Limpia el input de archivo
        }
    };

    // 5. Función de Guardado
    const handleSaveDocument = () => {

        // Validación de campos obligatorios
        if (
            !nombreDocumento ||
            tipoDocumento === defaultTipo ||
            año.length !== 4
        ) {
             // Reemplazar alert() por un modal customizado en un entorno real
            console.error('ERROR: Por favor, completa el nombre, el tipo y asegúrate de que el Año tenga 4 dígitos.');
            // Usamos un mensaje en consola ya que window.alert está prohibido.
            return;
        }

        // Crear el objeto del nuevo documento
        const nuevoDocumento = {
            // Genera el ID numérico que es persistente
            id: Date.now(),
            nombre: nombreDocumento,
            tipo: 'Documento Tributario', // ⭐ Tipo de producto para filtrado
            tipoProducto: tipoDocumento, // Nombre específico del tipo de documento
            año: año,
            fechaCreacion: new Date().toISOString(),

            // Adjunto: Almacenamos metadata y el contenido en Base64
            adjunto: documentBase64 ? {
                fileName: documentFile.name,
                fileType: documentFile.type,
                base64Content: documentBase64,
            } : null,
        };

        // 2. Guardar en localStorage
        const productosExistentesJSON = localStorage.getItem('productos_gestion');
        const productosExistentes = productosExistentesJSON ? JSON.parse(productosExistentesJSON) : [];

        productosExistentes.push(nuevoDocumento);

        try {
            localStorage.setItem('productos_gestion', JSON.stringify(productosExistentes));

            // Notificación de éxito
            console.log(`¡Documento Tributario: "${nombreDocumento}" para el año ${año} guardado exitosamente!`);

            // Redirigir a la lista de documentos
            navigate('/Migestion-documentostributarios');

        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            // Mostrar mensaje de error en la UI
        }
    };


    return (
        <div className='agregar-producto-container'>
            <div className='top-barcuenta'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-documentostributarios")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Agregar Documento Tributario</span>
            </div>

            <div className='agregar-producto-form-card'>

                {/* Input Nombre del documento */}
                <label className='form-label'>Nombre del documento</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={nombreDocumento}
                    onChange={(e) => setNombreDocumento(e.target.value)}
                    placeholder='Ej: Declaración de Renta 2023'
                />

                {/* Dropdown Tipo de documento */}
                <CustomDropdown
                    label="Tipo de documento"
                    value={tipoDocumento}
                    options={tiposDocumentoOptions}
                    isOpen={isTipoDropdownOpen}
                    setIsOpen={setIsTipoDropdownOpen}
                    setValue={setTipoDocumento}
                />

                {/* Input Año */}
                <label className='form-label'>Año (AAAA)</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={año}
                    onChange={handleAñoChange}
                    maxLength={4}
                    placeholder='Ej: 2024'
                />

                {/* -------------------------------------- */}
                {/* SECCIÓN DE SUBIDA DE ARCHIVO */}
                {/* -------------------------------------- */}
                <label className='form-label' style={{ marginTop: '20px' }}>Adjuntar documento</label>

                {/* Input de archivo real, pero oculto */}
                <input
                    type='file'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept=".pdf, .jpg, .jpeg, .png"
                />

                {/* UI para adjuntar o eliminar archivo */}
                {!documentFile ? (
                    // Botón para adjuntar
                    <button
                        className='add-file-btnY'
                        onClick={() => fileInputRef.current.click()}
                    >
                        <MdAttachFile size={20} style={{ marginRight: '8px' }} />
                        Subir archivo (PDF, Imagen)
                    </button>
                ) : (
                    // Vista previa del archivo adjunto
                    <div className='attached-file-preview'>
                        <MdCheckCircle size={20} color="#2ECC71" style={{ marginRight: '8px' }} />
                        <span className='file-name-text'>{documentFile.name}</span>

                        {/* Botón de Eliminar */}
                        <button
                            className='remove-file-btnY'
                            onClick={handleRemoveFile}
                        > Eliminar documento
                            <MdDelete size={20} color="#ffffffff" />
                        </button>
                    </div>
                )}

                {/* Nota de ayuda */}
                <p className='helper-text'>
                    {documentFile ? '' : 'Máximo 10MB. Formatos aceptados: PDF, JPG, PNG.'}
                </p>
                {/* -------------------------------------- */}

            </div>

            {/* BOTÓN GUARDAR DOCUMENTO */}
            <button
                className='guardar-producto-btn'
                onClick={handleSaveDocument}
            >
                Guardar documento ({tipoDocumento === defaultTipo ? 'Tributario' : tipoDocumento})
            </button>
        </div>
    );
}