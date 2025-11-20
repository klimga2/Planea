import { useNavigate } from 'react-router-dom';
import './Migestion-Gastosfijos.css'; // Importa el CSS final y aislado

import {
	MdChevronLeft,
	MdHome,
	MdLocalHospital,
	MdDirectionsCar,
	MdTheaters,
	MdChat,
	MdStarOutline,
	MdBarChart,
	MdAttachMoney,
	MdBook,
} from 'react-icons/md';

const gastosPorCategoria = [
    { categoria: 'Hogar', items: [
        { icono: MdHome, nombre: 'Renta', subtitulo: 'Vivienda · BBVA', monto: 900000, fecha: '03/10/2025' },
        { icono: MdHome, nombre: 'Internet y TV', subtitulo: 'Vivienda · Nequi', monto: 120000, fecha: '06/10/2025' }
    ]},
    { categoria: 'Salud', items: [
        { icono: MdLocalHospital, nombre: 'EPS', subtitulo: 'Salud · BBVA', monto: 120000, fecha: '03/10/2025' },
        { icono: MdLocalHospital, nombre: 'Seguro médico', subtitulo: 'Salud · BBVA', monto: 60000, fecha: '10/10/2025' }
    ]},
    { categoria: 'Transporte', items: [
        { icono: MdDirectionsCar, nombre: 'Parqueadero', subtitulo: 'Transporte · Nequi', monto: 70000, fecha: '03/10/2025' },
    ]},
    { categoria: 'Suscripciones', items: [
        { icono: MdTheaters, nombre: 'Spotify', subtitulo: 'Entretenimiento · Nu', monto: 18500, fecha: '15/10/2025' },
        { icono: MdTheaters, nombre: 'Netflix', subtitulo: 'Entretenimiento · Nu', monto: 29900, fecha: '04/10/2025' },
        { icono: MdTheaters, nombre: 'Disney +', subtitulo: 'Entretenimiento · Nequi', monto: 24900, fecha: '28/10/2025' },
        { icono: MdTheaters, nombre: 'HBO max', subtitulo: 'Entretenimiento · Nu', monto: 18900, fecha: '25/10/2025' },
    ]}
];

const navItems = [ { icon: MdStarOutline }, { icon: MdBarChart }, { icon: MdHome }, { icon: MdAttachMoney }, { icon: MdBook }];

const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

// --- Componente Principal con Contenedor de Aislamiento ---
const MigestionGastosFijos = () => {
    const navigate = useNavigate();

    return (
        <div className="gastos-fijos-scope"> {/* Contenedor de aislamiento */} 
            <div className="gastos-fijos-page">
                <header className="gf-header">
                    <button onClick={() => navigate('/Migestion-gestionDiaria')} className="back-arrow"><MdChevronLeft /></button>
                    <h1>Gastos fijos</h1>
                </header>

                <main>
                    <div className="gf-summary-card">
                        <div className="summary-section">
                            <p className="amount">$1.362.200</p>
                            <p className="description">Gastos fijos mensuales</p>
                        </div>
                        <div className="divider"></div>
                        <div className="summary-section">
                            <p className="percentage">42.6 %</p>
                            <p className="description">de tus ingresos</p>
                        </div>
                    </div>

                    <div className="gf-gastos-container">
                        <h2>Mis gastos fijos</h2>
                        {gastosPorCategoria.map((grupo, index) => (
                            <section key={index} className="gf-category-group">
                                <h3 className="category-title">{grupo.categoria}</h3>
                                {grupo.items.map((item, itemIndex) => {
                                    const Icono = item.icono;
                                    return (
                                        <article key={itemIndex} className="gf-gasto-card">
                                            <div className="icon-container"><Icono /></div>
                                            <div className="details">
                                                <p className="title">{item.nombre}</p>
                                                <p className="subtitle">{item.subtitulo}</p>
                                            </div>
                                            <div className="amount-section">
                                                <p className="amount">{formatCurrency(item.monto)}</p>
                                                <p className="date">{item.fecha}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </section>
                        ))}
                    </div>
                </main>
            </div>

            {/* --- Elementos Fijos --- */}
            <div className="gf-page-actions">
                <button className="gf-btn primary">Nuevo gasto</button>
                <button className="gf-btn secondary">Administrar gastos</button>
            </div>

            <button className="gf-fab" aria-label="Abrir chat"><MdChat /></button>
            
            <nav className="gf-bottom-nav">
                {navItems.map((item, index) => <div key={index} className="nav-item"><item.icon /></div>)}
            </nav>
        </div>
    );
};

export default MigestionGastosFijos;
