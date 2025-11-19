import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

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
        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588l-.771-.771A5.944 5.944 0 0 1 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 2.828 8c.058-.087.122-.183.195-.288.335-.48.83-1.12 1.465-1.755.165-.165.337-.328.517-.486l.708.707A7.023 7.023 0 0 0 8 3.5c.66 0 1.298.12 1.892.34l-.709.708z"/>
        <path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 0 1 .708 0l12 12a.5.5 0 0 1-.708.708l-12-12a.5.5 0 0 1 0-.708z"/>
    </svg>
  );

const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
      
    }
    console.log("Password reset data:", formData);
    navigate('/welcome-start');
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-header">
        <h1>Recuperar contraseña</h1>
        <p>Ingresa tu nueva contraseña</p>
      </div>
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <div className="form-group password-group">
          <label>Nueva contraseña</label>
          <input type={showPassword ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleChange} />
          <span className="password-toggle-icon-reset" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
        </div>
        <div className="form-group password-group">
          <label>Reescribe nueva contraseña</label>
          <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          <span className="password-toggle-icon-reset" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
          </span>
        </div>
        <button type="submit" className="reset-password-button">Recuperar contraseña</button>
      </form>
      <div className="register-link">
        <a href="/signup">Registrarme</a>
      </div>
    </div>
  );
};

export default ResetPassword;
