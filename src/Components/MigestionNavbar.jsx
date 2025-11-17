import { useNavigate } from 'react-router-dom';

const MigestionNavbar = ({ title, onBack }) => {
	const Nav = useNavigate();

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else {
			Nav(-1);
		}
	};

	return (
		<header className='gf-header'>
			<button className='gf-back' onClick={handleBack} aria-label='Atrás'>
				◀
			</button>
			<h1 className='gf-title'>{title}</h1>
		</header>
	);
};

export default MigestionNavbar;
