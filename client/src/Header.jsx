// Header.js
import './Header.css'; // Importa el CSS específico para el header

const Header = () => {
    return (
        <header>
            <h1>Veterinaria Patito</h1>
            <nav>
                <ul>
                    <li><a href="/">Inicio</a></li>
                    <li><a href="/about">Acerca de</a></li>
                    <li><a href="/contact">Contacto</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
