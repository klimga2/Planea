import { useNavigate } from 'react-router-dom';
import BottomNav from '../../Components/BottomNav';
import './GestionDiaria.css'; // Importa el nuevo archivo CSS
import bannerImage from '../../images/Group 1000002804.png';

import {
    FiTrendingUp,       // Para Movimientos
    FiClipboard,        // Para Presupuesto
    FiCreditCard,       // Para Gastos fijos
    FiTarget,           // Para Planeación de metas
    FiBriefcase,        // Para Mis productos
    FiMessageSquare,    // Para el chat
} from 'react-icons/fi';

// Mapeo de iconos actualizado con Feather Icons
const iconMap = {
	movimientos: FiTrendingUp,
	presupuesto: FiClipboard,
	gastos: FiCreditCard,
	metas: FiTarget,
	productos: FiBriefcase,
};

const items = [
	{
		key: 'movimientos',
		title: 'Movimientos',
		desc: 'Registro actualizado de ingresos y gastos recientes.',
	},
	{ key: 'presupuesto', title: 'Presupuesto', desc: 'Control de lo planeado vs. lo gastado en el mes.' },
	{ key: 'gastos', title: 'Gastos fijos', desc: 'Pagos organizados para evitar olvidos.' },
	{ key: 'metas', title: 'Planeación de metas', desc: 'Creación y seguimiento de tus metas financieras.' },
	{
		key: 'productos',
		title: 'Mis productos',
		desc: 'Resumen de tus cuentas, tarjetas y ahorros en un solo lugar.',
	},
];

const MigestiongestionDiaria = () => {
	const navigate = useNavigate();

	return (
		<div className='main-container'>
			<header className='header'>
				<h1>Gestión diaria</h1>
				<p>Organiza tu día a día financiero en un solo lugar</p>
			</header>

			<section className='banner'>
				<img
					src={bannerImage}
					alt='banner'
					className='banner-image'
				/>
			</section>

			<main className='card-list'>
				{items.map((it) => {
					const getRoute = () => {
						if (it.key === 'movimientos') return '/Migestion-gestionDiariaMovimientos';
						if (it.key === 'presupuesto') return '/Migestion-presupuesto';
						if (it.key === 'gastos') return '/Migestion-gastos-fijos';
						if (it.key === 'metas') return '/Migestion-planeacionmetas';
						if (it.key === 'productos') return '/Migestion-misproductos';
						return '/';
					};
					
					const Icon = iconMap[it.key];

					return (
						<article key={it.key} className='card' role='button' tabIndex={0} onClick={() => navigate(getRoute())}>
							{Icon && <Icon className='icon' size={32} />}
							<div className='card-content'>
								<h3 className='card-title'>{it.title}</h3>
								<p className='card-subtitle'>{it.desc}</p>
							</div>
							<div className='arrow'>›</div>
						</article>
					);
				})}
			</main>

			<div className='fab' aria-label='Chat'>
				<FiMessageSquare />
			</div>

			<nav className='bottom-nav' aria-label='Navegación principal'>
				<BottomNav />
			</nav>
		</div>
	);
};

export default MigestiongestionDiaria;
