import { useNavigate } from "react-router-dom";

const Presupuesto = () => {
  const Nav = useNavigate();
  const Atras = () => {
    Nav("/");
  };

  return (
    <div className="">
      <h1>Presupuesto</h1>
      <button onClick={Atras} className="new-game-button">
        Atras
      </button>
    </div>
  );
};

export default Presupuesto;
