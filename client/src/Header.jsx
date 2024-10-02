import { Link } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
    return (
        <header>
        <h1>Veterinaria Patito</h1>
        <nav>
            <ul>
            <li><Link to="/inicio">Inicio</Link></li>
            <li><Link to="/usuarios">Usuarios</Link></li>
            <li><a href="#">Mascotas</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Citas</a></li>
            </ul>
        </nav>
        </header>
    );
};

export default Header;
