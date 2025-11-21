import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import './AgregarEfectivo.css';

export default function AgregarEfectivo() {
    const navigate = useNavigate();

    // Estados
    const [nombreTitular, setNombreTitular] = useState('Eduardo Villamil');
    const [monto, setMonto] = useState('');
    const tipoProductoFijo = 'Efectivo';
    const iconColor = '#4D9DE0';

    // Cargar datos existentes de efectivo al iniciar
    useEffect(() => {
        const efectivoDataJSON = localStorage.getItem('efectivo_gestion');
        if (efectivoDataJSON) {
            try {
                const efectivoData = JSON.parse(efectivoDataJSON);
                setNombreTitular(efectivoData.titular || 'Eduardo Villamil');
                // Al cargar, el monto debe ser el número puro, no el string formateado.
                setMonto(String(efectivoData.monto || ''));
            } catch (error) {
                console.error("Error al cargar datos de efectivo:", error);
            }
        }
    }, []);

    // Helper para formatear moneda (para la visualización en el input)
    const formatCurrency = (value) => {
        if (!value) return '';
        const cleanValue = value.replace(/[^0-9]/g, '');
        const number = parseInt(cleanValue, 10);
        if (isNaN(number)) return '';
        // Usamos Intl.NumberFormat para formatear correctamente sin el símbolo $ para el estado interno
        return `$${number.toLocaleString('es-CO')}`;
    };

    // ⭐ LÓGICA DE GUARDADO Y ACTUALIZACIÓN (Reemplaza el registro único)
    const handleSaveProduct = () => {
        if (!monto || isNaN(Number(monto))) {
            alert('Por favor, ingresa un monto de Efectivo válido.');
            return;
        }

        const montoNumerico = Number(monto);
        const fechaActualizacion = new Date().toISOString(); // Guarda la fecha y hora actual

        const efectivoActualizado = {
            // Usamos un ID fijo o simple, ya que es un registro único.
            id: 'efectivo-unico',
            titular: nombreTitular,
            tipo: tipoProductoFijo,
            monto: montoNumerico,
            fechaActualizacion: fechaActualizacion, // Nueva fecha
        };

        try {
            // Guardamos el registro único de Efectivo.
            localStorage.setItem('efectivo_gestion', JSON.stringify(efectivoActualizado));

            alert(`¡Efectivo actualizado a ${formatCurrency(monto)} exitosamente!`);
            // ⭐ Redirigir a la página de Efectivo
            navigate('/Migestion-efectivo');
        } catch (error) {
            console.error("Error al guardar en localStorage:", error);
            alert("Hubo un error al intentar guardar el monto de efectivo.");
        }
    };


    return (
        <div className='agregar-producto-container'>
            {/* Top Bar */}
            <div className='top-bar'>
                <span className='back-arrow' onClick={() => navigate("/Migestion-efectivo")}>
                    <MdArrowBack size={24} color={iconColor} />
                </span>
                <span className='top-bar-title'>Actualizar {tipoProductoFijo}</span>
            </div>

            <div className='agregar-producto-form-card'>
                {/* Nombre del titular */}
                <label className='form-label'>Nombre del titular</label>
                <input
                    type='text'
                    className='form-input-agregar'
                    value={nombreTitular}
                    onChange={(e) => setNombreTitular(e.target.value)}
                    placeholder='Nombre del titular'
                    disabled // Deshabilitamos la edición de este campo por simplicidad, puedes habilitarlo si es necesario.
                />

                {/* Monto (Fijo) */}
                <div className='monto-section'>
                    <label className='form-label'>Monto Total</label>
                    <input
                        type='text'
                        className='form-input-agregar'
                        // Mostramos el monto formateado
                        value={formatCurrency(monto)}
                        onChange={(e) => {
                            // Almacenamos solo los números en el estado 'monto'
                            const cleanValue = e.target.value.replace(/[^0-9]/g, '');
                            setMonto(cleanValue);
                        }}
                        placeholder='$0'
                    />
                </div>
            </div>

            {/* BOTÓN GUARDAR PRODUCTO */}
            <button
                className='guardar-producto-btn'
                onClick={handleSaveProduct}
            >
                Guardar
            </button>
        </div>
    );
}