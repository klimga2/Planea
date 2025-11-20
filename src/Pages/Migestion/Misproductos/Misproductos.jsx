import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MdArrowBack,
    MdCreditCard,
    MdAccountBalance,
    MdShowChart,
    MdTrendingUp,
    MdVerifiedUser,
    MdArticle,
    MdAdd,
    MdOutlineAccountBalanceWallet,
    MdWork,
} from 'react-icons/md';

import bannerProductos from "../../../assets/misproductosbanner.png";

import './MisProductos.css'; // Asegúrate de que este archivo CSS existe

// --- Componente Principal ---
export default function MigestionMisProductos() {
    const navigate = useNavigate();

    // ⭐ NUEVO COLOR PARA LOS ÍCONOS
    const iconColor = '#4D9DE0';
    const iconStyle = { size: 28, color: iconColor };

    // Datos de la lista de productos
    const productList = [
        {
            icon: <MdOutlineAccountBalanceWallet {...iconStyle} />,
            title: 'Efectivo',
            description: 'Agrega y gestiona tu efectivo disponible',
            link: '/Migestion-efectivo',
        },
        {
            icon: <MdAccountBalance {...iconStyle} />,
            title: 'Cuentas',
            description: 'Consulta tus cuentas de ahorro y depósitos',
            link: '/Migestion-miscuentas',
        },
        {
            icon: <MdCreditCard {...iconStyle} />,
            title: 'Medios de pago',
            description: 'Visualiza tus tarjetas débito y crédito en un solo lugar',
            link: '/Migestion-mediosdepago',
        },
        {
            icon: <MdShowChart {...iconStyle} />,
            title: 'Créditos',
            description: 'Consulta tus préstamos activos y sus condiciones',
            link: '/Migestion-miscreditos',
        },
        {
            icon: <MdTrendingUp {...iconStyle} />,
            title: 'Inversión',
            description: 'Revisa tus cuentas y portafolios de inversión activas',
            link: '/Migestion-misinversiones',
        },
        {
            icon: <MdVerifiedUser {...iconStyle} />,
            title: 'Pólizas y seguros',
            description: 'Visualiza y gestiona tus pólizas de vida, salud, hogar y más',
            link: '/Migestion-polizasyseguros',
        },
        {
            icon: <MdWork {...iconStyle} />,
            title: 'Pensión',
            description: 'Consulta tus fondos obligatorios, voluntarios o BEPS',
            link: '/Migestion-pensiones',
        },
        {
            icon: <MdArticle {...iconStyle} />,
            title: 'Documentos tributarios',
            description: 'Guarda y descarga tus declaraciones y certificados tributarios',
            link: '/Migestion-documentostributarios',
        },
        {
            icon: <MdArticle {...iconStyle} />,
            title: 'Documentos patrimoniales',
            description: 'Gestiona escrituras, testamentos y documentos de tus bienes',
            link: '/Migestion-documentosptrimoniales',
        },
    ];

    return (
        <div className='mis-productos-container'>
            {/* Top Bar (Barra de Navegación) */}
            <div className='top-bar'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-gestionDiaria")}>
                    {/* Flecha de retroceso con el nuevo color */}
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Mis productos</span>
            </div>

           <div className="banner">
             <img src={bannerProductos} className="banner-img" />
           </div>

            {/* Lista de Productos */}
            <div className='product-list'>
                {productList.map((product, index) => (
                    <div key={index} className='product-row-card' onClick={() => product.link && navigate(product.link)}>
                        <div className='iconinntos'>
                        <div className='product-icon-section'>
                            {product.icon}
                        </div>
                        <MdArrowBack size={24} color="#7cadcdff" style={{ transform: 'rotate(180deg)' }} />
                      </div>

                        <div className='product-text-section'>
                            <span className='product-title'>{product.title}</span>
                            <span className='product-description'>{product.description}</span>
                        </div>
                        {/* Flecha de navegación con color gris/azul sutil */}

                    </div>
                ))}
            </div>


        </div>
    );
}