import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdArrowBack,
    MdAdd,
    MdHome,          // 🏠 Para Hipotecario
    MdDirectionsCar, // 🚗 Para Vehículo
    MdSchool,        // 🎓 Para Educativo
    MdAttachMoney,   // 💰 Para Libre Inversión / Genérico
    MdAccountBalance,
    MdRepeat,        // 🔁 Para Crédito Rotativo
    MdWork,          // 💼 Para Microcrédito
} from 'react-icons/md';

import bannerCreditos from "../../../assets/bannercreditos.png";
import './Creditos.css';

// -------------------------------------------------------------------
// 1. Componente para la Tarjeta de Crédito/Préstamo
// -------------------------------------------------------------------

const ProductCard = ({ product, iconStyle, navigate }) => {

    // Función de redirección para ver el detalle del crédito
    const handleClick = () => {
        // Navega usando el ID persistente (numérico)
        navigate(`/Migestion-creditos/detalle/${product.id}`);
    };

    // Lógica de ícono
    const getIcon = (tipoProducto) => {
        switch (tipoProducto) {
            case 'Hipotecario':
                return <MdHome {...iconStyle} />;
            case 'Vehículo':
                return <MdDirectionsCar {...iconStyle} />;
            case 'Educativo':
                return <MdSchool {...iconStyle} />;
            case 'Rotativo':
                return <MdRepeat {...iconStyle} />;
            case 'Microcrédito':
                return <MdWork {...iconStyle} />;
            case 'Libre inversión':
                return <MdAttachMoney {...iconStyle} />;
            default:
                return <MdAccountBalance {...iconStyle} />;
        }
    };

    const getEntidad = (entidad) => {
        return entidad && entidad !== 'Selecciona la entidad' ? entidad : 'Sin Entidad';
    }

    return (
        <div className='product-row-card' onClick={handleClick}>
            <div className='iconintos'>
                {/* Ícono */}
                <div className='product-icon-section'>
                    {getIcon(product.tipoProducto)}
                </div>

                {/* Texto */}
                <div className='product-text-section'>
                    <span className='product-title'>{product.tipoProducto}</span>
                    <span className='product-description'>{getEntidad(product.entidad)}</span>
                </div>
            </div>
        </div>
    );
};


// -------------------------------------------------------------------
// 2. Componente Principal: Mis Créditos
// -------------------------------------------------------------------
export default function MisCreditos() {
    const navigate = useNavigate();
    const [creditos, setCreditos] = useState([]);

    const iconColor = '#4D9DE0';
    const iconStyle = { size: 28, color: iconColor };

    // 1. Cargar y filtrar solo los Créditos
    useEffect(() => {
        const loadProducts = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productosExistentes = productosJSON ? JSON.parse(productosJSON) : [];

                // FILTRAR SOLO LOS PRODUCTOS DE TIPO 'Crédito'.
                // Confiamos en que el ID ya es numérico y persistente.
                const productosCredito = productosExistentes
                    .filter(p => p.tipo === 'Crédito');

                setCreditos(productosCredito);
            } catch (error) {
                console.error("Error al cargar productos de localStorage:", error);
                setCreditos([]);
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

                {/* Título adaptado */}
                <h1 className='cuentas-title'>Créditos</h1>

                {/* Banner de los créditos */}
                <div className="bannercuenta">
                    <img src={bannerCreditos} className="banner-img" alt="Añade y gestiona tus créditos y préstamos en un solo lugar" />
                </div>
            </div>

            {/* 2. CONTENEDOR DE SCROLL (Lista de Créditos) */}
            <div className='product-list-scroll-area'>
                <div className='product-list'>
                    {creditos.length > 0 ? (
                        creditos.map((credito, index) => (
                            <ProductCard
                                key={credito.id || index}
                                product={credito}
                                iconStyle={iconStyle}
                                navigate={navigate}
                            />
                        ))
                    ) : (
                        // Mensaje si no hay tarjetas
                        <p className='product-description' style={{ textAlign: 'center', marginTop: '20px' }}>
                            Aún no has agregado ningún crédito. ¡Comienza a gestionar tus deudas aquí!
                        </p>
                    )}
                </div>
            </div>

            {/* 3. Botón Agregar Producto (Fijo) */}
            <button
                className='add-product-btn'
                onClick={() => navigate('/Migestion-agregarcreditos')}
            >
                Agregar producto
                <MdAdd size={24} color="#fff" style={{ marginLeft: '8px' }} />
            </button>
        </div>
    );
}