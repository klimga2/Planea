import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard - Inicio';
import Presupuesto from '../Pages/Dashboard/Presupuesto';
import GastosMes from '../Pages/Dashboard/Distribución gastos x mes';
import GastosSemana from '../Pages/Dashboard/Distribución gastos x semana';
<<<<<<< HEAD
import MigestiongestionDiaria from '../Pages/Migestion/Migestion-gestionDiaria';
import MigestionMovimientos from '../Pages/Migestion/Migestion-gestionDiariaMovimient';
import MigestionPresupuesto from '../Pages/Migestion/Migestion-presupuesto';
import MigestionGastosFijos from '../Pages/Migestion/Migestion-Gastosfijos';
import MigestionGastosFijosAdmin from '../Pages/Migestion/Migestion-Gastosfijos-admin';
=======
import Simuladores from '../Pages/Dashboard/Simuladores';
import MigestiongestionDiaria from '../Pages/Migestion/Migestion-gestionDiaria';
import MigestionMovimientos from '../Pages/Migestion/Migestion-gestionDiariaMovimient';
import MigestionPresupuesto from '../Pages/Migestion/Migestion-presupuesto';
>>>>>>> main
const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/GastosMes' element={<GastosMes />} />
				<Route path='/GastosSemana' element={<GastosSemana />} />
				<Route path='/Presupuesto' element={<Presupuesto />} />
<<<<<<< HEAD
				<Route path='/Migestion-gestionDiaria' element={<MigestiongestionDiaria />} />
				<Route path='/Migestion-gestionDiariaMovimientos' element={<MigestionMovimientos />} />
				<Route path='/Migestion-presupuesto' element={<MigestionPresupuesto />} />
				<Route path='/Migestion-gastos-fijos' element={<MigestionGastosFijos />} />
				<Route path='/Migestion-Gastosfijos-admin' element={<MigestionGastosFijosAdmin />} />
=======
				<Route path='/Simuladores' element={<Simuladores />} />
				<Route path='/Migestion-gestionDiaria' element={<MigestiongestionDiaria />} />
				<Route path='/Migestion-gestionDiariaMovimientos' element={<MigestionMovimientos />} />
				<Route path='/Migestion-presupuesto' element={<MigestionPresupuesto />} />
>>>>>>> main
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
