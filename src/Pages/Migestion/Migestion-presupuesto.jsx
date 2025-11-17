import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../Components/BottomNav';
import { MdAttachMoney, MdRefresh, MdAssignment, MdBarChart, MdBook, MdHome, MdStarRate } from 'react-icons/md';

const MigestionPresupuesto = () => {
  const Nav = useNavigate();

  // Estado principal del presupuesto
  const [budget, setBudget] = useState({
    baseIncome: 300000,
    excessAtEnd: '',
    budgetFund: 300000,
    startDate: 'dd/mm/aaaa',
    currency: 'COP',
    budgetMode: 'Regla 30/50/20',
  });

  // Estado para el modal de aviso de 100%
  const [showBudgetFullAlert, setShowBudgetFullAlert] = useState(false);

  // Estado para configuraciones avanzadas
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState({
    recalculateOnIncome: true,
    autoSavings: true,
    globalRollover: true,
    weeklySummary: true,
    deviationAlerts: false,
    autoAdjustGoals: true,
  });

  // Funciones de cambio
  const handleBudgetChange = (field, value) => {
    const updatedBudget = { ...budget, [field]: value };

    // Si cambia budgetFund, validar si llegó al 100%
    if (field === 'budgetFund') {
      const fund = parseFloat(value) || 0;
      if (fund > 0 && parseFloat(budget.baseIncome) >= fund) {
        setShowBudgetFullAlert(true);
      }
    }

    setBudget(updatedBudget);
  };

  // Calcular porcentaje utilizado: (baseIncome / budgetFund) * 100
  const budgetFund = parseFloat(budget.budgetFund) || 1;
  const baseIncomeAmount = parseFloat(budget.baseIncome) || 0;
  const percentUsed = Math.min(Math.round((baseIncomeAmount / budgetFund) * 100), 100);
  const available = Math.max(budgetFund - baseIncomeAmount, 0);

  // Símbolo de moneda
  const currencySymbol =
    {
      COP: '$',
      USD: '$',
      EUR: '€',
    }[budget.currency] || '$';

  // Selecciones disponibles
  const budgetModes = ['Regla 30/50/20', 'Cero-base', 'Sobres', 'Personalizado'];
  const currencies = ['COP', 'USD', 'EUR'];

  const handleSave = () => {
    console.log('Presupuesto guardado:', budget);
    alert('Presupuesto guardado exitosamente');
  };

  const handleAdvanced = () => {
    setShowAdvancedSettings(true);
  };

  const handleToggleSetting = (setting) => {
    setAdvancedSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSaveAdvanced = () => {
    console.log('Configuraciones avanzadas guardadas:', advancedSettings);
    setShowAdvancedSettings(false);
    alert('Configuraciones guardadas exitosamente');
  };

  return (
    <div className='pres-page'>
      {/* Header - REEMPLAZADO por un div simple para mantener el flujo de la página */}
      <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
        <h2>Presupuesto</h2>
        <button onClick={() => Nav('/Migestion-gestionDiaria')}>← Volver</button>
      </div>

      <div className='pres-container'>
        {/* Budget Summary Card */}
        <div className='pres-summary-card'>
          <div className='pres-summary-top'>
            <div>
              <h2 className='pres-spent'>
                {currencySymbol}
                {baseIncomeAmount.toLocaleString('es-CO')}
              </h2>
              <p className='pres-of'>
                de {currencySymbol}
                {budgetFund.toLocaleString('es-CO')}
              </p>
            </div>
            <div className='pres-status'>
              <p className='pres-percent'>{percentUsed}% Utilizado</p>
              <p className='pres-available'>
                Disponible: {currencySymbol}
                {available.toLocaleString('es-CO')}
              </p>
            </div>
          </div>
          <div className='pres-progress-bar'>
            <div className='pres-progress-info'>
              <span className='pres-progress-date'>{budget.startDate}</span>
              <span className='pres-progress-currency'>{budget.currency}</span>
            </div>
            <div className='pres-progress-fill-container'>
              <div className='pres-progress-fill' style={{ width: `${percentUsed}%` }} />
            </div>
          </div>
        </div>{' '}
        {/* Ingresos Section */}
        <section className='pres-section'>
          <div className='pres-section-header'>
            <span className='pres-section-icon'>
              <MdAttachMoney size={24} />
            </span>
            <h3>Ingresos</h3>
          </div>
          <div className='pres-section-content'>
            <label>Ingreso base del período</label>
            <input
              type='number'
              value={budget.baseIncome}
              onChange={(e) => handleBudgetChange('baseIncome', Number(e.target.value))}
              placeholder='$ 0'
              className='pres-input'
            />

            <label>Excedente al final del período</label>
            <select
              value={budget.excessAtEnd}
              onChange={(e) => handleBudgetChange('excessAtEnd', e.target.value)}
              className='pres-select'
            >
              <option value=''>----</option>
              <option value='Ahorrar'>Ahorrar</option>
              <option value='Invertir'>Invertir</option>
              <option value='Gastar'>Gastar</option>
            </select>
          </div>
        </section>
        {/* Periodicidad y ciclo Section */}
        <section className='pres-section'>
          <div className='pres-section-header'>
            <span className='pres-section-icon'>
              <MdRefresh size={24} />
            </span>
            <h3>Periodicidad y ciclo</h3>
          </div>
          <div className='pres-section-content'>
            <label>Fondo del presupuesto</label>
            <input
              type='number'
              value={budget.budgetFund}
              onChange={(e) => handleBudgetChange('budgetFund', Number(e.target.value))}
              placeholder='$ 0'
              className='pres-input'
            />

            <label>Fecha de inicio</label>
            <input
              type='text'
              value={budget.startDate}
              onChange={(e) => handleBudgetChange('startDate', e.target.value)}
              placeholder='dd/mm/aaaa'
              className='pres-input'
            />

            <label>Moneda</label>
            <select
              value={budget.currency}
              onChange={(e) => handleBudgetChange('currency', e.target.value)}
              className='pres-select'
            >
              {currencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
        </section>
        {/* Modo de Presupuesto Section */}
        <section className='pres-section'>
          <div className='pres-section-header'>
            <span className='pres-section-icon'>
              <MdAssignment size={24} />
            </span>
            <h3>Modo de presupuesto</h3>
          </div>
          <div className='pres-budget-modes'>
            {budgetModes.map((mode) => (
              <button
                key={mode}
                className={`pres-mode-btn ${budget.budgetMode === mode ? 'active' : ''}`}
                onClick={() => handleBudgetChange('budgetMode', mode)}
              >
                <div className='pres-mode-title'>{mode}</div>
                <div className='pres-mode-desc'>
                  {mode === 'Regla 30/50/20' && '50% esenciales, 30% deseos, 20% ahorro.'}
                  {mode === 'Cero-base' && 'Asigna 100% del ingreso a categorías.'}
                  {mode === 'Sobres' && 'Sobres por categoría con tope fijo.'}
                  {mode === 'Personalizado' && 'Define tus propias reglas.'}
                </div>
              </button>
            ))}
          </div>
        </section>
        {/* Action Buttons */}
        <div className='pres-actions'>
          <button className='pres-btn-advanced' onClick={handleAdvanced}>
            Configuraciones avanzadas
          </button>
          <button className='pres-btn-save' onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>

      {/* Budget Full Alert Modal */}
      {showBudgetFullAlert && (
        <div className='alert-overlay' onClick={() => setShowBudgetFullAlert(false)}>
          <div className='alert-modal' onClick={(e) => e.stopPropagation()}>
            <h2>⚠️ Presupuesto Completo</h2>
            <p>
              Has llegado al 100% de tu presupuesto ({currencySymbol}
              {budgetFund.toLocaleString('es-CO')}).
            </p>
            <p>¿Qué deseas hacer?</p>
            <div className='alert-actions'>
              <button
                className='alert-btn alert-increase'
                onClick={() => {
                  setShowBudgetFullAlert(false);
                  // Aumentar presupuesto en un 10%
                  const newFund = budgetFund * 1.1;
                  handleBudgetChange('budgetFund', newFund);
                }}
              >
                Aumentar presupuesto
              </button>
              <button
                className='alert-btn alert-new'
                onClick={() => {
                  setShowBudgetFullAlert(false);
                  // Reiniciar el presupuesto
                  setBudget({
                    baseIncome: '',
                    excessAtEnd: '----',
                    budgetFund: '',
                    startDate: '',
                    currency: 'COP',
                    budgetMode: '',
                  });
                }}
              >
                Iniciar nuevo presupuesto
              </button>
              <button className='alert-btn alert-close' onClick={() => setShowBudgetFullAlert(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Settings Modal */}
      {showAdvancedSettings && (
        <div className='advanced-overlay' onClick={() => setShowAdvancedSettings(false)}>
          <div className='advanced-modal' onClick={(e) => e.stopPropagation()}>
            <header className='advanced-header'>
              <button className='advanced-close' onClick={() => setShowAdvancedSettings(false)}>
                ✕
              </button>
              <h2>Configuración</h2>
            </header>

            <div className='advanced-content'>
              {/* Recalcular al recibir ingresos */}
              <div className='advanced-setting'>
                <div className='advanced-setting-info'>
                  <h3>Recalcular al recibir ingresos</h3>
                  <p>Ajusta automáticamente los topes cuando recibes ingreso extra</p>
                </div>
                <label className='advanced-toggle'>
                  <input
                    type='checkbox'
                    checked={advancedSettings.recalculateOnIncome}
                    onChange={() => handleToggleSetting('recalculateOnIncome')}
                  />
                  <span className='toggle-slider'></span>
                </label>
              </div>

              {/* Auto-apartado de ahorro */}
              <div className='advanced-setting'>
                <div className='advanced-setting-info'>
                  <h3>Auto-apartado de ahorro</h3>
                  <p>Apartaremos automáticamente un porcentaje de tu nómina</p>
                </div>
                <label className='advanced-toggle'>
                  <input
                    type='checkbox'
                    checked={advancedSettings.autoSavings}
                    onChange={() => handleToggleSetting('autoSavings')}
                  />
                  <span className='toggle-slider'></span>
                </label>
              </div>

              {/* Activar Roll-over global */}
              <div className='advanced-setting'>
                <div className='advanced-setting-info'>
                  <h3>Activar Roll-over global</h3>
                  <p>Llevar saldo no gastado al siguiente ciclo</p>
                </div>
                <label className='advanced-toggle'>
                  <input
                    type='checkbox'
                    checked={advancedSettings.globalRollover}
                    onChange={() => handleToggleSetting('globalRollover')}
                  />
                  <span className='toggle-slider'></span>
                </label>
              </div>

              {/* Resumen semanal */}
              <div className='advanced-setting'>
                <div className='advanced-setting-info'>
                  <h3>Resumen semanal</h3>
                  <p>Recibe un resumen de tus gastos cada semana</p>
                </div>
                <label className='advanced-toggle'>
                  <input
                    type='checkbox'
                    checked={advancedSettings.weeklySummary}
                    onChange={() => handleToggleSetting('weeklySummary')}
                  />
                  <span className='toggle-slider'></span>
                </label>
              </div>

              {/* Alertas de desviación */}
              <div className='advanced-setting'>
                <div className='advanced-setting-info'>
                  <h3>Alertas de desviación</h3>
                  <p>Avisar si una categoría sube +20% versus promedio 3 meses</p>
                </div>
                <label className='advanced-toggle'>
                  <input
                    type='checkbox'
                    checked={advancedSettings.deviationAlerts}
                    onChange={() => handleToggleSetting('deviationAlerts')}
                  />
                  <span className='toggle-slider'></span>
                </label>
              </div>

              {/* Ajuste automático de metas */}
              <div className='advanced-setting'>
                <div className='advanced-setting-info'>
                  <h3>Ajuste automático de metas</h3>
                  <p>Si no se cumple aporte por 2 ciclos, sugerir un nuevo plan</p>
                </div>
                <label className='advanced-toggle'>
                  <input
                    type='checkbox'
                    checked={advancedSettings.autoAdjustGoals}
                    onChange={() => handleToggleSetting('autoAdjustGoals')}
                  />
                  <span className='toggle-slider'></span>
                </label>
              </div>
            </div>

            <button className='advanced-save-btn' onClick={handleSaveAdvanced}>
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button className='pres-fab' aria-label='Chat'>
        💬
      </button>

      {/* Bottom Navigation */}
      <nav className='gf-bottom-nav' aria-label='Navegación principal'>
        <BottomNav />
      </nav>
    </div>
  );
};

export default MigestionPresupuesto;