import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputDropdown from '../../Components/Inputs/InputDropdown/InputDropdown';
import CardServices from '../../Components/Cards v1/CardServices/CardServices';
import { servicesData } from '../../Components/Cards v1/CardServices/ServicesData';
import SeccionGestion from '../../Components/Cards v1/SeccionGestion/SeccionGestion';
import { SeccionGestiontData } from '../../Components/Cards v1/SeccionGestion/SeccionGestionData';
import CourseCard from '../../Components/Cards v1/genericCard/CourseCard';
import { advisorsData } from '../../Components/Cards v1/genericCard/advisorsData';
import { coursesData } from '../../Components/Cards v1/genericCard/coursesData';

const Dashboard = () => {
	const Nav = useNavigate();
	const Mes = () => {
		Nav('/GastosMes');
	};
	const Presupuesto = () => {
		Nav('/Presupuesto');
	};
	const Racha = () => {
		Nav('/Racha');
	};

	return (
		<div className=''>
			<h1>Dashboard - Inicio</h1>
			<button onClick={Mes} className='new-game-button'>
				Distribución gastos x mes
			</button>
			<button onClick={Presupuesto} className='new-game-button'>
				Presupuesto
			</button>
			<button onClick={Racha} className='new-game-button'>
				Tu racha
			</button>
		</div>
	);
};

export default Dashboard;
