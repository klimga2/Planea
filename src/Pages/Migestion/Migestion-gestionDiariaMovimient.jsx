import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MigestionMovimientos = () => {
	const Nav = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');
	const [currentMonth, setCurrentMonth] = useState(9); // octubre (0-11)
	const [activeFilter, setActiveFilter] = useState('Para ti');

	const filters = ['Para ti', 'Todos', 'Ñu', 'Neqüi', 'BBVA'];

	// Datos de ejemplo
	const monthlyData = {
		balance: '$ 1.090.000',
		income: '$ 3.200.000',
		expense: '$ 2.050.000',
		transactionCount: 8,
	};

	const transactions = [
		{
			date: 'Domingo 12 de octubre',
			items: [
				{
					id: 1,
					icon: '🏠',
					title: 'Pago recibo de luz',
					category: 'Hogar',
					bank: 'Ñu',
					amount: '-$136.000',
					isExpense: true,
				},
				{
					id: 2,
					icon: '🚗',
					title: 'Uber',
					category: 'Transporte',
					bank: 'Neqüi',
					amount: '-$12.000',
					isExpense: true,
				},
				{
					id: 3,
					icon: '💱',
					title: 'Transferencia',
					category: 'Salud',
					bank: 'BBVA',
					amount: '+$40.000',
					isExpense: false,
				},
			],
		},
		{
			date: 'Sábado 11 de octubre',
			items: [
				{
					id: 4,
					icon: '💼',
					title: 'Sueldo',
					category: 'Trabajo',
					bank: 'BBVA',
					amount: '+$5.000.000',
					isExpense: false,
				},
			],
		},
	];

	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];

	const handlePrevMonth = () => {
		setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
	};

	const handleNextMonth = () => {
		setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
	};

	return (
		<div className='mov-page'>
			{/* Header */}
			<header className='mov-header'>
				<button className='mov-back' onClick={() => Nav('/')} aria-label='Atrás'>
					◀
				</button>
				<h1 className='mov-title'>Movimientos</h1>
			</header>

			{/* Search Bar */}
			<div className='mov-search-container'>
				<input
					type='text'
					placeholder='Buscar curso'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='mov-search-input'
				/>
				<button className='mov-search-icon' aria-label='Buscar'>
					👁️
				</button>
			</div>

			{/* Filter Buttons */}
			<div className='mov-filters'>
				{filters.map((filter) => (
					<button
						key={filter}
						className={`mov-filter-btn ${activeFilter === filter ? 'active' : ''}`}
						onClick={() => setActiveFilter(filter)}
					>
						{filter}
					</button>
				))}
				<button className='mov-filter-add' aria-label='Agregar filtro'>
					+
				</button>
				<button className='mov-filter-dropdown' aria-label='Opciones'>
					▼
				</button>
			</div>

			{/* Month Selector */}
			<div className='mov-month-selector'>
				<button className='mov-month-nav' onClick={handlePrevMonth}>
					◀
				</button>
				<div className='mov-month-info'>
					<h2 className='mov-month-name'>{months[currentMonth]}</h2>
					<p className='mov-transaction-count'>{monthlyData.transactionCount} transacciones</p>
				</div>
				<button className='mov-month-nav' onClick={handleNextMonth}>
					▶
				</button>
			</div>

			{/* Summary Cards */}
			<div className='mov-summary'>
				<div className='mov-balance-card'>
					<div className='mov-balance-header'>
						<span className='mov-balance-icon'>📈</span>
						<span className='mov-balance-label'>Balance</span>
					</div>
					<p className='mov-balance-amount'>{monthlyData.balance}</p>
				</div>

				<div className='mov-income-expense'>
					<div className='mov-income-card'>
						<div className='mov-income-header'>
							<span className='mov-income-icon'>📊</span>
							<span>Ingreso mensual</span>
						</div>
						<p className='mov-income-amount'>{monthlyData.income}</p>
					</div>
					<div className='mov-expense-card'>
						<div className='mov-expense-header'>
							<span className='mov-expense-icon'>📉</span>
							<span>Gasto mensual</span>
						</div>
						<p className='mov-expense-amount'>{monthlyData.expense}</p>
					</div>
				</div>
			</div>

			{/* Transactions List */}
			<div className='mov-transactions'>
				{transactions.map((day, dayIndex) => (
					<div key={dayIndex} className='mov-transaction-day'>
						<h3 className='mov-day-label'>{day.date}</h3>
						{day.items.map((tx) => (
							<div key={tx.id} className='mov-transaction-item'>
								<div className='mov-tx-icon-container'>
									<div className='mov-tx-icon'>{tx.icon}</div>
								</div>
								<div className='mov-tx-content'>
									<h4 className='mov-tx-title'>{tx.title}</h4>
									<div className='mov-tx-meta'>
										<span className='mov-tx-category'>{tx.category}</span>
										<span className='mov-tx-bank'>{tx.bank}</span>
									</div>
								</div>
								<p className={`mov-tx-amount ${tx.isExpense ? 'expense' : 'income'}`}>{tx.amount}</p>
							</div>
						))}
					</div>
				))}
			</div>

			{/* Floating Chat Button */}
			<button className='mov-fab' aria-label='Chat'>
				💬
			</button>

			{/* Bottom Navigation */}
			<nav className='mov-bottom-nav' aria-label='Navegación principal'>
				<button className='nav-item'>★</button>
				<button className='nav-item'>📊</button>
				<button className='nav-item nav-home'>🏠</button>
				<button className='nav-item'>$</button>
				<button className='nav-item'>📖</button>
			</nav>
		</div>
	);
};

export default MigestionMovimientos;

