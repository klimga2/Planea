import React from "react";

const Chip = ({ label, isSelected, onClick }) => {
  const styles = {
    button: {
      padding: "5px 18px",
      borderRadius: "50px",
      border: "none",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      backgroundColor: isSelected ? "#60A5FA" : "#DBEAFE",
      color: isSelected ? "#FFFFFF" : "#1E3A8A",
    },
  };

  return (
    <button
      onClick={onClick}
      style={styles.button}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.target.style.backgroundColor = "#BFDBFE";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.target.style.backgroundColor = "#DBEAFE";
        }
      }}
    >
      {label}
    </button>
  );
};

export default Chip;
/* cuando usen este componente usenlo de esta fromar 
    const [selected, setSelected] = useState(false);
    
    <Chip
        label="mi nombre es david cardona"
        isSelected={selected}
        onClick={() => setSelected(!selected)}
    />
      
      
      
      */
