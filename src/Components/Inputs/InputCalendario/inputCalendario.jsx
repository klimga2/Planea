import "./inputCalendarioCss.css";
const InputCalendario = ({ TextTitulo, TextDescripcion, onChange }) => {
  return (
    <div className="input-calendario-container">
      <label>{TextTitulo}</label>
      <input type="date" placeholder={TextDescripcion} onChange={onChange} />
    </div>
  );
};

export default InputCalendario;
