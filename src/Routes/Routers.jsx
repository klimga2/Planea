import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard - Inicio';
import Presupuesto from '../Pages/Dashboard/Presupuesto';
import GastosMes from '../Pages/Dashboard/Distribución gastos x mes';
import GastosSemana from '../Pages/Dashboard/Distribución gastos x semana';
import Simuladores from '../Pages/Simuladores/Simuladores';
import SimuladorInversion from '../Pages/Simuladores/SimuladorInversion';
import ProyeccionInversion from '../Pages/Simuladores/ProyeccionInversion';
import SimuladorAhorro from '../Pages/Simuladores/SimuladorAhorro';
import ProyeccionAhorro from '../Pages/Simuladores/ProyeccionAhorro';
import SimuladorCredito from '../Pages/Simuladores/SimuladorCredito';
import ProyeccionCredito from '../Pages/Simuladores/ProyeccionCredito';
import SimuladorMeta from '../Pages/Simuladores/SimuladorMeta';
import ProyeccionMeta from '../Pages/Simuladores/ProyeccionMeta';
import MigestiongestionDiaria from '../Pages/Migestion/Migestion-gestionDiaria';
import MigestionMovimientos from '../Pages/Migestion/Migestion-gestionDiariaMovimient';
import MigestionPresupuesto from '../Pages/Migestion/Migestion-presupuesto';
const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/GastosMes' element={<GastosMes />} />
				<Route path='/GastosSemana' element={<GastosSemana />} />
				<Route path='/Presupuesto' element={<Presupuesto />} />
				<Route path='/Simuladores' element={<Simuladores />} />
				<Route path='/SimuladorInversion' element={<SimuladorInversion />} />
				<Route path='/ProyeccionInversion' element={<ProyeccionInversion />} />
				<Route path='/SimuladorAhorro' element={<SimuladorAhorro />} />
				<Route path='/ProyeccionAhorro' element={<ProyeccionAhorro />} />
				<Route path='/SimuladorCredito' element={<SimuladorCredito />} />
				<Route path='/ProyeccionCredito' element={<ProyeccionCredito />} />
				<Route path='/SimuladorMeta' element={<SimuladorMeta />} />
				<Route path='/ProyeccionMeta' element={<ProyeccionMeta />} />
				<Route path='/Migestion-gestionDiaria' element={<MigestiongestionDiaria />} />
				<Route path='/Migestion-gestionDiariaMovimientos' element={<MigestionMovimientos />} />
				<Route path='/Migestion-presupuesto' element={<MigestionPresupuesto />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
