import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditarPerfil.css';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.94 5.94 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.707z"/>
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.288.822.822.028.028a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588l-.771-.771A5.944 5.944 0 0 1 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 2.828 8c.058-.087.122-.183.195.288.335-.48.83-1.12 1.465-1.755.165-.165.337-.328-.517-.486l.708.707A7.023 7.023 0 0 0 8 3.5c.66 0 1.298.12 1.892.34l-.709.708z"/>
    <path fillRule="evenodd" d="M1.646 1.646a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708z"/>
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
  </svg>
);

const EditarPerfil = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.userData || {
    fullName: 'Eduardo Villamil',
    documentNumber: '12345678',
    mobileNumber: '3001234567',
    email: 'eduardo.villamil@gmail.com',
    monthlyIncome: '3200000',
    password: '12345678'
  };

  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);
  const [showCedula, setShowCedula] = useState(false);
  const [showIngresos, setShowIngresos] = useState(false);
  const [errors, setErrors] = useState({});

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    // Remover caracteres no numéricos excepto espacios para formato
    const numericValue = value.replace(/[^\d\s]/g, '');
    setFormData({ ...formData, [name]: numericValue });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "El nombre y apellido son obligatorios.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "El correo electrónico no es válido.";
    if (!formData.documentNumber || formData.documentNumber.replace(/\s/g, '').length < 8) tempErrors.documentNumber = "El número de documento debe tener al menos 8 dígitos.";
    if (!formData.monthlyIncome) tempErrors.monthlyIncome = "Los ingresos mensuales son obligatorios.";
    if (!formData.password || formData.password.length < 8) tempErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Datos guardados:', formData);
      // Aquí guardarías en Firebase cuando esté configurado
      navigate('/perfil', { state: { userData: formData, updated: true } });
    }
  };

  return (
    <div className="editar-perfil-container">
      <div className="editar-header">
        <button className="back-button" onClick={() => navigate('/perfil')}>
          <BackIcon />
        </button>
        <h1>Editar perfil</h1>
      </div>

      <div className="editar-avatar-section">
        <div className="avatar-circle">
          <EyeIcon />
          <button className="avatar-edit-button">
            <EditIcon />
          </button>
        </div>
      </div>

      <form className="editar-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre y apellido</label>
          <input 
            type="text" 
            name="fullName" 
            value={formData.fullName} 
            onChange={handleChange}
            placeholder="Eduardo Villamil"
          />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>

        <div className="form-group">
          <label>Correo electrónico</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            placeholder="eduardo.villamil@gmail.com"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group password-group">
          <label>Cédula</label>
          <input 
            type={showCedula ? "text" : "password"} 
            name="documentNumber" 
            value={formData.documentNumber} 
            onChange={handleNumericChange}
            placeholder="12 345 678"
            inputMode="numeric"
          />
          <span className="password-toggle-icon" onClick={() => setShowCedula(!showCedula)}>
            {showCedula ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
          {errors.documentNumber && <p className="error-message">{errors.documentNumber}</p>}
        </div>

        <div className="form-group password-group">
          <label>Ingresos mensuales</label>
          <input 
            type={showIngresos ? "text" : "password"} 
            name="monthlyIncome" 
            value={showIngresos ? formatNumber(formData.monthlyIncome) : formData.monthlyIncome}
            onChange={handleNumericChange}
            placeholder="3.200.000"
            inputMode="numeric"
          />
          <span className="password-toggle-icon" onClick={() => setShowIngresos(!showIngresos)}>
            {showIngresos ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
          {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome}</p>}
        </div>

        <div className="form-group password-group">
          <label>Contraseña</label>
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            placeholder="********"
          />
          <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <button type="submit" className="guardar-button">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EditarPerfil;
