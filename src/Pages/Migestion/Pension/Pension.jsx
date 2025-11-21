import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdArrowBack,
    MdAdd,
    MdWork,              // 💼 Para Pensión Obligatoria
    MdTrendingUp,        // 📈 Para BEPS (Crecimiento)
    MdShield,            // 🛡️ Genérico de Protección
    MdFavoriteBorder,    // ❤️ Para Pensión Voluntaria (como opción de diferenciación)
} from 'react-icons/md';

import bannerPensiones from "../../../assets/bannerpension.png";
import '../Cuentas/MisCuentas.css';


// -------------------------------------------------------------------
// 1. Componente para la Tarjeta de Pensión/Ahorro
// -------------------------------------------------------------------

const ProductCard = ({ product, iconStyle, navigate }) => {

    const handleClick = () => {
        navigate(`/Migestion-detallepension/${product.id}`);
    };

    // Lógica de ícono para Pensiones
    const getIcon = (tipoProducto) => {
        const tipoUpper = tipoProducto ? tipoProducto.toUpperCase() : '';

        // 1. ✅ BEPS (Beneficios Económicos Periódicos)
        if (tipoUpper.includes('BEPS')) {
            return <MdTrendingUp {...iconStyle} />; // 📈 Crecimiento
        }

        // 2. ✅ OBLIGATORIA
        if (tipoUpper.includes('OBLIGATORIA')) {
            return <MdWork {...iconStyle} />; // 💼 Trabajo/Vejez
        }

        // 3. ✅ VOLUNTARIA
        if (tipoUpper.includes('VOLUNTARIA')) {
            return <MdFavoriteBorder {...iconStyle} />; // ❤️ Ahorro Voluntario/Cuidado
        }

        // 4. 🛡️ Default
        return <MdShield {...iconStyle} />;
    };

    const getEntidad = (entidad) => {
        return entidad && entidad !== 'Selecciona la entidad' ? entidad : 'Sin Entidad';
    }

    return (
        <div className='product-row-card' onClick={handleClick}>
            <div className='iconintos'>
                <div className='product-icon-section'>
                    {getIcon(product.tipoProducto)}
                </div>

                <div className='product-text-section'>
                    <span className='product-title'>{product.tipoProducto || 'Pensión sin nombre'}</span>
                    <span className='product-description'>{getEntidad(product.entidad)}</span>
                </div>
            </div>
        </div>
    );
};


// -------------------------------------------------------------------
// 2. Componente Principal: MisPensiones
// -------------------------------------------------------------------
export default function MisPensiones() {
    const navigate = useNavigate();
    const [pensiones, setPensiones] = useState([]);

    const iconColor = '#4D9DE0';
    const iconStyle = { size: 28, color: iconColor };

    // 1. Cargar y filtrar solo las Pensiones
    useEffect(() => {
        const loadProducts = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productosExistentes = productosJSON ? JSON.parse(productosJSON) : [];

                const productosPension = productosExistentes
                    .filter(p => p.tipo === 'Pensión');

                setPensiones(productosPension);
            } catch (error) {
                console.error("Error al cargar productos de localStorage:", error);
                setPensiones([]);
            }
        };

        loadProducts();
    }, []);


    return (
        <div className='mis-cuentas-screen-layout'>

            {/* 1. SECCIÓN FIJA SUPERIOR */}
            <div className='Partedearriba'>
                <div className='top-bar'>
                    <span className='back-arrow' onClick={() => navigate("/Migestion-misproductos")}>
                        <MdArrowBack size={24} color={iconColor} />
                    </span>
                    <span className='top-bar-title'>Mis productos</span>
                </div>

                <h1 className='cuentas-title'>Pensiones y Ahorro</h1>

                <div className="bannercuenta">
                    <img src={bannerPensiones} className="banner-img" alt="Añade y gestiona tus fondos de pensión y ahorro" />
                </div>
            </div>

            {/* 2. CONTENEDOR DE SCROLL (Lista de Pensiones) */}
            <div className='product-list-scroll-area'>
                <div className='product-list'>
                    {pensiones.length > 0 ? (
                        pensiones.map((pension, index) => (
                            <ProductCard
                                key={pension.id || index}
                                product={pension}
                                iconStyle={iconStyle}
                                navigate={navigate}
                            />
                        ))
                    ) : (
                        <p className='product-description' style={{ textAlign: 'center', marginTop: '20px' }}>
                            Aún no has agregado ninguna pensión. ¡Comienza a asegurar tu futuro!
                        </p>
                    )}
                </div>
            </div>

            {/* 3. Botón Agregar Producto (Fijo) */}
            <button
                className='add-product-btn'
                onClick={() => navigate('/Migestion-agregarpension')}
            >
                Agregar Pensión/Fondo
                <MdAdd size={24} color="#fff" style={{ marginLeft: '8px' }} />
            </button>
        </div>
    );
}