import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../Components/BottomNav';
import './Movimientos.css';
import './Modal.css'; // Importa los nuevos estilos del modal

// Importa los iconos necesarios de React Icons
import {
	MdHome,
	MdDirectionsCar,
	MdSwapHoriz,
	MdBusinessCenter,
	MdTrendingUp,
	MdShowChart,
	MdTrendingDown,
	MdChevronLeft,
	MdAdd,
	MdKeyboardArrowDown,
    MdForum, // Icono de chat que se parece más al de la imagen
    MdCreate, // Icono de lápiz para editar
} from 'react-icons/md';

const TransactionModal = ({ transaction, onClose, iconMap, formatAmount }) => {
    if (!transaction) return null;

    const Icon = iconMap[transaction.iconKey];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button onClick={onClose} className='back-arrow'><MdChevronLeft size={28} /></button>
                    <h2>Detalle de transacción</h2>
                    <button className='modal-close-btn'><MdCreate/></button>
                </div>
                <div className="modal-body">
                    <div className='transaction-item' style={{ borderBottom: 'none' }}>
                        <div className='transaction-icon'>
                            {Icon && <Icon />}
                        </div>
                        <div className='transaction-details'>
                            <p className='title'>{transaction.title}</p>
                        </div>
                        <p className={`transaction-amount ${transaction.isExpense ? 'amount-expense' : 'amount-income'}`}>
                            {formatAmount(transaction.amount, transaction.isExpense)}
                        </p>
                    </div>
                    <div className='transaction-details-card'>
                        <div className='detail-item'>
                            <p className='label'>Fecha</p>
                            <p className='value'>7/10/2025</p>
                        </div>
                        <div className='detail-item'>
                            <p className='label'>Método de pago</p>
                            <p className='value'>{transaction.bank}</p>
                        </div>
                        <div className='detail-item'>
                            <p className='label'>Categoría</p>
                            <p className='value'>{transaction.category}</p>
                        </div>
                    </div>
                    <button className='modal-primary-btn' onClick={onClose}>Salir</button>
                </div>
            </div>
        </div>
    );
};



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

	const buildGrid = (y, m) => {
		const firstDay = new Date(y, m, 1);
		const firstWeekday = firstDay.getDay(); // 0=Sun
		const shift = (firstWeekday + 6) % 7; // Shift so Monday=0
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
						<div>Lu</div><div>Ma</div><div>Mi</div><div>Ju</div><div>Vi</div><div>Sá</div><div>Do</div>
					</div>
					<div className='cal-grid'>
						{cells.map((cell, idx) => {
							const d = cell.date.getDate();
							const isToday = new Date().toDateString() === cell.date.toDateString();

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
			</div>
		</div>
	);
};

const MigestionMovimientos = () => {
	const Nav = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [activeFilter, setActiveFilter] = useState('Todos');
	const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);


	// Filtros como se muestra en la imagen
	const filters = ['Todos', 'Nu', 'Nequi', 'Bancolombia', 'BBVA'];

	// Datos de la imagen
	const monthlyData = {
		balance: '$ 1.090.000',
		income: '$ 3.200.000',
		expense: '$ 2.050.000',
		transactionCount: 8,
	};

    // Mapa de iconos correspondiente a la imagen
	const iconMap = {
		'pago-luz': MdHome,
		'uber': MdDirectionsCar,
		'transferencia': MdSwapHoriz,
		'sueldo': MdBusinessCenter,
	};

	// Transacciones como en la imagen
	const initialTransactions = [
		{
			date: 'Domingo 12 de octubre',
            dateISO: '2025-10-12',
			items: [
				{
					id: 1,
                    iconKey: 'pago-luz',
					title: 'Pago recibo de luz',
					category: 'Hogar',
					bank: 'Nu',
					amount: '136000',
					isExpense: true,
				},
				{
					id: 2,
                    iconKey: 'uber',
					title: 'Uber',
					category: 'Transporte',
					bank: 'Nequi',
					amount: '12000',
					isExpense: true,
				},
				{
					id: 3,
                    iconKey: 'transferencia',
					title: 'Transferencia',
					category: 'Salud',
					bank: 'BBVA',
					amount: '40000',
					isExpense: false, // Ingreso
				},
			],
		},
		{
			date: 'Sábado 11 de octubre',
            dateISO: '2025-10-11',
			items: [
				{
					id: 4,
                    iconKey: 'sueldo',
					title: 'Sueldo',
					category: 'Trabajo',
					bank: 'BBVA',
					amount: '5000000',
					isExpense: false, // Ingreso
				},
			],
		},
	];

	// Formatea el monto según la imagen
	const formatAmount = (amount, isExpense) => {
		const number = Number(amount).toLocaleString('es-CO');
		return isExpense ? `-$ ${number}` : `$ ${number}`;
	};

    const openModal = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

	const months = [
		'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
	];

	const handlePrevMonth = () => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
	const handleNextMonth = () => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));

    const handleOpenCalendar = () => setShowCalendar(true);
    const handleCloseCalendar = () => setShowCalendar(false);
    const handleSelectDate = (date) => {
        setSelectedDate(date);
        setCurrentMonth(date.getMonth());
        setShowCalendar(false);
    };

    const formatDateLabel = (iso) => {
		const d = new Date(iso);
		const options = { weekday: 'long', day: 'numeric', month: 'long' };
		const label = d.toLocaleDateString('es-ES', options);
		return label.charAt(0).toUpperCase() + label.slice(1);
	};

    const filterTransactions = () => {
        if (!selectedDate) return initialTransactions;

        const selectedISO = selectedDate.toISOString().slice(0,10);
        
        return initialTransactions.filter(day => {
            const dayISO = new Date(day.dateISO).toISOString().slice(0,10);
            return dayISO === selectedISO;
        });
    }

	return (
		<div className='movimientos-container'>
			{/* Header */}
			<div className='movimientos-header'>
				<button onClick={() => Nav('/Migestion-gestionDiaria')} className='back-arrow'>
					<MdChevronLeft size={28} />
				</button>
				<h1>Movimientos</h1>
				<div style={{ width: '28px' }}></div> {/* Spacer */}
			</div>

			{/* Barra de Búsqueda */}
			<div className='search-bar'>
				<input
					type='text'
					placeholder='Buscar movimiento'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{/* Filtros */}
			<div className='filters'>
				{filters.map((filter) => (
					<button
						key={filter}
						className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
						onClick={() => setActiveFilter(filter)}
					>
						{filter}
					</button>
				))}
                <button className='filter-pill' aria-label='Agregar filtro'>
					<MdAdd size={16} />
				</button>
                <button className='filter-pill' aria-label='Ver más filtros'>
					<MdKeyboardArrowDown size={16} />
				</button>
			</div>

			{/* Selector de Mes */}
			<div className='date-selector' onClick={handleOpenCalendar} role='button' tabIndex={0}>
				<button onClick={(e) => {e.stopPropagation(); handlePrevMonth();}} aria-label='Mes anterior'>
					<MdChevronLeft size={24} />
				</button>				
                <div>
					<h2 className='month'>{months[currentMonth]}</h2>
					<p className='transactions'>{monthlyData.transactionCount} transacciones</p>
				</div>
				<button onClick={(e) => {e.stopPropagation(); handleNextMonth();}} aria-label='Mes siguiente'>
                    <MdChevronLeft style={{ transform: 'rotate(180deg)'}} size={24} />
                </button>
			</div>

            <CalendarModal
                year={new Date().getFullYear()}
                month={currentMonth}
                visible={showCalendar}
                onClose={handleCloseCalendar}
                onSelect={handleSelectDate}
            />

			{/* Tarjeta de Resumen */}
			<div className='summary-card'>
				<div className='summary-section'>
					<div className='icon'><MdShowChart /></div>
					<div className='summary-details'>
						<p>Balance</p>
						<p className='amount'>{monthlyData.balance}</p>
					</div>
				</div>
				<div className='divider'></div>
				<div className='income-expense'>
					<div className='summary-section'>
						<div className='icon'><MdTrendingUp /></div>
						<div className='summary-details'>
							<p>Ingreso mensual</p>
							<p className='amount'>{monthlyData.income}</p>
						</div>
					</div>
					<div className='summary-section'>
						<div className='icon'><MdTrendingDown /></div>
						<div className='summary-details'>
							<p>Gasto mensual</p>
							<p className='amount'>{monthlyData.expense}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Lista de Transacciones */}
			<div className='transactions-list'>
				{filterTransactions().map((day, dayIndex) => (
					<div key={dayIndex} className='transaction-group'>
						<h3 className='transaction-group-header'>{day.date}</h3>
						{day.items.map((tx) => {
							const Icon = iconMap[tx.iconKey];
							return (
								<div key={tx.id} className='transaction-item' onClick={() => openModal(tx)}>
									<div className='transaction-icon'>
										{Icon && <Icon />}
									</div>
									<div className='transaction-details'>
										<p className='title'>{tx.title}</p>
										<p className='subtitle'>{`${tx.category} - ${tx.bank}`}</p>
									</div>
									<p className={`transaction-amount ${tx.isExpense ? 'amount-expense' : 'amount-income'}`}>
										{formatAmount(tx.amount, tx.isExpense)}
									</p>
								</div>
							);
						})}
					</div>
				))}
			</div>

            <TransactionModal
                transaction={selectedTransaction}
                onClose={closeModal}
                iconMap={iconMap}
                formatAmount={formatAmount}
            />

			{/* Botón Flotante */}
			<button className='fab' aria-label='Chat'>
				<MdForum />
			</button>

			{/* Navegación Inferior */}
			<nav className='bottom-nav' aria-label='Navegación principal'>
				<BottomNav />
			</nav>
		</div>
	);
};

export default MigestionMovimientos;
