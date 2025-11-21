import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SmsAuthorization.css';
import { FaCommentDots } from 'react-icons/fa';

const SmsAuthorization = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    setModalOpen(true);
  };

  const handleAccept = () => {
    setModalOpen(false);
    navigate('/financialLevel');
  };

  const handleDecline = () => {
    setModalOpen(false);
  };

  return (
    <div className="sms-auth-container">
      <div className="sms-auth-content">
        <div className="sms-auth-icon-wrapper">
          <FaCommentDots className="sms-auth-icon" />
        </div>
        <div className="sms-auth-text-content">
          <h1>Autoriza tus mensajes SMS</h1>
          <p>
            Con ello, tus gastos se integrarán automáticamente cuando te llegue el SMS de confirmación, olvida tener que ingresar cada gasto a mano.
            <br />
            ¡No te preocupes! No nos interesa nada más.
          </p>
        </div>
      </div>
      <button className="sms-auth-button" onClick={handleContinue}>
        Continuar
      </button>

      {modalOpen && (
        <div className="sms-auth-modal-overlay">
          <div className="sms-auth-modal">
            <h2>Acceso a tus SMS</h2>
            <p>Nos autorizas acceso para enviarte SMS</p>
            <div className="sms-auth-modal-buttons">
              <button onClick={handleDecline} className="decline-button">
                No acepto
              </button>
              <button onClick={handleAccept} className="accept-button">
                Sí, acepto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmsAuthorization;
