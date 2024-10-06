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
            <li><Link to="/mascotas">Mascotas</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><a href="#">Citas</a></li>
            </ul>
        </nav>
        </header>
    );
};

export default Header;
