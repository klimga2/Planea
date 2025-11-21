import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Migestion-Gastosfijos.css';
import BottomNav from '../../Components/BottomNav';
import {
    FiChevronLeft,
    FiMessageSquare,
    FiDollarSign // Único icono necesario
} from 'react-icons/fi';

const initialGastos = [
    { categoria: 'Hogar', items: [
        { icono: 'FiDollarSign', nombre: 'Renta', subtitulo: 'Vivienda · BBVA', monto: 900000, fecha: '03/10/2025' },
        { icono: 'FiDollarSign', nombre: 'Internet y TV', subtitulo: 'Vivienda · Nequi', monto: 120000, fecha: '06/10/2025' }
    ]},
    { categoria: 'Salud', items: [
        { icono: 'FiDollarSign', nombre: 'EPS', subtitulo: 'Salud · BBVA', monto: 120000, fecha: '03/10/2025' },
        { icono: 'FiDollarSign', nombre: 'Seguro médico', subtitulo: 'Salud · BBVA', monto: 60000, fecha: '10/10/2025' }
    ]},
    { categoria: 'Transporte', items: [
        { icono: 'FiDollarSign', nombre: 'Parqueadero', subtitulo: 'Transporte · Nequi', monto: 70000, fecha: '03/10/2025' },
    ]},
    { categoria: 'Suscripciones', items: [
        { icono: 'FiDollarSign', nombre: 'Spotify', subtitulo: 'Entretenimiento · Nu', monto: 18500, fecha: '15/10/2025' },
        { icono: 'FiDollarSign', nombre: 'Netflix', subtitulo: 'Entretenimiento · Nu', monto: 29900, fecha: '04/10/2025' },
        { icono: 'FiDollarSign', nombre: 'Disney +', subtitulo: 'Entretenimiento · Nequi', monto: 24900, fecha: '28/10/2025' },
        { icono: 'FiDollarSign', nombre: 'HBO max', subtitulo: 'Entretenimiento · Nu', monto: 18900, fecha: '25/10/2025' },
    ]}
];

const formatCurrency = (value) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const NuevoGastoFijoPopup = ({ onClose, onSave }) => {
    const [monto, setMonto] = useState('153000');
    const [frecuencia, setFrecuencia] = useState('Mensual');
    const [titulo, setTitulo] = useState('Suscripción');
    const [categoria, setCategoria] = useState('Suscripciones');
    const [desde, setDesde] = useState('BBVA');
    const [fecha, setFecha] = useState('14 de cada mes');

    const handleSave = () => {
        const newGasto = {
            icono: 'FiDollarSign', // Asignar siempre el icono de dinero
            nombre: titulo,
            subtitulo: `Entretenimiento · ${desde}`,
            monto: parseInt(monto.replace(/[.,]/g, ''), 10),
            fecha,
            categoria: 'Suscripciones',
        };
        onSave(newGasto);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="gf-popup-overlay" onClick={handleOverlayClick}>
            <div className="gf-popup-content">
                <header className="gf-popup-header">
                    <button onClick={onClose} className="gf-back-button"><FiChevronLeft /></button>
                    <h2>Nuevo gasto fijo</h2>
                </header>
                <div className="gf-popup-body">
                    <div className="gf-amount-input">
                        <span>$</span>
                        <input type="text" value={new Intl.NumberFormat('es-CO').format(monto)} onChange={(e) => {
                            const value = e.target.value.replace(/[.,]/g, '');
                            if (!isNaN(value)) {
                                setMonto(value);
                            }
                        }} />
                    </div>
                    <div className="gf-frequency-selector">
                        <button className={frecuencia === 'Mensual' ? 'active' : ''} onClick={() => setFrecuencia('Mensual')}>Mensual</button>
                        <button className={frecuencia === 'Semanal' ? 'active' : ''} onClick={() => setFrecuencia('Semanal')}>Semanal</button>
                        <button className={frecuencia === 'Quincenal' ? 'active' : ''} onClick={() => setFrecuencia('Quincenal')}>Quincenal</button>
                    </div>
                    <div className="gf-form-group"><label>Título</label><input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} /></div>
                    <div className="gf-form-group"><label>Categoría</label><input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} /></div>
                    <div className="gf-form-group"><label>Desde</label><input type="text" value={desde} onChange={(e) => setDesde(e.target.value)} /></div>
                    <div className="gf-form-group"><label>Fecha</label><input type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} /></div>
                </div>
                <div className="gf-popup-footer"><button className="gf-btn primary" onClick={handleSave}>Guardar</button></div>
            </div>
        </div>
    );
};

const MigestionGastosFijos = () => {
    const navigate = useNavigate();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [gastosPorCategoria, setGastosPorCategoria] = useState([]);

    useEffect(() => {
        const storedGastos = localStorage.getItem('gastosFijos');
        if (storedGastos) {
            setGastosPorCategoria(JSON.parse(storedGastos));
        } else {
            setGastosPorCategoria(initialGastos);
        }
    }, []);

    const handleAddGasto = (newGasto) => {
        const updatedGastos = [...gastosPorCategoria];
        const categoryIndex = updatedGastos.findIndex(g => g.categoria === newGasto.categoria);

        if (categoryIndex > -1) {
            updatedGastos[categoryIndex].items.push(newGasto);
        } else {
            updatedGastos.push({ categoria: newGasto.categoria, items: [newGasto] });
        }

        setGastosPorCategoria(updatedGastos);
        localStorage.setItem('gastosFijos', JSON.stringify(updatedGastos));
        setPopupOpen(false);
    };

    return (
        <div className="gastos-fijos-scope"> 
            <div className="gastos-fijos-page">
                <header className="gf-header">
                    <button onClick={() => navigate('/Migestion-gestionDiaria')} className="gf-back-button"><FiChevronLeft /></button>
                    <h1>Gastos fijos</h1>
                </header>

                <main>
                    <div className="gf-summary-card">
                        <div className="summary-section"><p className="amount">$1.362.200</p><p className="description">Gastos fijos mensuales</p></div>
                        <div className="divider"></div>
                        <div className="summary-section"><p className="percentage">42.6 %</p><p className="description">de tus ingresos</p></div>
                    </div>

                    <div className="gf-gastos-container">
                        <h2>Mis gastos fijos</h2>
                        {gastosPorCategoria.map((grupo, index) => (
                            <section key={index} className="gf-category-group">
                                <h3 className="category-title">{grupo.categoria}</h3>
                                {grupo.items.map((item, itemIndex) => {
                                    const Icono = FiDollarSign; // Usar siempre el icono de dinero
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

            {isPopupOpen && <NuevoGastoFijoPopup onClose={() => setPopupOpen(false)} onSave={handleAddGasto} />}

            <div className="gf-page-actions">
                <button className="gf-btn primary" onClick={() => setPopupOpen(true)}>Nuevo gasto</button>
                <button className="gf-btn secondary" onClick={() => navigate('/Migestion-Gastosfijos-admin')}>Administrar gastos</button>
            </div>

            <button className="gf-fab" aria-label="Abrir chat"><FiMessageSquare /></button>
            
            <nav className='bottom-nav' aria-label='Navegación principal'>
                <BottomNav />
            </nav>
        </div>
    );
};

export default MigestionGastosFijos;
