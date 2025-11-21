import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdArrowBack,
    MdAdd,
    MdAttachMoney,      // 💰 Para Activos Financieros / Inversiones
    MdHomeWork,         // 🏠 Para Bienes Inmuebles / Propiedades
    MdDescription,      // 📝 Para Certificados / Contratos
    MdCreditCard,       // 💳 Para Deudas / Créditos
    MdFileDownload,     // ⬇️ Para la descarga
    MdWork,             // 💼 Para Participaciones / Empresas
} from 'react-icons/md';

// Importamos el mismo archivo CSS (DocTributarios.css), si ya lo tienes estilizado
import '../DocTributarios/DocTributarios.css';

// Asumo que tienes un banner específico, aquí usaremos uno genérico o el mismo
import bannerDocumentos from "../../../assets/bannerpatrimonial.png"; // ASUME ESTE NUEVO BANNER

// -------------------------------------------------------------------
// 1. Componente Reutilizable: DocumentCardPatrimonial
// -------------------------------------------------------------------

const DocumentCardPatrimonial = ({ product }) => {

    // Función para manejar la descarga del archivo (Lógica idéntica)
    const handleDownload = (e) => {
        e.stopPropagation();

        if (product.adjunto && product.adjunto.base64Content) {
            try {
                const dataUrl = product.adjunto.base64Content;
                const link = document.createElement('a');

                link.href = dataUrl;
                link.download = product.adjunto.fileName || 'documento_patrimonial.pdf';

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                console.log(`Descargando archivo: ${link.download}`);

            } catch (error) {
                console.error("Error al iniciar la descarga:", error);
            }
        } else {
            console.warn("Este documento no tiene un archivo adjunto para descargar.");
            alert("Este documento fue agregado sin archivo adjunto.");
        }
    };

    // 🔄 Lógica de ÍCONOS AJUSTADA para documentos PATRIMONIALES
    const getIcon = (tipoProducto) => {
        const iconStyleSmall = { size: 28, color: '#4D9DE0' };
        switch (tipoProducto) {
            // Nombres que podrías usar en AgregarPatrimoniales.jsx
            case 'Escritura de Propiedad':
            case 'Título de Vehículo':
                return <MdHomeWork {...iconStyleSmall} />;
            case 'Certificado Bancario':
            case 'Extracto de Inversión':
            case 'Póliza de Seguro':
                return <MdAttachMoney {...iconStyleSmall} />;
            case 'Contrato de Préstamo':
            case 'Estado de Cuenta de Crédito':
                return <MdCreditCard {...iconStyleSmall} />;
            case 'Acciones de Empresa':
                return <MdWork {...iconStyleSmall} />;
            case 'Otro Documento Patrimonial':
            default:
                // MdDescription (📝) es un buen comodín para documentos genéricos
                return <MdDescription {...iconStyleSmall} />;
        }
    };

    const getDescripcion = (year) => {
        return year ? `Fecha: ${year}` : 'Detalle no disponible'; // Cambiado el texto por defecto
    }

    const hasAttachment = product.adjunto && product.adjunto.base64Content;

    return (
        <div className='doc-tributario-card'>

            {/* Área Principal de la Tarjeta (No clicable para navegación) */}
            <div className='doc-card-main-area'>
                <div className='doc-card-content'>
                    {/* Ícono */}
                    <div className='doc-card-icon-section'>
                        {getIcon(product.tipoProducto)}
                    </div>

                    {/* Texto */}
                    <div className='doc-card-text-section'>
                        <span className='doc-card-title'>{product.nombre || product.tipoProducto}</span>
                        <span className='doc-card-description'>{getDescripcion(product.year || product.año)}</span>
                    </div>
                </div>
            </div>

            {/* BOTÓN DE DESCARGA */}
            {hasAttachment && (
                <button
                    className='doc-card-download-btn'
                    onClick={handleDownload}
                    title={`Descargar ${product.adjunto.fileName || 'documento'}`}
                >  
                    <span>Descargar</span>
                    <MdFileDownload size={24} />
                </button>
            )}

        </div>
    );
};


// -------------------------------------------------------------------
// 2. Componente Principal: Mis Documentos Patrimoniales
// -------------------------------------------------------------------
export default function MisDocumentosPatrimoniales() { // ⬅️ CAMBIADO EL NOMBRE
    const navigate = useNavigate();
    const [allDocumentos, setAllDocumentos] = useState([]);
    const [filterYear, setFilterYear] = useState('Todos');

    const iconColor = '#4D9DE0';

    // Cargar documentos
    useEffect(() => {
        const loadProducts = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productosExistentes = productosJSON ? JSON.parse(productosJSON) : [];

                // 🔑 CAMBIO CLAVE: FILTRAR POR 'Documento Patrimonial'
                const productosDocumentos = productosExistentes
                    .filter(p => p.tipo === 'Documento Patrimonial');
                setAllDocumentos(productosDocumentos);

                // Lógica para establecer el filtro inicial (basado en el año o fecha)
                const currentYear = String(new Date().getFullYear());
                const uniqueYears = Array.from(new Set(productosDocumentos.map(p => String(p.year || p.año)).filter(y => y)));

                if (uniqueYears.includes(currentYear)) {
                    setFilterYear(currentYear);
                } else if (uniqueYears.length > 0) {
                    setFilterYear(uniqueYears.sort((a, b) => b - a)[0]);
                } else {
                    setFilterYear('Todos');
                }
            } catch (error) {
                console.error("Error al cargar productos de localStorage:", error);
                setAllDocumentos([]);
            }
        };
        loadProducts();
    }, []);

    // Obtener lista de años únicos
    const availableYears = useMemo(() => {
        const years = allDocumentos
            .map(p => p.year || p.año)
            .filter(y => y);

        const uniqueYears = Array.from(new Set(years)).sort((a, b) => b - a);
        return ['Todos', ...uniqueYears.map(String)];
    }, [allDocumentos]);


    // Filtrar documentos basado en el año seleccionado
    const filteredDocumentos = useMemo(() => {
        if (filterYear === 'Todos') {
            return allDocumentos;
        }
        return allDocumentos.filter(doc => String(doc.year || doc.año) === filterYear);
    }, [allDocumentos, filterYear]);

    // Función para manejar la selección del año en el <select>
    const handleYearSelect = (event) => {
        setFilterYear(event.target.value);
    };

    // Título de la sección
    const currentYearTitle = filterYear !== 'Todos' ? `Documentos ${filterYear}` : 'Todos los Documentos';


    return (
        <div className='doc-tributario-layout'>

            {/* 1. SECCIÓN FIJA SUPERIOR */}
            <div className='doc-tributario-top-section'>
                <div className='doc-tributario-header-bar'>
                    <span className='doc-tributario-back-arrow' onClick={() => navigate("/Migestion-misproductos")}>
                        <MdArrowBack size={24} color={iconColor} />
                    </span>
                    <span className='doc-tributario-header-title'>Mis productos</span>
                </div>

                {/* 📝 CAMBIADO EL TÍTULO */}
                <h1 className='doc-tributario-title'>Documentos Patrimoniales</h1>

                <div className="doc-tributario-banner">
                    {/* 📝 ASUMO UN NUEVO BANNER O PUEDES USAR EL MISMO */}
                    <img src={bannerDocumentos} className="doc-tributario-banner-img" alt="Añade y gestiona tus documentos patrimoniales, de activos y deudas en un solo lugar" />
                </div>
            </div>

            {/* 2. CONTENEDOR DE SCROLL (Lista de Documentos) */}
            <div className='doc-tributario-scroll-area'>

                {/* INICIO: Filtro por Año (DROPDOWN) */}
                <div className='doc-tributario-filter-container'>
                    <div className='doc-tributario-search-header'>
                        <span className='doc-tributario-search-label'>Búsqueda por Año</span>
                    </div>

                    <div className='doc-tributario-dropdown-wrapper'>
                        {/* Dropdown de Selección de Año */}
                        <select
                            className='doc-tributario-year-select'
                            value={filterYear}
                            onChange={handleYearSelect}
                        >
                            {availableYears.map(year => (
                                <option key={year} value={year}>
                                    {year === 'Todos' ? 'Todos los Años' : `Año ${year}`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* FIN: Filtro por Año */}

                {/* Título de la sección de documentos */}
                <h2 className='doc-tributario-filtered-title'>{currentYearTitle}</h2>

                <div className='doc-tributario-list'>
                    {/* Renderizamos los documentos FILTRADOS */}
                    {filteredDocumentos.length > 0 ? (
                        filteredDocumentos.map((documento, index) => (
                            // 📝 Usamos el nuevo componente DocumentCardPatrimonial
                            <DocumentCardPatrimonial
                                key={documento.id || index}
                                product={documento}
                            />
                        ))
                    ) : (
                        // Mensaje si no hay documentos
                        <p className='doc-tributario-empty-message'>
                            {filterYear !== 'Todos'
                                ? `No se encontraron documentos para el año ${filterYear}.`
                                : 'Aún no has agregado ningún documento patrimonial. ¡Comienza a organizar tus activos y pasivos aquí!'}
                        </p>
                    )}
                </div>
            </div>

            {/* 3. Botón Agregar Producto (Fijo) */}
            <button
                className='doc-tributario-add-btn'
                // 🔑 CAMBIO CLAVE: RUTA DE AGREGAR
                onClick={() => navigate('/Migestion-agregardocumentosptrimoniales')}
            >
                Agregar documento
                <MdAdd size={24} color="#fff" style={{ marginLeft: '8px' }} />
            </button>
        </div>
    );
}