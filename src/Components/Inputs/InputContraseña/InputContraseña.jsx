import "./inputContraseña.css";
const InputContraseña = ({ TextTitulo, TextDescripcion, onChange }) => {
  return (
    <div className="input-container">
      <label>{TextTitulo}</label>
      <input
        type="Password"
        placeholder={TextDescripcion}
        onChange={onChange}
      />
    </div>
  );
};

export default InputContraseña;
