import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// TEMPORAL: Comentado para desarrollo sin Firebase
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { onAuthStateChanged } from "firebase/auth";
import './MiPerfil.css';

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-circle" viewBox="0 0 16 16">
    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM5.854 5.146a.5.5 0 0 1 0 .708L3.707 8l2.147 2.146a.5.5 0 0 1-.708.708l-2.5-2.5a.5.5 0 0 1 0-.708l2.5-2.5a.5.5 0 0 1 .708 0ZM9 5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7Zm2.146-.354a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708-.708L13.293 8l-2.147-2.146a.5.5 0 0 1 0-.708Z"/>
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
  </svg>
);

const MiPerfil = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    documentNumber: '',
    mobileNumber: '',
    email: '',
    monthlyIncome: ''
  });

  useEffect(() => {
    // TEMPORAL: Datos de prueba para desarrollo
    // TODO: Descomentar cuando Firebase esté configurado
    /*
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setFormData({
              fullName: userData.fullName || '',
              documentNumber: userData.documentNumber || '',
              mobileNumber: userData.mobileNumber || '',
              email: currentUser.email || '',
              monthlyIncome: userData.monthlyIncome || ''
            });
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
          setErrors({ firebase: "Error al cargar los datos del perfil." });
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
    */
    
    // Datos de prueba temporales
    setFormData({
      fullName: 'Eduardo Villamil',
      documentNumber: '12345678',
      mobileNumber: '3001234567',
      email: 'eduardo.villamil@gmail.com',
      monthlyIncome: '5000000'
    });
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="perfil-container">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <button className="back-button" onClick={() => navigate('/')}>
          <BackIcon />
        </button>
        <h1>Mi perfil</h1>
      </div>

      <div className="perfil-avatar-section">
        <div className="avatar-circle" onClick={() => navigate('/perfil/editar', { state: { userData: formData } })}>
          <EyeIcon />
        </div>
        <h2>{formData.fullName}</h2>
        <p className="email-display">{formData.email}</p>
      </div>

      <div className="perfil-sections">
        <div className="section-item" onClick={() => navigate('/perfil/editar', { state: { userData: formData } })}>
          <div className="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
              <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
            </svg>
          </div>
          <div className="section-content">
            <h4>Cuentas y tarjetas</h4>
            <p>Gestiona tus cuentas y tarjetas.</p>
          </div>
          <span className="arrow-icon">›</span>
        </div>

        <div className="section-item" onClick={() => navigate('/perfil/configuraciones')}>
          <div className="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319z"/>
            </svg>
          </div>
          <div className="section-content">
            <h4>Configuraciones</h4>
            <p>Accede a configuraciones de la aplicación.</p>
          </div>
          <span className="arrow-icon">›</span>
        </div>

        <div className="section-item" onClick={() => alert('Contactar asesor - Próximamente')}>
          <div className="section-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
            </svg>
          </div>
          <div className="section-content">
            <h4>Contactar asesor</h4>
            <p>Agenda citas y recibe un acompañamiento personalizado.</p>
          </div>
          <span className="arrow-icon">›</span>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;
