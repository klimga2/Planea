import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Migestion-Gastosfijos-admin.css';
import {
    MdChevronLeft,
    MdTheaters,
    MdHome,
    MdWaterDrop,
    MdLocalGasStation,
    MdSportsVolleyball,
    MdEdit
} from 'react-icons/md';

const initialSuscripciones = [
    { id: 1, icon: MdTheaters, title: 'Netflix', subtitle: '11 de cada mes', amount: '-$36.000', details: { fecha: '11 de cada mes', metodoPago: 'Nequi', categoria: 'Suscripción', fullAmount: '-$36.000' } },
    { id: 2, icon: MdHome, title: 'Renta', subtitle: '21 de cada mes', amount: '-$1.200.000', details: { fecha: '3 cada mes', metodoPago: 'BBVA', categoria: 'Vivienda', fullAmount: '-$900.000' } },
    { id: 3, icon: MdWaterDrop, title: 'Agua', subtitle: '21 de cada mes', amount: '-$230.000', details: { fecha: '21 de cada mes', metodoPago: 'Nequi', categoria: 'Vivienda', fullAmount: '-$230.000' } },
    { id: 4, icon: MdLocalGasStation, title: 'Gas', subtitle: '21 de cada mes', amount: '-$200.000', details: { fecha: '21 de cada mes', metodoPago: 'Nequi', categoria: 'Vivienda', fullAmount: '-$200.000' } },
    { id: 5, icon: MdSportsVolleyball, title: 'Club de volleyball', subtitle: '18 de cada mes', amount: '-$30.000', details: { fecha: '18 de cada mes', metodoPago: 'BBVA', categoria: 'Deporte', fullAmount: '-$30.000' } },
    { id: 6, icon: MdTheaters, title: 'Disney +', subtitle: '13 de cada mes', amount: '-$22.000', details: { fecha: '13 de cada mes', metodoPago: 'Nequi', categoria: 'Suscripción', fullAmount: '-$22.000' } },
    { id: 7, icon: MdTheaters, title: 'HBO max', subtitle: '12 de cada mes', amount: '-$30.000', details: { fecha: '12 de cada mes', metodoPago: 'Nequi', categoria: 'Suscripción', fullAmount: '-$30.000' } },
];

const formatCurrency = (value) => {
    const number = parseInt(value.replace(/[$.]/g, ''), 10);
    return new Intl.NumberFormat('es-CO').format(number);
};


const EditarGastoFijoPopup = ({ gasto, onClose, onSave }) => {
    const [monto, setMonto] = useState(gasto.details.fullAmount.replace(/[-$.]/g, ''));
    const [frecuencia, setFrecuencia] = useState('Mensual'); // Default or from gasto
    const [titulo, setTitulo] = useState(gasto.title);
    const [categoria, setCategoria] = useState(gasto.details.categoria);
    const [desde, setDesde] = useState(gasto.details.metodoPago);
    const [fecha, setFecha] = useState(gasto.details.fecha);

    const handleSave = () => {
        const updatedGasto = {
            ...gasto,
            title: titulo,
            subtitle: fecha,
            amount: `-S${formatCurrency(monto)}`,
            details: {
                ...gasto.details,
                fecha: fecha,
                metodoPago: desde,
                categoria: categoria,
                fullAmount: `-$${formatCurrency(monto)}`
            }
        };
        onSave(updatedGasto);
    };

    return (
        <div className="gfa-edit-popup-overlay" onClick={onClose}>
            <div className="gfa-edit-popup-content" onClick={(e) => e.stopPropagation()}>
                <header className="gfa-edit-popup-header">
                    <button onClick={onClose} className="gfa-back-button"><MdChevronLeft /></button>
                    <h2>Nuevo gasto fijo</h2>
                </header>
                <div className="gfa-edit-popup-body">
                    <div className="gfa-edit-amount-input">
                        <input
                            type="text"
                            value={`$${formatCurrency(monto)}`}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[$.]/g, '');
                                if (!isNaN(value)) setMonto(value);
                            }}
                        />
                    </div>
                    <div className="gfa-frequency-selector">
                        <button className={frecuencia === 'Mensual' ? 'active' : ''} onClick={() => setFrecuencia('Mensual')}>Mensual</button>
                        <button className={frecuencia === 'Semanal' ? 'active' : ''} onClick={() => setFrecuencia('Semanal')}>Semanal</button>
                        <button className={frecuencia === 'Quincenal' ? 'active' : ''} onClick={() => setFrecuencia('Quincenal')}>Quincenal</button>
                    </div>
                    <div className="gfa-edit-form-group"><label>Título</label><input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} /></div>
                    <div className="gfa-edit-form-group"><label>Categoría</label><input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} /></div>
                    <div className="gfa-edit-form-group"><label>Desde</label><input type="text" value={desde} onChange={(e) => setDesde(e.target.value)} /></div>
                    <div className="gfa-edit-form-group"><label>Fecha</label><input type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} /></div>
                </div>
                <div className="gfa-edit-popup-footer">
                    <button className="gfa-edit-popup-btn" onClick={handleSave}>Guardar</button>
                </div>
            </div>
        </div>
    );
};

const DetalleGastoFijoPopup = ({ gasto, onClose, onSave }) => {
    const [isEditOpen, setEditOpen] = useState(false);

    if (!gasto) return null;

    const handleSaveEdit = (updatedGasto) => {
        onSave(updatedGasto);
        setEditOpen(false); // Cierra el popup de edición
        onClose(); // Cierra el popup de detalle
    };

    const Icon = gasto.icon;

    return (
        <>
            <div className="gfa-popup-overlay" onClick={onClose}>
                <div className="gfa-popup-content" onClick={(e) => e.stopPropagation()}>
                    <header className="gfa-popup-header">
                        <button onClick={onClose} className="gfa-popup-back-button"><MdChevronLeft /></button>
                        <h2>Detalle de gasto fijo</h2>
                        <button onClick={() => setEditOpen(true)} className="gfa-popup-edit-button"><MdEdit /></button>
                    </header>
                    <div className="gfa-popup-body">
                        <div className="gfa-popup-main-info">
                            <div className="gfa-icon-container"><Icon /></div>
                            <span className="gfa-popup-main-title">{gasto.title}</span>
                        </div>
                        <p className="gfa-popup-amount">{gasto.details.fullAmount}</p>
                        <div className="gfa-popup-info-grid">
                            <div className="gfa-popup-info-item"><p className="value">{gasto.details.fecha}</p><p className="label">Fecha</p></div>
                            <div className="gfa-popup-info-item"><p className="value">{gasto.details.metodoPago}</p><p className="label">Método de pago</p></div>
                            <div className="gfa-popup-info-item"><p className="value">{gasto.details.categoria}</p><p className="label">Categoría</p></div>
                        </div>
                    </div>
                    <div className="gfa-popup-footer"><button className="gfa-popup-btn" onClick={onClose}>Salir</button></div>
                </div>
            </div>
            {isEditOpen && <EditarGastoFijoPopup gasto={gasto} onClose={() => setEditOpen(false)} onSave={handleSaveEdit} />}
        </>
    );
};

const MigestionGastosFijosAdmin = () => {
    const navigate = useNavigate();
    const [suscripciones, setSuscripciones] = useState([]);
    const [selectedGasto, setSelectedGasto] = useState(null);

    useEffect(() => {
        const storedGastos = localStorage.getItem('suscripcionesActivas');
        if (storedGastos) {
            setSuscripciones(JSON.parse(storedGastos));
        } else {
            setSuscripciones(initialSuscripciones);
        }
    }, []);

    const handleSaveGasto = (updatedGasto) => {
        const updatedSuscripciones = suscripciones.map(s => s.id === updatedGasto.id ? updatedGasto : s);
        setSuscripciones(updatedSuscripciones);
        localStorage.setItem('suscripcionesActivas', JSON.stringify(updatedSuscripciones));
    };

    return (
        <div className="gfa-page">
            <header className="gfa-header">
                <button onClick={() => navigate(-1)} className="gfa-back-button"><MdChevronLeft /></button>
                <h1>Suscripciones activas</h1>
            </header>
            <main className="gfa-list">
                {suscripciones.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.id} className="gfa-card" onClick={() => setSelectedGasto(item)}>
                            <div className="gfa-icon-container"><Icon /></div>
                            <div className="gfa-details">
                                <p className="title">{item.title}</p>
                                <p className="subtitle">{item.subtitle}</p>
                            </div>
                            <p className="gfa-amount">{item.amount}</p>
                        </div>
                    );
                })}
            </main>
            {selectedGasto && <DetalleGastoFijoPopup gasto={selectedGasto} onClose={() => setSelectedGasto(null)} onSave={handleSaveGasto} />}
        </div>
    );
};

export default MigestionGastosFijosAdmin;
