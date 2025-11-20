import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdArrowBack,
    MdCreditCard,
    MdAccountBalance,
    MdTrendingUp,
    MdAdd,
    MdOutlineAccountBalanceWallet,
    MdWork,
} from 'react-icons/md';

import bannerCuentas from "../../../assets/bannercuentas.png";
import './MisCuentas.css';

// Componente para la Tarjeta de Cuenta
// ⭐ ACEPTA 'navigate' y 'product' (que contiene el ID)
const ProductCard = ({ product, iconStyle, navigate }) => {

    // Función de redirección
    const handleClick = () => {
        // Redirige a la ruta de detalle usando el ID del producto
        navigate(`/Migestion-miscuentas/detalle/${product.id}`);
    };

    // Determina el icono basado en el tipo de cuenta
    const getIcon = (tipoCuenta) => {
        switch (tipoCuenta) {
            case 'Ahorro':
                return <MdOutlineAccountBalanceWallet {...iconStyle} />;
            case 'Corriente':
                return <MdCreditCard {...iconStyle} />;
            case 'Depósito electrónico':
                return <MdWork {...iconStyle} />;
            case 'Depósito a término':
                return <MdTrendingUp {...iconStyle} />;
            default:
                return <MdAccountBalance {...iconStyle} />;
        }
    };

    // ⭐ Se llama a handleClick en el onClick del div
    return (
        <div className='product-row-card' onClick={handleClick}>
            <div className='iconintos'>
                {/* Ícono de la cuenta */}
                <div className='product-icon-section'>
                    {getIcon(product.tipoCuenta)}
                </div>

                {/* Texto de la cuenta */}
                <div className='product-text-section'>
                    <span className='product-title'>{product.tipoCuenta}</span>
                    <span className='product-description'>{product.entidad}</span>
                </div>
            </div>
        </div>
    );
};


// --- Componente Principal ---
export default function MisCuentas() {
    const navigate = useNavigate();
    const [cuentas, setCuentas] = useState([]);

    const iconColor = '#4D9DE0';
    const iconStyle = { size: 28, color: iconColor };

    // 1. Cargar las cuentas al montar el componente
    useEffect(() => {
        const loadProducts = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productosExistentes = productosJSON ? JSON.parse(productosJSON) : [];

                // Asegúrate de que cada producto tenga un ID único (si no lo tiene ya)
                const productosConId = productosExistentes.map((p, index) => ({
                    ...p,
                    // Usar 'id' si ya existe, si no, crear uno temporal o basado en el índice
                    id: p.id || (index + 1)
                })).filter(p => p.tipo === 'Cuenta Bancaria');

                setCuentas(productosConId);
            } catch (error) {
                console.error("Error al cargar productos de localStorage:", error);
                setCuentas([]);
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

                <h1 className='cuentas-title'>Mis Cuentas</h1>

                {/* Banner de las cuentas */}
                <div className="bannercuenta">
                    <img src={bannerCuentas} className="banner-img" alt="Consulta y organiza tus cuentas de ahorro y depósitos en un solo lugar" />
                </div>
            </div>

            {/* 2. CONTENEDOR DE SCROLL (Lista de Cuentas) */}
            <div className='product-list-scroll-area'>
                <div className='product-list'>
                    {cuentas.length > 0 ? (
                        cuentas.map((cuenta, index) => (
                            <ProductCard
                                key={cuenta.id || index}
                                product={cuenta}
                                iconStyle={iconStyle}
                                // ⭐ PASAR LA FUNCIÓN navigate COMO PROP
                                navigate={navigate}
                            />
                        ))
                    ) : (
                        <p className='product-description' style={{ textAlign: 'center', marginTop: '20px' }}>
                            Aún no tienes cuentas guardadas. ¡Agrega una!
                        </p>
                    )}
                </div>
            </div>

            {/* 3. Botón Agregar Producto (Fijo) */}
            <button
                className='add-product-btn'
                onClick={() => navigate('/Migestion-agregarahorro')}
            >
                Agregar producto
                <MdAdd size={24} color="#fff" style={{ marginLeft: '8px' }} />
            </button>
        </div>
    );
}