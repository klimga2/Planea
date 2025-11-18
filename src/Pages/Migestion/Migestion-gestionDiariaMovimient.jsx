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

// Componente modal para editar/crear transacción
const TransactionEditModal = ({ tx, onClose, onSave }) => {
	const [form, setForm] = useState({
		id: tx.id,
		title: tx.title || '',
		amount: tx.amount ? String(tx.amount) : '',
		category: tx.category || '',
		bank: tx.bank || '',
		isExpense: typeof tx.isExpense === 'boolean' ? tx.isExpense : true,
		dateISO: tx.dateISO || '',
	});

	const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

	const handleSave = () => {
		// construct updated tx; title should remain unchanged (not editable per requirement)
		const updated = {
			...tx,
			title: tx.title,
			amount: String(form.amount).replace(/[^0-9]/g, ''),
			category: form.category,
			bank: form.bank,
			isExpense: form.isExpense,
			dateISO: form.dateISO,
		};
		onSave(updated);
	};

	return (
		<div className='td-overlay' onClick={onClose}>
			<div className='edit-sheet' onClick={(e) => e.stopPropagation()}>
				<div className='td-header'>
					<button className='td-back' onClick={onClose}>
						◀
					</button>
					<h4>Editar transacción</h4>
				</div>
				<div className='edit-body'>
					<div className='edit-amount'>
						{form.isExpense ? `- ${Number(form.amount).toLocaleString()}` : `+ ${Number(form.amount).toLocaleString()}`}
					</div>
					<div className='edit-types'>
						<button
							className={`type-btn ${form.isExpense ? 'active' : ''}`}
							onClick={() => handleChange('isExpense', true)}
						>
							Gasto
						</button>
						<button
							className={`type-btn ${!form.isExpense ? 'active' : ''}`}
							onClick={() => handleChange('isExpense', false)}
						>
							Ingreso
						</button>
						<button className='type-btn'>Transferencia</button>
					</div>

					<label>Título</label>
					<input value={form.title} disabled />

					<label>Importe</label>
					<input type='number' value={form.amount} onChange={(e) => handleChange('amount', e.target.value)} />

					<label>Categoría</label>
					<select value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
						<option>Comida</option>
						<option>Transporte</option>
						<option>Hogar</option>
						<option>Trabajo</option>
					</select>

					<label>Desde</label>
					<select value={form.bank} onChange={(e) => handleChange('bank', e.target.value)}>
						<option>BBVA</option>
						<option>Neqüi</option>
						<option>Ñu</option>
					</select>

					<label>Fecha</label>
					<input type='date' value={form.dateISO} onChange={(e) => handleChange('dateISO', e.target.value)} />

					<button className='td-save' onClick={handleSave}>
						Guardar
					</button>
				</div>
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

	// Use dateISO per item to enable reliable filtering / moving between days
	const initialTransactions = [
		{
			date: 'Domingo 12 de octubre',
			items: [
				{
					id: 1,
					icon: '🏠',
					title: 'Pago recibo de luz',
					category: 'Hogar',
					bank: 'Ñu',
					amount: '136000',
					isExpense: true,
					dateISO: '2025-10-12',
				},
				{
					id: 2,
					icon: '🚗',
					title: 'Uber',
					category: 'Transporte',
					bank: 'Neqüi',
					amount: '12000',
					isExpense: true,
					dateISO: '2025-10-12',
				},
				{
					id: 3,
					icon: '💱',
					title: 'Transferencia',
					category: 'Salud',
					bank: 'BBVA',
					amount: '40000',
					isExpense: false,
					dateISO: '2025-10-12',
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
					amount: '5000000',
					isExpense: false,
					dateISO: '2025-10-11',
				},
			],
		},
	];

	const [transactions, setTransactions] = useState(initialTransactions);

	// detail / edit modal state
	const [showDetail, setShowDetail] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [activeTx, setActiveTx] = useState(null);
	const [activeTxDateLabel, setActiveTxDateLabel] = useState('');

	const openDetail = (tx, dateLabel) => {
		setActiveTx(tx);
		setActiveTxDateLabel(dateLabel || '');
		setShowDetail(true);
	};
	const closeDetail = () => {
		setShowDetail(false);
		setActiveTx(null);
		setActiveTxDateLabel('');
	};

	const openEdit = (tx) => {
		setActiveTx(tx);
		setShowEdit(true);
		setShowDetail(false);
	};
	const closeEdit = () => {
		setShowEdit(false);
		setActiveTx(null);
	};

	const formatDateLabel = (iso) => {
		const d = new Date(iso);
		const options = { weekday: 'long', day: 'numeric', month: 'long' };
		const label = d.toLocaleDateString('es-ES', options);
		return label.charAt(0).toUpperCase() + label.slice(1);
	};

	const saveTransaction = (updated) => {
		// updated should include dateISO and amount as plain numbers/strings without +/− signs
		const oldIso = activeTx?.dateISO;
		const newIso = updated.dateISO || oldIso;

		setTransactions((prev) => {
			// remove item from old day
			let newList = prev.map((day) => ({ ...day, items: day.items.filter((it) => it.id !== updated.id) }));

			// remove any empty day groups
			newList = newList.filter((day) => day.items.length > 0);

			// try to find an existing day group with matching date label
			const targetLabel = formatDateLabel(newIso);
			const foundIndex = newList.findIndex((d) => d.date === targetLabel);

			const updatedItem = { ...updated };

			if (foundIndex !== -1) {
				newList[foundIndex] = { ...newList[foundIndex], items: [...newList[foundIndex].items, updatedItem] };
			} else {
				// create new day group at top
				newList = [{ date: targetLabel, items: [updatedItem] }, ...newList];
			}

			return newList;
		});

		setShowEdit(false);
		setActiveTx({ ...updated });
		setActiveTxDateLabel(formatDateLabel(newIso));
		setShowDetail(true);
	};

	const formatAmount = (tx) => {
		const abs = Number(String(tx.amount).replace(/[^0-9]/g, '')) || 0;
		const formatted = abs.toLocaleString('es-CO');
		return tx.isExpense ? `- $ ${formatted}` : `+ $ ${formatted}`;
	};

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
		const iso = date.toISOString().slice(0, 10); // YYYY-MM-DD
		// For selected date, return day groups that contain items on that ISO date, with only those items
		return transactionsList
			.map((day) => {
				const items = day.items.filter((it) => it.dateISO === iso);
				if (items.length === 0) return null;
				return { date: formatDateLabel(iso), items };
			})
			.filter(Boolean);
	};

	const visibleTransactions = filterTransactionsByDate(transactions, selectedDate);

	return (
		<div className='mov-page'>
			{/* Header */}
			<header className='mov-header'>
				<button className='mov-back' onClick={() => Nav('/Migestion-gestionDiaria')} aria-label='Atrás'>
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
				{visibleTransactions.map((day, dayIndex) => (
					<div key={dayIndex} className='mov-transaction-day'>
						<h3 className='mov-day-label'>{day.date}</h3>
						{day.items.map((tx) => (
							<div key={tx.id} className='mov-transaction-item' onClick={() => openDetail(tx, day.date)}>
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
								<p className={`mov-tx-amount ${tx.isExpense ? 'expense' : 'income'}`}>{formatAmount(tx)}</p>
							</div>
						))}
					</div>
				))}
			</div>

			{/* Transaction Detail Modal */}
			{showDetail && activeTx && (
				<div className='td-overlay' onClick={closeDetail}>
					<div className='td-sheet' onClick={(e) => e.stopPropagation()}>
						<div className='td-header'>
							<button className='td-back' onClick={closeDetail}>
								◀
							</button>
							<h4>Detalle de transacción</h4>
							<button className='td-edit' onClick={() => openEdit(activeTx)}>
								✎
							</button>
						</div>
						<div className='td-body'>
							<div className='td-top'>
								<div className='td-icon'>{activeTx.icon}</div>
								<div>
									<h3 className='td-title'>{activeTx.title}</h3>
									<p className={`td-amount ${activeTx.isExpense ? 'expense' : 'income'}`}>{formatAmount(activeTx)}</p>
								</div>
							</div>
							<div className='td-meta-cards'>
								<div className='meta-card'>
									<div>Fecha</div>
									<div className='meta-value'>{activeTxDateLabel}</div>
								</div>
								<div className='meta-card'>
									<div>Método de pago</div>
									<div className='meta-value'>{activeTx.bank}</div>
								</div>
								<div className='meta-card'>
									<div>Categoría</div>
									<div className='meta-value'>{activeTx.category}</div>
								</div>
							</div>
							<button className='td-close' onClick={closeDetail}>
								Salir
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Transaction Edit Modal */}
			{showEdit && activeTx && <TransactionEditModal tx={activeTx} onClose={closeEdit} onSave={saveTransaction} />}

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
