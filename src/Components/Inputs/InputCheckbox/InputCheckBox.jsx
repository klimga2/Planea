/* cuando usen este componente usenlo de esta fromar 
  const [checked, setChecked] = useState(false);
    
    <Checkbox
        label="90 días"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      
      
      */

const Checkbox = ({ label, checked, onChange }) => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      padding: "16px",
      cursor: "pointer",
      borderBottom: "1px solid #E5E7EB",
      backgroundColor: "#FFFFFF",
      transition: "background-color 0.2s ease",
    },
    checkboxWrapper: {
      position: "relative",
      display: "inline-block",
      width: "20px",
      height: "20px",
      marginRight: "12px",
    },
    checkbox: {
      position: "absolute",
      opacity: 0,
      cursor: "pointer",
      width: "100%",
      height: "100%",
    },
    customCheckbox: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "20px",
      height: "20px",
      border: "2px solid #3B82F6",
      borderRadius: "4px",
      backgroundColor: checked ? "#3B82F6" : "#FFFFFF",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    checkmark: {
      display: checked ? "block" : "none",
      width: "5px",
      height: "10px",
      border: "solid white",
      borderWidth: "0 2px 2px 0",
      transform: "rotate(45deg)",
    },
    label: {
      fontSize: "16px",
      color: "#374151",
      userSelect: "none",
    },
  };

  return (
    <label
      style={styles.container}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#F9FAFB";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#FFFFFF";
      }}
    >
      <div style={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={styles.checkbox}
        />
        <span style={styles.customCheckbox}>
          <span style={styles.checkmark}></span>
        </span>
      </div>
      <span style={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;
