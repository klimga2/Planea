import { useState, useEffect } from 'react';
import './ConfiguracionesAvanzadasPopup.css';
import { MdClose } from 'react-icons/md';

// Componente para un único interruptor de configuración
const SettingToggle = ({ label, description, isEnabled, onToggle }) => (
    <div className="setting-item">
        <div className="setting-text">
            <h4>{label}</h4>
            <p>{description}</p>
        </div>
        <label className="toggle-switch">
            <input type="checkbox" checked={isEnabled} onChange={onToggle} />
            <span className="toggle-slider"></span>
        </label>
    </div>
);

const ConfiguracionesAvanzadasPopup = ({ isOpen, onClose }) => {
    // Definición de las configuraciones y sus estados (ajustado a la imagen)
    const initialSettings = {
        recalcularIngresos: true,
        autoApartadoAhorro: false,
        activarRollover: false, // Cambiado a false por defecto
        resumenSemanal: true,
        alertasDesviacion: false,
        ajusteAutomaticoMetas: true,
    };

    const [settings, setSettings] = useState(() => {
        const savedSettings = localStorage.getItem('configuracionesAvanzadas');
        return savedSettings ? JSON.parse(savedSettings) : initialSettings;
    });

    // Guardar en localStorage cada vez que las configuraciones cambian
    useEffect(() => {
        localStorage.setItem('configuracionesAvanzadas', JSON.stringify(settings));
    }, [settings]);

    // Manejador para cambiar el estado de un interruptor
    const handleToggle = (settingName) => {
        setSettings(prev => ({ ...prev, [settingName]: !prev[settingName] }));
    };

    if (!isOpen) return null;

    return (
        <div className={`popup-overlay ${isOpen ? 'open' : ''}`}>
            <div className="popup-content">
                <header className="popup-header">
                    <h2>Configuración</h2>
                    <button onClick={onClose} className="popup-close-btn">
                        <MdClose />
                    </button>
                </header>

                <div className="settings-list">
                    <SettingToggle 
                        label="Recalcular al recibir ingresos"
                        description="Ajusta automáticamente los topes cuando recibas ingreso extra"
                        isEnabled={settings.recalcularIngresos}
                        onToggle={() => handleToggle('recalcularIngresos')}
                    />
                    <SettingToggle 
                        label="Auto-apartado de ahorro"
                        description="Apartaremos automáticamente un porcentaje de tu nómina"
                        isEnabled={settings.autoApartadoAhorro}
                        onToggle={() => handleToggle('autoApartadoAhorro')}
                    />
                     <SettingToggle 
                        label="Activar Roll-over global"
                        description="Llevar saldo no gastado al siguiente ciclo"
                        isEnabled={settings.activarRollover}
                        onToggle={() => handleToggle('activarRollover')}
                    />
                     <SettingToggle 
                        label="Resumen semanal"
                        description="Recibe un resumen de tus gastos cada semana"
                        isEnabled={settings.resumenSemanal}
                        onToggle={() => handleToggle('resumenSemanal')}
                    />
                     <SettingToggle 
                        label="Alertas de desviacion"
                        description="Avisar si una categoria sube +20% versus promedio 3 meses"
                        isEnabled={settings.alertasDesviacion}
                        onToggle={() => handleToggle('alertasDesviacion')}
                    />
                     <SettingToggle 
                        label="Ajuste automatico de metas"
                        description="Si no se cumple aporte por 2 ciclos, sugerir un nuevo plan"
                        isEnabled={settings.ajusteAutomaticoMetas}
                        onToggle={() => handleToggle('ajusteAutomaticoMetas')}
                    />
                </div>

                <button className="popup-save-btn" onClick={onClose}>Guardar</button>
            </div>
        </div>
    );
};

export default ConfiguracionesAvanzadasPopup;
