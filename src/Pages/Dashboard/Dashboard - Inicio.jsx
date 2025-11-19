import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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
  const OnBoarding = () => {
    Nav("/onBoarding");
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
      <button onClick={OnBoarding} className="new-game-button">
        On Boarding
      </button>
    </div>
  );
};

export default Dashboard;
