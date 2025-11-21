import React from 'react';
import './Simuladores.css';
import { TbTrendingUp } from 'react-icons/tb';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { CiCreditCard1 } from 'react-icons/ci';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { HiDotsVertical } from 'react-icons/hi';

const Simuladores = () => {
	const simuladores = [
		{
			id: 1,
			icon: TbTrendingUp,
			titulo: 'Simulador de inversión',
			descripcion: 'Proyecta tus inversiones y conoce el retorno esperado.',
		},
		{
			id: 2,
			icon: HiOutlineCurrencyDollar,
			titulo: 'Simulador de ahorro',
			descripcion: 'Calcula cuánto puedes ahorrar según tus ingresos y visualiza tu progreso.',
		},
		{
			id: 3,
			icon: CiCreditCard1,
			titulo: 'Simulador de crédito',
			descripcion: 'Comprende el impacto de los atrasos y compara escenarios de pago.',
		},
		{
			id: 4,
			icon: MdOutlineTrackChanges,
			titulo: 'Simulador de meta',
			descripcion: 'Calcula cuánto puedes ahorrar para alcanzar tu meta.',
		},
	];

	return (
		<div className='simuladores-container'>
			<header className='simuladores-header'>
				<h1 className='simuladores-titulo'>Toma el control de tus finanzas</h1>
				<p className='simuladores-subtitulo'>
					Simula diferentes escenarios y toma decisiones informadas.
				</p>
			</header>

			<div className='simuladores-lista'>
				{simuladores.map((simulador) => {
					const IconComponent = simulador.icon;
					return (
						<div key={simulador.id} className='simulador-card'>
							<div className='simulador-header'>
								<div className='simulador-icon'>
									<IconComponent size={32} />
								</div>
								<button className='simulador-menu'>
									<HiDotsVertical />
								</button>
							</div>
							<h2 className='simulador-titulo'>{simulador.titulo}</h2>
							<p className='simulador-descripcion'>{simulador.descripcion}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Simuladores;
