import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard - Inicio';
import Presupuesto from '../Pages/Dashboard/Presupuesto';
import GastosMes from '../Pages/Dashboard/Distribución gastos x mes';
import GastosSemana from '../Pages/Dashboard/Distribución gastos x semana';
import Simuladores from '../Pages/Simuladores/Simuladores';
import SimuladorInversion from '../Pages/Simuladores/SimuladorInversion';
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
				<Route path='/Migestion-gestionDiaria' element={<MigestiongestionDiaria />} />
				<Route path='/Migestion-gestionDiariaMovimientos' element={<MigestionMovimientos />} />
				<Route path='/Migestion-presupuesto' element={<MigestionPresupuesto />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
