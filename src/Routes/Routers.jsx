import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard - Inicio";
import Presupuesto from "../Pages/Dashboard/Presupuesto";
import GastosMes from "../Pages/Dashboard/Distribución gastos x mes";
import GastosSemana from "../Pages/Dashboard/Distribución gastos x semana";
import MigestiongestionDiaria from "../Pages/Migestion/Migestion-gestionDiaria";
import MigestionMovimientos from "../Pages/Migestion/Migestion-gestionDiariaMovimient";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/GastosMes" element={<GastosMes />} />
        <Route path="/GastosSemana" element={<GastosSemana />} />
        <Route path="/Presupuesto" element={<Presupuesto />} />
        <Route path="/Migestion-gestionDiaria" element={<MigestiongestionDiaria />} />
        <Route path="/Migestion-gestionDiariaMovimientos" element={<MigestionMovimientos />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
