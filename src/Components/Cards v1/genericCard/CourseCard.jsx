// CourseCard.jsx
import React from 'react';
import './CourseCard.css';

const CourseCard = ({
	type = 'course', // "course" o "advisor"
	title,
	subtitle,
	description,
	imageUrl,
	tags = [],
	rating = 0,
	progress = 0,
	instructorName = '',
}) => {
	return (
		<div className='course-card'>
			{/* Imagen */}
			<div className='card-image-section'>
				<img src={imageUrl} alt={title} className='card-main-image' />
			</div>

			{/* Sección dinámica según el tipo */}
			<div className='card-dynamic-section'>
				{type === 'advisor' && (
					<div className='advisor-info'>
						<div className='rating-stars'>
							{[...Array(5)].map((_, index) => (
								<span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
									★
								</span>
							))}
						</div>
						<div className='tags-container'>
							{tags.map((tag, index) => (
								<span key={index} className='tag'>
									{tag}
								</span>
							))}
						</div>
					</div>
				)}

				{type === 'course' && (
					<div className='course-progress'>
						<div className='tags-container'>
							{tags.map((tag, index) => (
								<span key={index} className='tag'>
									{tag}
								</span>
							))}
						</div>
						<div className='progress-section'>
							<span className='progress-text'>{progress}% completado</span>
							<div className='progress-bar'>
								<div className='progress-fill' style={{ width: `${progress}%` }}></div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Contenido */}
			<div className='card-content'>
				<h2 className='card-title'>{title}</h2>
				{subtitle && <h3 className='card-subtitle'>{subtitle}</h3>}
				<p className='card-description'>{description}</p>
			</div>
		</div>
	);
};

export default CourseCard;
