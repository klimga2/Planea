import './InputDropdownCss.css';

export default function InputDropdown({ options, value, onChange }) {
  return (
    <div className='input-dropdown-container'>
      <select value={value} onChange={(e) => onChange(e.target.value)} required>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
