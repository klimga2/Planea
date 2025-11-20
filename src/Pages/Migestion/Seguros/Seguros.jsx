import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdArrowBack,
    MdAdd,
    MdFavoriteBorder, // ❤️ Para Seguro de Vida / Salud
    MdHome,             // 🏠 Para Seguro de Hogar
    MdDirectionsCar,    // 🚗 Para Seguro de Vehículo
    MdShield,           // 🛡️ Para Pólizas en general
    MdAttachMoney,      // 💰 Para Seguro de Cumplimiento / Genérico
} from 'react-icons/md';

// Asumo que tienes un banner específico para seguros, si no, usa el de créditos o crea uno nuevo.
import bannerSeguros from "../../../assets/bannerpolizas.png";
// Mantengo la ruta al CSS existente si los estilos son compartidos, o si lo nombras Seguros.css
import '../Cuentas/MisCuentas.css';

const ProductCard = ({ product, iconStyle, navigate }) => {

    // Función de redirección para ver el detalle de la Póliza
    const handleClick = () => {
        // La ruta de detalle debe ser específica para Seguros
        navigate(`/Migestion-detalleseguros/${product.id}`);
    };

    // Lógica de ícono para Pólizas y Seguros
    const getIcon = (tipoProducto) => {
        // Normalizamos el tipo a mayúsculas para un switch/case más robusto
        const tipoUpper = tipoProducto ? tipoProducto.toUpperCase() : '';

        if (tipoUpper.includes('VIDA') || tipoUpper.includes('SALUD') || tipoUpper.includes('MÉDICO')) {
            return <MdFavoriteBorder {...iconStyle} />; // Corazón o salud
        }
        if (tipoUpper.includes('HOGAR') || tipoUpper.includes('INCENDIO') || tipoUpper.includes('DOMICILIO')) {
            return <MdHome {...iconStyle} />; // Casa
        }
        if (tipoUpper.includes('VEHÍCULO') || tipoUpper.includes('CARRO') || tipoUpper.includes('AUTO')) {
            return <MdDirectionsCar {...iconStyle} />; // Coche
        }
        if (tipoUpper.includes('CUMPLIMIENTO') || tipoUpper.includes('RESPONSABILIDAD')) {
            return <MdAttachMoney {...iconStyle} />; // Dinero/Garantía
        }

        // Default para cualquier otra póliza
        return <MdShield {...iconStyle} />; // Escudo (Seguro genérico)
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
                    <span className='product-title'>{product.tipoProducto || 'Póliza sin nombre'}</span>
                    <span className='product-description'>{getEntidad(product.entidad)}</span>
                </div>
            </div>
        </div>
    );
};


// -------------------------------------------------------------------
// 2. Componente Principal: MisSeguros
// -------------------------------------------------------------------
export default function MisSeguros() {
    const navigate = useNavigate();
    const [seguros, setSeguros] = useState([]);

    const iconColor = '#4D9DE0';
    const iconStyle = { size: 28, color: iconColor };

    // 1. Cargar y filtrar solo las Pólizas/Seguros
    useEffect(() => {
        const loadProducts = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productosExistentes = productosJSON ? JSON.parse(productosJSON) : [];

                // ⭐ FILTRAR SOLO LOS PRODUCTOS DE TIPO 'Póliza' o 'Seguro'
                const productosSeguro = productosExistentes
                    .filter(p => p.tipo === 'Póliza' || p.tipo === 'Seguro');

                setSeguros(productosSeguro);
            } catch (error) {
                console.error("Error al cargar productos de localStorage:", error);
                setSeguros([]);
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
                <h1 className='cuentas-title'>Pólizas y Seguros</h1>

                {/* Banner de los seguros */}
                <div className="bannercuenta">
                    <img src={bannerSeguros} className="banner-img" alt="Añade y gestiona tus pólizas y seguros" />
                    {/*  */}
                </div>
            </div>

            {/* 2. CONTENEDOR DE SCROLL (Lista de Seguros) */}
            <div className='product-list-scroll-area'>
                <div className='product-list'>
                    {seguros.length > 0 ? (
                        seguros.map((seguro, index) => (
                            <ProductCard
                                key={seguro.id || index}
                                product={seguro}
                                iconStyle={iconStyle}
                                navigate={navigate}
                            />
                        ))
                    ) : (
                        // Mensaje si no hay pólizas
                        <p className='product-description' style={{ textAlign: 'center', marginTop: '20px' }}>
                            Aún no has agregado ninguna póliza o seguro. ¡Protege tu patrimonio!
                        </p>
                    )}
                </div>
            </div>

            {/* 3. Botón Agregar Producto (Fijo) */}
            <button
                className='add-product-btn'
                // La ruta de agregar debe ser específica para Seguros
                onClick={() => navigate('/Migestion-agregarseguro')}
            >
                Agregar Póliza/Seguro
                <MdAdd size={24} color="#fff" style={{ marginLeft: '8px' }} />
            </button>
        </div>
    );
}