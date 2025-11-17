import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Chip from "../../Components/Chips/chips";
const Dashboard = () => {
  const [selected, setSelected] = useState(false);
  const Nav = useNavigate();
  const Mes = () => {
    Nav("/GastosMes");
  };
  const Presupuesto = () => {
    Nav("/Presupuesto");
  };
  const Racha = () => {
    Nav("/Racha");
  };

  return (
    <div className="">
      <h1>Dashboard - Inicio</h1>
      <button onClick={Mes} className="new-game-button">
        Distribución gastos x mes
      </button>
      <button onClick={Presupuesto} className="new-game-button">
        Presupuesto
      </button>
      <button onClick={Racha} className="new-game-button">
        Tu racha
      </button>

      <Chip
        label="mi nombre es david cardona"
        isSelected={selected}
        onClick={() => setSelected(!selected)}
      />
    </div>
  );
};

export default Dashboard;
