import { useNavigate } from 'react-router-dom';
import MigestionNavbar from '../../Components/MigestionNavbar';

const items = [
	{ key: 'movimientos', title: 'Movimientos', desc: 'Registro actualizado de ingresos y gastos recientes.' },
	{ key: 'presupuesto', title: 'Presupuesto', desc: 'Control de lo planeado vs. lo gastado en el mes.' },
	{ key: 'gastos', title: 'Gastos fijos', desc: 'Pagos organizados para evitar olvidos.' },
	{ key: 'metas', title: 'Planeación de metas', desc: 'Creación y seguimiento de tus metas financieras.' },
	{ key: 'productos', title: 'Mis productos', desc: 'Resumen de tus cuentas, tarjetas y ahorros en un solo lugar.' },
	{ key: 'tributaria', title: 'Planeación tributaria', desc: 'Planea tu declaración de renta sin enredos.' },
	{ key: 'patrimonial', title: 'Planeación patrimonial', desc: 'Descubre cuánto vale realmente tu patrimonio.' },
];

const MigestiongestionDiaria = () => {
	const Nav = useNavigate();

	return (
		<div className='mg-page'>
			<MigestionNavbar title='Gestión diaria' onBack={() => Nav('/')} />

			<section className='mg-banner'>
				<div className='mg-banner-illustration' aria-hidden>
					{/* simple illustration box - replace with image if available */}
					<svg width='86' height='64' viewBox='0 0 86 64' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<rect x='2' y='6' width='82' height='50' rx='8' fill='#E6F0FF' />
						<rect x='8' y='12' width='42' height='10' rx='3' fill='#C6E0FF' />
						<rect x='8' y='28' width='62' height='6' rx='3' fill='#BEE3FF' />
					</svg>
				</div>
				<div className='mg-banner-text'>
					<strong>Lorem ipsum dolor sit amet</strong>
					<span>consectetur adipiscing elit pharetra, tristique ante augue tempus arcu sod</span>
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
								<div className='mg-icon' aria-hidden>
									{/* simple icon circle with initials */}
									<svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<circle cx='18' cy='18' r='18' fill='#E8F4FF' />
										<rect x='10' y='14' width='16' height='8' rx='2' fill='#9FCBFF' />
									</svg>
								</div>
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

			<nav className='mg-bottom-nav' aria-label='Navegación principal'>
				<button className='nav-item'>★</button>
				<button className='nav-item'>📊</button>
				<button className='nav-item nav-home'>🏠</button>
				<button className='nav-item'>$</button>
				<button className='nav-item'>📖</button>
			</nav>
		</div>
	);
};

export default MigestiongestionDiaria;
