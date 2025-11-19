import React from 'react';
import './ModalExito.css';
import { IoCheckmarkCircle } from 'react-icons/io5';

const ModalExito = ({ mensaje = 'Exportado con éxito', onClose }) => {
	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-exito' onClick={(e) => e.stopPropagation()}>
				<div className='modal-icono'>
					<IoCheckmarkCircle size={64} color='#4a90e2' />
				</div>
				<p className='modal-mensaje'>{mensaje}</p>
			</div>
		</div>
	);
};

export default ModalExito;
