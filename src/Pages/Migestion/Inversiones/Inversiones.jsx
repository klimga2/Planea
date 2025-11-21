import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdArrowBack,
    MdAdd,
    MdTrendingUp,  // Para Carteras Colectivas / Fondos de Inversión (Crecimiento)
    MdTimer,       // Para CDTs (Tiempo/Plazo)
    MdShowChart,   // Para Acciones (Gráfica bursátil)
    MdCloudQueue   // Para Inversiones Virtuales/Fiducias
} from 'react-icons/md';

import bannerInversiones from "../../../assets/bannerinversion.png";
import '../Cuentas/MisCuentas.css';

// -------------------------------------------------------------------
// 1. Componente Reutilizable: ProductCard (Lógica de Ícono Dinámico)
// -------------------------------------------------------------------
const ProductCard = ({ product, iconStyle, navigate }) => {

    // Función de redirección
    const handleClick = () => {
        navigate(`/Migestion-detalleinversion/${product.id}`);
    };

    // ✅ Lógica condicional para los ÍCONOS
    const getIcon = (tipo) => {
        // Normalizamos a mayúsculas para evitar errores de texto (ej: "Cdt", "Fondo", "cartera")
        const tipoUpper = tipo ? tipo.toUpperCase() : '';

        if (tipoUpper.includes('CDT')) {
            // Icono de reloj para Certificados de Depósito a TÉRMINO
            return <MdTimer {...iconStyle} />;
        }
        else if (tipoUpper.includes('CARTERA COLECTIVA') || tipoUpper.includes('FONDO')) {
            // Icono de crecimiento/gráfica para Carteras Colectivas / Fondos de Inversión
            return <MdTrendingUp {...iconStyle} />;
        }
        else if (tipoUpper.includes('ACCION')) {
            // Icono de gráfica para Acciones
            return <MdShowChart {...iconStyle} />;
        }
        else if (tipoUpper.includes('VIRTUAL') || tipoUpper.includes('FIDUCIA')) {
            // Icono de nube para Inversiones Virtuales/Fiducias
            return <MdCloudQueue {...iconStyle} />;
        }

        // Default: Usamos el icono de tendencia si no coincide con los anteriores
        return <MdTrendingUp {...iconStyle} />;
    };

    const getEntidad = (entidad) => {
        return entidad && entidad !== 'Selecciona la entidad' ? entidad : 'Sin Entidad';
    }

    return (
        <div className='product-row-card' onClick={handleClick}>
            <div className='iconintos'>
                {/* Ícono dinámico según el tipo */}
                <div className='product-icon-section'>
                    {getIcon(product.tipoProducto)}
                </div>

                {/* Texto de la inversión */}
                <div className='product-text-section'>
                    <span className='product-title'>{product.tipoProducto || 'Inversión sin nombre'}</span>
                    <span className='product-description'>{getEntidad(product.entidad)}</span>
                </div>
            </div>
        </div>
    );
};

// -------------------------------------------------------------------
// 2. Componente Principal: MisInversiones
// -------------------------------------------------------------------
export default function MisInversiones() {
    const navigate = useNavigate();
    const [inversiones, setInversiones] = useState([]);

    const iconColor = '#4D9DE0';
    const iconStyle = { size: 28, color: iconColor };

    // 1. Cargar las inversiones al montar el componente
    useEffect(() => {
        const loadProducts = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productosExistentes = productosJSON ? JSON.parse(productosJSON) : [];

                // ⭐ FILTRAR SOLO LOS PRODUCTOS DE TIPO 'Inversión'
                const productosInversion = productosExistentes
                    .filter(p => p.tipo === 'Inversión')
                    .map((p, index) => ({
                        ...p,
                        // Asegura un ID
                        id: p.id || `inv-${index + 1}`
                    }));

                setInversiones(productosInversion);
            } catch (error) {
                console.error("Error al cargar productos de localStorage:", error);
                setInversiones([]);
            }
        };

        loadProducts();
    }, []);


    return (
        <div className='mis-cuentas-screen-layout'>

            {/* 1. SECCIÓN FIJA SUPERIOR (Partedearriba) */}
            <div className='Partedearriba'>
                <div className='top-bar'>
                    <span className='back-arrow' onClick={() => navigate("/Migestion-misproductos")}>
                        <MdArrowBack size={24} color={iconColor} />
                    </span>
                    <span className='top-bar-title'>Mis productos</span>
                </div>

                <h1 className='cuentas-title'>Mis Inversiones</h1>

                {/* Banner de las inversiones */}
                <div className="bannercuenta">
                    <img
                        src={bannerInversiones}
                        className="banner-img"
                        alt="Añade y gestiona tus inversiones y mira su rentabilidad"
                    />
                </div>
            </div>

            {/* 2. CONTENEDOR DE SCROLL (Lista de Inversiones) */}
            <div className='product-list-scroll-area'>
                <div className='product-list'>
                    {inversiones.length > 0 ? (
                        inversiones.map((inversion, index) => (
                            <ProductCard
                                key={inversion.id || index}
                                product={inversion}
                                iconStyle={iconStyle}
                                navigate={navigate}
                            />
                        ))
                    ) : (
                        // Mensaje si no hay inversiones
                        <p className='product-description' style={{ textAlign: 'center', marginTop: '20px' }}>
                            Aún no has agregado ninguna inversión. ¡Empieza a crecer tu patrimonio!
                        </p>
                    )}
                </div>
            </div>

            {/* 3. Botón Agregar Producto (Fijo) */}
            <button
                className='add-product-btn'
                onClick={() => navigate('/Migestion-agregarinversion')}
            >
                Agregar inversión
                <MdAdd size={24} color="#fff" style={{ marginLeft: '8px' }} />
            </button>
        </div>
    );
}