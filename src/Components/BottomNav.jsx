import { useNavigate } from 'react-router-dom';
import { MdStarRate, MdBarChart, MdHome, MdAttachMoney, MdBook } from 'react-icons/md';

const BottomNav = () => {
	const navigate = useNavigate();

	const navItems = [
		{ id: 'favorites', icon: MdStarRate, label: 'Favoritos', path: '/' },
		{ id: 'analytics', icon: MdBarChart, label: 'Análisis', path: '/analytics' },
		{ id: 'home', icon: MdHome, label: 'Inicio', path: '/Migestion-gestionDiaria', isHome: true },
		{ id: 'expenses', icon: MdAttachMoney, label: 'Gastos', path: '/expenses' },
		{ id: 'book', icon: MdBook, label: 'Reportes', path: '/reports' },
	];

	return (
		<nav className='gf-bottom-nav' aria-label='Navegación principal'>
			{navItems.map((item) => {
				const Icon = item.icon;
				return (
					<button
						key={item.id}
						className={`nav-item ${item.isHome ? 'nav-home' : ''}`}
						onClick={() => navigate(item.path)}
						aria-label={item.label}
						title={item.label}
					>
						<Icon size={item.isHome ? 24 : 20} />
					</button>
				);
			})}
		</nav>
	);
};

export default BottomNav;
