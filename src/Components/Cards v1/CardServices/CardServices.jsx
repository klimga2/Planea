import React from 'react';
import './CardServices.css';

const CardServices = ({ services }) => {
	return (
		<div className='cards-container'>
			{services.map((service) => (
				<div key={service.id} className='card-services'>
					<div className='card-image-wrapper'>
						<img src={service.imageUrl} alt={service.title} className='card-image' />
					</div>

					<div className='card-content'>
						<service.icon className='card-icon' />
						<h3 className='card-title'>{service.title}</h3>
					</div>
				</div>
			))}
		</div>
	);
};

export default CardServices;
