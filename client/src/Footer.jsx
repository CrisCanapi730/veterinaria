// Footer.js
import './Footer.css'; // Importa el CSS específico para el footer

const Footer = () => {
    return (
        <footer>
            <p>© 2024 Mi Página Web. Todos los derechos reservados.</p>
            <nav>
                <ul>
                    <li><a href="/privacy">Política de Privacidad</a></li>
                    <li><a href="/terms">Términos de Servicio</a></li>
                    <li><a href="/contact">Contacto</a></li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;
