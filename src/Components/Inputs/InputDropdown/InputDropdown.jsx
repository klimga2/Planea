export default function InputDropdown({
  TextTitulo,
  options,
  value,
  onChange,
}) {
  return (
    <div>
      <label>{TextTitulo}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Seleccione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
/*Cuando usen este componente tiene que creear un arrey de esta froma:

 const options = [
    { value: "ahorro", label: "Ahorro" },
    { value: "inversion", label: "Inversión" },
    { value: "retiro", label: "Retiro / Pensión" },
  ];

 y ponerlo de esta froma en la pagina:

  <InputDropdown
        TextTitulo="Tipo de Meta"
        options={options}
        value={selectedType}
        onChange={setSelectedType}
      />


*/
