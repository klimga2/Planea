import { SeccionGestiontData } from './SeccionGestionData';
import { FaChevronRight } from 'react-icons/fa';
import './SeccionGestion.css';

const SeccionGestion = () => {
	return (
		<div className='services-list-container'>
			{SeccionGestiontData.map((item) => (
				<div key={item.id} className='service-item'>
					<div className='service-left'>
						<item.icon className='service-icon' />
						<div className='service-text'>
							<h3 className='service-title'>{item.title}</h3>
							<p className='service-description'>{item.description}</p>
						</div>
					</div>

					<FaChevronRight className='service-arrow' />
				</div>
			))}
		</div>
	);
};

export default SeccionGestion;
