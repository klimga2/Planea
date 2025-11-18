import './InputDropdownCss.css';
export default function InputDropdown({ TextTitulo, options, value, onChange }) {
	return (
		<div className='input-dropdown-container'>
			<label>{TextTitulo}</label>
			<select value={value} onChange={(e) => onChange(e.target.value)} required>
				<option value=''>Seleccione...</option>
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

  const [selectedType, setSelectedType] = useState("");
  <InputDropdown
        TextTitulo="Tipo de Meta"
        options={options}
        value={selectedType}
        onChange={setSelectedType}
      />


*/
