import { useNavigate } from "react-router-dom";

const GastosMes = () => {
  const Nav = useNavigate();
  const Semana = () => {
    Nav("/GastosSemana");
  };
  const Atras = () => {
    Nav("/");
  };
  return (
    <div className="">
      <h1>Distribución gastos x mes</h1>
      <button onClick={Semana} className="new-game-button">
        Distribución gastos x semana
      </button>
      <button onClick={Atras} className="new-game-button">
        Atras
      </button>
    </div>
  );
};

export default GastosMes;
