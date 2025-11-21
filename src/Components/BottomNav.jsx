import { FiHome, FiBarChart2, FiStar, FiDollarSign, FiBookOpen } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';


const BottomNav = () => {
    return (
        <footer className="footer-mobile">
            <NavLink to="/goals" className="footer-icon" activeClassName="active">
                <FiStar />
            </NavLink>
            <NavLink to="/Simuladores" className="footer-icon" activeClassName="active">
                <FiBarChart2 />
            </NavLink>
            <NavLink to="/dashboard" className="footer-icon" activeClassName="active">
                <FiHome />
            </NavLink>
            <NavLink to="/Migestion-gestionDiaria" className="footer-icon" activeClassName="active">
                <FiDollarSign />
            </NavLink>
            <NavLink to="/learn" className="footer-icon" activeClassName="active">
                <FiBookOpen />
            </NavLink>
        </footer>
    );
};

export default BottomNav;