import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdArrowBack,
    MdAdd,
    MdCreditCard,
    MdOutlineLocalAtm, // Icono para Débito (opcional, simula fondos)
    MdTrendingUp,
} from 'react-icons/md';

// Asumimos que los assets y el CSS de Cuentas son accesibles
import bannerMediosdepago from "../../../assets/mediosdepagobanner.png"; // Usamos el nombre del banner de tu código
import '../Cuentas/MisCuentas.css'; // Reutilizamos el CSS de MisCuentas

// -------------------------------------------------------------------
// 1. Componente para la Tarjeta de Medio de Pago
// -------------------------------------------------------------------
const ProductCard = ({ product, iconStyle, navigate }) => {

    // Función de redirección para ver el detalle de la tarjeta
    const handleClick = () => {
        // Redirige a la ruta de detalle usando el ID del producto
        navigate(`/Migestion-mediosdepago/detalle/${product.id}`);
    };

    // Determina el ícono basado en el tipo de tarjeta
    const getIcon = (tipoProducto) => {
        switch (tipoProducto) {
            case 'Tarjeta Débito':
                // Ícono para simular acceso a fondos/débito
                return <MdOutlineLocalAtm {...iconStyle} />;
            case 'Tarjeta Crédito':
                // Ícono clásico de tarjeta de crédito
                return <MdCreditCard {...iconStyle} />;
            default:
                return <MdCreditCard {...iconStyle} />;
        }
    };

    const getEntidad = (entidad) => {
        return entidad && entidad !== 'Selecciona la entidad' ? entidad : 'Sin Entidad';
    }

    // ⭐ Se llama a handleClick en el onClick del div
    return (
        <div className='product-row-card' onClick={handleClick}>
            <div className='iconintos'>
                {/* Ícono de la tarjeta */}
                <div className='product-icon-section'>
                    {getIcon(product.tipoProducto)}
                </div>

                {/* Texto de la tarjeta */}
                <div className='product-text-section'>
                    <span className='product-title'>{product.tipoProducto}</span>
                    <span className='product-description'>{getEntidad(product.entidad)}</span>
                </div>
            </div>
        </div>
    );
};


// -------------------------------------------------------------------
// 2. Componente Principal
// -------------------------------------------------------------------
export default function MisMediosDePago() {
    const navigate = useNavigate();
    const [mediosDePago, setMediosDePago] = useState([]);

    const iconColor = '#4D9DE0';
    const iconStyle = { size: 28, color: iconColor };

    // 1. Cargar los medios de pago al montar el componente
    useEffect(() => {
        const loadProducts = () => {
            try {
                const productosJSON = localStorage.getItem('productos_gestion');
                const productosExistentes = productosJSON ? JSON.parse(productosJSON) : [];

                // ⭐ FILTRAR SOLO LOS PRODUCTOS DE TIPO 'Medio de Pago'
                const productosMedioPago = productosExistentes
                    .filter(p => p.tipo === 'Medio de Pago')
                    .map((p, index) => ({
                        ...p,
                        // Asegura un ID, aunque el de Date.now() en el guardado ya debería funcionar
                        id: p.id || `mp-${index + 1}`
                    }));

                setMediosDePago(productosMedioPago);
            } catch (error) {
                console.error("Error al cargar productos de localStorage:", error);
                setMediosDePago([]);
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

                {/* ✏️ CAMBIO: Título adaptado */}
                <h1 className='cuentas-title'>Medios de Pago</h1>

                {/* Banner de los medios de pago */}
                <div className="bannercuenta">
                    <img src={bannerMediosdepago} className="banner-img" alt="Añade y gestiona tus tarjetas en un solo lugar" />
                    {/*  */}
                </div>
            </div>

            {/* 2. CONTENEDOR DE SCROLL (Lista de Medios de Pago) */}
            <div className='product-list-scroll-area'>
                <div className='product-list'>
                    {mediosDePago.length > 0 ? (
                        mediosDePago.map((medio, index) => (
                            <ProductCard
                                key={medio.id || index}
                                product={medio}
                                iconStyle={iconStyle}
                                // ⭐ PASAR LA FUNCIÓN navigate COMO PROP
                                navigate={navigate}
                            />
                        ))
                    ) : (
                        // Mensaje si no hay tarjetas
                        <p className='product-description' style={{ textAlign: 'center', marginTop: '20px' }}>
                            Aún no tienes tarjetas guardadas. ¡Agrega una!
                        </p>
                    )}
                </div>
            </div>

            {/* 3. Botón Agregar Producto (Fijo) */}
            <button
                className='add-product-btn'
                // ⭐ NAVEGACIÓN A LA RUTA CORRECTA DE AGREGAR MEDIO DE PAGO
                onClick={() => navigate('/Migestion-agregarmediodepago')}
            >
                Agregar producto
                <MdAdd size={24} color="#fff" style={{ marginLeft: '8px' }} />
            </button>
        </div>
    );
}