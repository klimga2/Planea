import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email for password reset:", email);
    navigate('/reset-password');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-header">
        <h1>Olvidé mi contraseña</h1>
        <p>Ingresa tu correo electrónico para recuperar tu contraseña.</p>
      </div>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="forgot-password-button">Recuperar contraseña</button>
      </form>
      <div className="register-link">
        <a href="/signup">Registrarme</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
