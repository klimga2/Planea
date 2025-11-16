import "./inputCss.css";
const InputEscrito = ({ TextTitulo, TextDescripcion, onChange }) => {
  return (
    <div className="input-container">
      <label>{TextTitulo}</label>
      <input type="text" placeholder={TextDescripcion} onChange={onChange} />
    </div>
  );
};

export default InputEscrito;
