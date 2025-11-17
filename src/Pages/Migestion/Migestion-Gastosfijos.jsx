import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MigestionNavbar from '../../Components/MigestionNavbar';

const MigestionGastosFijos = () => {
	const Nav = useNavigate();

	// Estado de gastos fijos
	const [fixedExpenses, setFixedExpenses] = useState([
		{
			id: 1,
			category: 'Hogar',
			name: 'Renta',
			subcategory: 'Vivienda',
			bank: 'BBVA',
			amount: 900000,
			date: '03/10/2025',
			icon: '🏠',
			color: '#17a2b8',
		},
		{
			id: 2,
			category: 'Hogar',
			name: 'Internet y TV',
			subcategory: 'Vivienda',
			bank: 'Nequi',
			amount: 120000,
			date: '06/10/2025',
			icon: '🏠',
			color: '#17a2b8',
		},
		{
			id: 3,
			category: 'Salud',
			name: 'EPS',
			subcategory: 'Salud',
			bank: 'BBVA',
			amount: 120000,
			date: '03/10/2025',
			icon: '🏥',
			color: '#17a2b8',
		},
		{
			id: 4,
			category: 'Salud',
			name: 'Seguro médico',
			subcategory: 'Salud',
			bank: 'BBVA',
			amount: 60000,
			date: '10/10/2025',
			icon: '🏥',
			color: '#17a2b8',
		},
		{
			id: 5,
			category: 'Transporte',
			name: 'Parqueadero',
			subcategory: 'Transporte',
			bank: 'Nequi',
			amount: 70000,
			date: '03/10/2025',
			icon: '🚗',
			color: '#17a2b8',
		},
		{
			id: 6,
			category: 'Suscripciones',
			name: 'Spotify',
			subcategory: 'Entretenimiento',
			bank: 'Nu',
			amount: 18500,
			date: '15/10/2025',
			icon: '🎵',
			color: '#17a2b8',
		},
		{
			id: 7,
			category: 'Suscripciones',
			name: 'Netflix',
			subcategory: 'Entretenimiento',
			bank: 'Nu',
			amount: 29900,
			date: '04/10/2025',
			icon: '🎬',
			color: '#17a2b8',
		},
		{
			id: 8,
			category: 'Suscripciones',
			name: 'Disney+',
			subcategory: 'Entretenimiento',
			bank: 'Nequi',
			amount: 24900,
			date: '28/10/2025',
			icon: '🎬',
			color: '#17a2b8',
		},
		{
			id: 9,
			category: 'Suscripciones',
			name: 'HBO max',
			subcategory: 'Entretenimiento',
			bank: 'Nu',
			amount: 18900,
			date: '25/10/2025',
			icon: '🎬',
			color: '#17a2b8',
		},
	]);

	// Estado para el modal de nuevo gasto
	const [showNewExpense, setShowNewExpense] = useState(false);
	const [newExpense, setNewExpense] = useState({
		category: '',
		name: '',
		subcategory: '',
		bank: '',
		amount: '',
		date: '',
	});

	// Frecuencia para nuevo gasto (Mensual / Semanal / Quincenal)
	const [frequency, setFrequency] = useState('Mensual');

	// Calcular totales
	const totalFixed = fixedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
	const totalIncome = 3200000; // Ejemplo de ingreso
	const percentageOfIncome = Math.round((totalFixed / totalIncome) * 100);

	// Agrupar gastos por categoría
	const groupedExpenses = fixedExpenses.reduce((acc, expense) => {
		if (!acc[expense.category]) {
			acc[expense.category] = [];
		}
		acc[expense.category].push(expense);
		return acc;
	}, {});

	const handleAddExpense = () => {
		if (newExpense.name && newExpense.amount && newExpense.date) {
			const expense = {
				id: fixedExpenses.length + 1,
				...newExpense,
				frequency,
				amount: parseFloat(newExpense.amount),
				icon: '📌',
				color: '#17a2b8',
			};
			setFixedExpenses([...fixedExpenses, expense]);
			setNewExpense({
				category: '',
				name: '',
				subcategory: '',
				bank: '',
				amount: '',
				date: '',
			});
			setShowNewExpense(false);
		}
	};

	const handleDeleteExpense = (id) => {
		setFixedExpenses(fixedExpenses.filter((expense) => expense.id !== id));
	};

	return (
		<div className='gf-page'>
			{/* Header */}
			<MigestionNavbar title='Gastos fijos' onBack={() => Nav('/Migestion-gestionDiaria')} />

			<div className='gf-container'>
				{/* Summary Card */}
				<div className='gf-summary-card'>
					<div className='gf-summary-amount'>
						<h2>${totalFixed.toLocaleString('es-CO')}</h2>
						<p>Gastos fijos mensuales</p>
					</div>
					<div className='gf-summary-percent'>
						<h2 className='gf-percent-number'>{percentageOfIncome}%</h2>
						<p>de tus ingresos</p>
					</div>
				</div>

				{/* Expenses by Category */}
				<div className='gf-expenses-container'>
					<h2 className='gf-section-title'>Mis gastos fijos</h2>

					{Object.entries(groupedExpenses).map(([category, expenses]) => (
						<div key={category} className='gf-category-group'>
							<h3 className='gf-category-title'>{category}</h3>
							<div className='gf-expense-list'>
								{expenses.map((expense) => (
									<div key={expense.id} className='gf-expense-item'>
										<div className='gf-expense-icon'>
											<span className='gf-icon'>{expense.icon}</span>
										</div>
										<div className='gf-expense-info'>
											<h4 className='gf-expense-name'>{expense.name}</h4>
											<p className='gf-expense-details'>
												{expense.subcategory} <span className='gf-separator'>•</span> {expense.bank}
											</p>
										</div>
										<div className='gf-expense-amount'>
											<p className='gf-amount'>${expense.amount.toLocaleString('es-CO')}</p>
											<p className='gf-date'>{expense.date}</p>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Action Buttons */}
				<div className='gf-actions'>
					<button className='gf-btn-primary' onClick={() => setShowNewExpense(true)}>
						Nuevo gasto
					</button>
					<button className='gf-btn-secondary' onClick={() => Nav('/Migestion-gastos-activas')}>
						Administrar gastos
					</button>
				</div>
			</div>

			{/* New Expense Modal (nuevo diseño) */}
			{showNewExpense && (
				<div className='gf-modal-overlay' onClick={() => setShowNewExpense(false)}>
					<div className='gf-modal' onClick={(e) => e.stopPropagation()}>
						{/* Header con botón atrás */}
						<div className='gf-modal-header'>
							<button className='gf-back' onClick={() => setShowNewExpense(false)} aria-label='Atrás'>
								◀
							</button>
							<h2>Nuevo gasto fijo</h2>
						</div>
						<div className='gf-modal-body'>
							{/* Monto grande */}
							<div className='gf-amount-display'>
								{newExpense.amount ? `$ ${Number(newExpense.amount).toLocaleString('es-CO')}` : '$ 0'}
							</div>
							{/* Botones de frecuencia */}
							<div className='gf-frequency'>
								{['Mensual', 'Semanal', 'Quincenal'].map((f) => (
									<button
										key={f}
										className={`gf-frequency-btn ${frequency === f ? 'active' : ''}`}
										onClick={() => setFrequency(f)}
									>
										{f}
									</button>
								))}
							</div>

							{/* Input de Monto (actualiza el display arriba) */}
							<div className='gf-form-group'>
								<label>Monto</label>
								<input
									type='number'
									value={newExpense.amount}
									onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
									placeholder='0'
									className='gf-input gf-amount-input'
								/>
							</div>

							{/* Campos */}
							<div className='gf-form-group'>
								<label>Título</label>
								<input
									type='text'
									value={newExpense.name}
									onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
									placeholder='Suscripción'
									className='gf-input'
								/>
							</div>

							<div className='gf-form-group'>
								<label>Categoría</label>
								<input
									type='text'
									value={newExpense.subcategory}
									onChange={(e) => setNewExpense({ ...newExpense, subcategory: e.target.value })}
									placeholder='Entretenimiento'
									className='gf-input'
								/>
							</div>

							<div className='gf-form-group'>
								<label>Desde</label>
								<input
									type='text'
									value={newExpense.bank}
									onChange={(e) => setNewExpense({ ...newExpense, bank: e.target.value })}
									placeholder='BBVA'
									className='gf-input'
								/>
							</div>

							<div className='gf-form-group'>
								<label>Fecha</label>
								<input
									type='text'
									value={newExpense.date}
									onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
									placeholder='14 de cada mes'
									className='gf-input'
								/>
							</div>
						</div>
						<div className='gf-modal-actions'>
							<button className='gf-modal-cancel' onClick={() => setShowNewExpense(false)}>
								Cancelar
							</button>
							<button className='gf-modal-save' onClick={handleAddExpense}>
								Guardar
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Floating Chat Button */}
			<button className='gf-fab' aria-label='Chat'>
				💬
			</button>

			{/* Bottom Navigation */}			<MigestionNavbar title='Gastos fijos' onBack={() => Nav('/Migestion-gestionDiaria')} />
			<nav className='gf-bottom-nav' aria-label='Navegación principal'>
				<button className='nav-item'>★</button>
				<button className='nav-item'>📊</button>
				<button className='nav-item nav-home'>🏠</button>
				<button className='nav-item'>$</button>
				<button className='nav-item'>📖</button>
			</nav>
		</div>
	);
};

export default MigestionGastosFijos;
