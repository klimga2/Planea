import { useNavigate } from 'react-router-dom';
// Eliminado: import MigestionNavbar from '../../Components/MigestionNavbar';
import BottomNav from '../../Components/BottomNav';
import {
	MdSwapHoriz,
	MdCreditCard,
	MdAttachMoney,
	MdCheckCircle,
	MdShoppingBag,
	MdDescription,
	MdDomain,
	MdHome,
} from 'react-icons/md';

const iconMap = {
	movimientos: MdSwapHoriz,
	presupuesto: MdCreditCard,
	gastos: MdAttachMoney,
	metas: MdCheckCircle,
	productos: MdShoppingBag,
	tributaria: MdDescription,
	patrimonial: MdDomain,
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
	const Nav = useNavigate();

	return (
		<div className='mg-page'>
			{/* Ya no usa MigestionNavbar, usa div personalizado */}
			<div className='mg-header-custom'>
				<h1 className='mg-title-custom'>Gestión diaria</h1>
				<p className='mg-subtitle-custom'>Organiza tu día a día financiero en un solo lugar</p>
			</div>

			<section className='mg-banner'>
				<img
					src='data:image/svg+xml,<svg width="160" height="140" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="160" height="140" rx="20" fill="%23D6EAF8"/><circle cx="80" cy="50" r="25" fill="%231F4788"/><ellipse cx="80" cy="90" rx="40" ry="35" fill="%231F4788"/></svg>'
					alt='banner'
					className='mg-banner-img'
				/>
				<div className='mg-banner-text'>
					<strong>Gestiona aquí lo esencial e importante</strong>
				</div>
			</section>

			<main className='mg-list'>
				{items.map((it) => {
					const getRoute = () => {
						if (it.key === 'movimientos') return '/Migestion-gestionDiariaMovimientos';
						if (it.key === 'presupuesto') return '/Migestion-presupuesto';
						if (it.key === 'gastos') return '/Migestion-gastos-fijos';
						return '/';
					};
					return (
						<article key={it.key} className='mg-card' role='button' tabIndex={0} onClick={() => Nav(getRoute())}>
							<div className='mg-card-left'>
								<div className='mg-icon-emoji'>{iconMap[it.key] && iconMap[it.key]({ size: 32 })}</div>
								<div>
									<h3 className='mg-card-title'>{it.title}</h3>
									<p className='mg-card-desc'>{it.desc}</p>
								</div>
							</div>
							<div className='mg-card-right'>›</div>
						</article>
					);
				})}
			</main>

			<button className='mg-fab' aria-label='Chat'>
				💬
			</button>

			{/* Bottom Navigation */}
			<nav className='gf-bottom-nav' aria-label='Navegación principal'>
				<BottomNav />
			</nav>
		</div>
	);
};

export default MigestiongestionDiaria;
