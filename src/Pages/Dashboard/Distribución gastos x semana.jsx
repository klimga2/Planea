import { useNavigate } from "react-router-dom";

const GastosSemana = () => {
  const Nav = useNavigate();

  const Atras = () => {
    Nav("/GastosMes");
  };
  return (
    <div className="">
      <h1>Distribución gastos x semana</h1>
      <button onClick={Atras} className="new-game-button">
        Atras
      </button>
    </div>
  );
};

export default GastosSemana;
