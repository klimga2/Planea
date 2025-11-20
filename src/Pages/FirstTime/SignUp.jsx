import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import './SignUp.css';

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
        <path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708z"/>
    </svg>
  );

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    documentNumber: '',
    mobileNumber: '',
    email: '',
    password: '',
    monthlyIncome: ''
  });
  const [errors, setErrors] = useState({});

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "El nombre y apellido son obligatorios.";
    if (!formData.documentNumber || formData.documentNumber.length < 8) tempErrors.documentNumber = "El número de documento debe tener al menos 8 dígitos.";
    if (!formData.mobileNumber || formData.mobileNumber.length < 10) tempErrors.mobileNumber = "El número de celular debe tener al menos 10 dígitos.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "El correo electrónico no es válido.";
    if (!formData.password || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/.test(formData.password)) tempErrors.password = "La contraseña debe tener al menos 10 caracteres y un número.";
    if (!formData.monthlyIncome) tempErrors.monthlyIncome = "Los ingresos mensuales son obligatorios.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then(async (userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // Add a new document in collection "users"
          await setDoc(doc(db, "users", user.uid), {
            fullName: formData.fullName,
            documentNumber: formData.documentNumber,
            mobileNumber: formData.mobileNumber,
            monthlyIncome: formData.monthlyIncome
          });
          console.log(user);
          navigate('/sms-authorization');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          setErrors({ ...errors, firebase: errorMessage });
        });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <h1>Registrarme</h1>
        <p>Ingresa los siguientes datos.</p>
      </div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre y apellido *</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
          {errors.fullName && <p className="error-message">{errors.fullName}</p>}
        </div>
        <div className="form-group">
          <label>Número de documento *</label>
          <input type="text" name="documentNumber" value={formData.documentNumber} onChange={handleNumericChange} inputMode="numeric" />
          {errors.documentNumber && <p className="error-message">{errors.documentNumber}</p>}
        </div>
        <div className="form-group">
          <label>Número de celular *</label>
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleNumericChange} inputMode="numeric" />
          {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
        </div>
        <div className="form-group">
          <label>Correo electrónico *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group password-group">
          <label>Contraseña *</label>
          <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} />
          <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label>Ingresos mensuales *</label>
          <input type="text" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleNumericChange} inputMode="numeric" />
          {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome}</p>}
        </div>
        {errors.firebase && <p className="error-message">{errors.firebase}</p>}
        <button type="submit" className="signup-button">Crear cuenta</button>
      </form>
      <div className="login-link">
        <a href="/login">Iniciar Sesión</a>
      </div>
    </div>
  );
};

export default SignUp;