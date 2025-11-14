import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Pequeño componente de calendario modal
const CalendarModal = ({ year, month, visible, onClose, onSelect }) => {
	if (!visible) return null;

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

	const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

	const buildGrid = (y, m) => {
		const firstDay = new Date(y, m, 1);
		const firstWeekday = firstDay.getDay(); // 0=Sun
		// We'll display weeks starting Monday per image; shift so Monday=0
		const shift = (firstWeekday + 6) % 7;
		const daysInMonth = new Date(y, m + 1, 0).getDate();
		const daysInPrev = new Date(y, m, 0).getDate();

		const totalCells = 42; // 6 weeks
		const cells = [];
		for (let i = 0; i < totalCells; i++) {
			const dayIndex = i - shift + 1;
			let dateObj, inCurrentMonth;
			if (dayIndex <= 0) {
				dateObj = new Date(y, m - 1, daysInPrev + dayIndex);
				inCurrentMonth = false;
			} else if (dayIndex > daysInMonth) {
				dateObj = new Date(y, m + 1, dayIndex - daysInMonth);
				inCurrentMonth = false;
			} else {
				dateObj = new Date(y, m, dayIndex);
				inCurrentMonth = true;
			}
			cells.push({ date: dateObj, inCurrentMonth });
		}
		return cells;
	};

	const cells = buildGrid(year, month);

	return (
		<div className='cal-overlay' onClick={onClose}>
			<div className='cal-container' onClick={(e) => e.stopPropagation()}>
				<h3 className='cal-month-title'>{months[month]}</h3>
				<div className='cal-box'>
					<div className='cal-weekdays'>
						<div>Mo</div>
						<div>Tu</div>
						<div>We</div>
						<div>Th</div>
						<div>Fri</div>
						<div>Sa</div>
						<div>Su</div>
					</div>
					<div className='cal-grid'>
						{cells.map((cell, idx) => {
							const d = cell.date.getDate();
							const isToday = (() => {
								const t = new Date();
								return (
									t.getFullYear() === cell.date.getFullYear() &&
									t.getMonth() === cell.date.getMonth() &&
									t.getDate() === cell.date.getDate()
								);
							})();

							return (
								<button
									key={idx}
									className={`cal-cell ${cell.inCurrentMonth ? '' : 'muted'} ${isToday ? 'today' : ''}`}
									onClick={() => onSelect(cell.date)}
								>
									<span className='cal-day'>{d}</span>
								</button>
							);
						})}
					</div>
				</div>
				<div className='cal-drag' />
			</div>
		</div>
	);
};

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

	// Calendar modal state
	const [showCalendar, setShowCalendar] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	const handleOpenCalendar = () => setShowCalendar(true);
	const handleCloseCalendar = () => setShowCalendar(false);

	const handleSelectDate = (date) => {
		setSelectedDate(date);
		// optionally close modal
		handleCloseCalendar();
		// set currentMonth to selected month for coherence
		setCurrentMonth(date.getMonth());
	};

	const filterTransactionsByDate = (transactionsList, date) => {
		if (!date) return transactionsList;
		const d = date.getDate();
		const monthsLower = [
			'enero',
			'febrero',
			'marzo',
			'abril',
			'mayo',
			'junio',
			'julio',
			'agosto',
			'septiembre',
			'octubre',
			'noviembre',
			'diciembre',
		];
		const mName = monthsLower[date.getMonth()];
		return transactionsList
			.map((day) => {
				const dayLower = day.date.toLowerCase();
				if (dayLower.includes(`${d}`) && dayLower.includes(mName)) return day;
				return null;
			})
			.filter(Boolean);
	};

	const visibleTransactions = filterTransactionsByDate(transactions, selectedDate);

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
				<div className='mov-month-info' onClick={handleOpenCalendar} role='button' tabIndex={0}>
					<h2 className='mov-month-name'>{months[currentMonth]}</h2>
					<p className='mov-transaction-count'>{monthlyData.transactionCount} transacciones</p>
				</div>
				<button className='mov-month-nav' onClick={handleNextMonth}>
					▶
				</button>
			</div>

			{/* Calendar modal */}
			<CalendarModal
				year={new Date().getFullYear()}
				month={currentMonth}
				visible={showCalendar}
				onClose={handleCloseCalendar}
				onSelect={handleSelectDate}
			/>

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
