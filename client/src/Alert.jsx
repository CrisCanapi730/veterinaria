// Alert.jsx
import PropTypes from 'prop-types'; // Importa PropTypes
import './Alert.css';

const Alert = ({ message, onClose }) => {
    return (
        <div className="alert-container">
            <div className="alert">
                <h4>Veterinaria Patito</h4>
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

// Define las validaciones de las props
Alert.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Alert;
