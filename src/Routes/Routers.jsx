import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard - Inicio";
import Presupuesto from "../Pages/Dashboard/Presupuesto";
import GastosMes from "../Pages/Dashboard/Distribución gastos x mes";
import GastosSemana from "../Pages/Dashboard/Distribución gastos x semana";
import MiPerfil from "../Pages/MiPerfil/MiPerfil";
import EditarPerfil from "../Pages/MiPerfil/EditarPerfil";
import Configuraciones from "../Pages/MiPerfil/Configuraciones";
import Membresia from "../Pages/MiPerfil/Membresia";
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/GastosMes" element={<GastosMes />} />
        <Route path="/GastosSemana" element={<GastosSemana />} />
        <Route path="/Presupuesto" element={<Presupuesto />} />
        <Route path="/perfil" element={<MiPerfil />} />
        <Route path="/perfil/editar" element={<EditarPerfil />} />
        <Route path="/perfil/configuraciones" element={<Configuraciones />} />
        <Route path="/perfil/membresia" element={<Membresia />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
