import Axios from 'axios';
import { useEffect, useState } from 'react';
import './styles/App.css';

function Productos() {
    // Estados para productos
    const [nombreProducto, setNombreProducto] = useState("");
    const [descripcionProducto, setDescripcionProducto] = useState(""); // Descripción del producto
    const [precioProducto, setPrecioProducto] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [editarProducto, setEditarProducto] = useState(false);
    const [listaProductos, setProductos] = useState([]);

    // Función para obtener productos al cargar el componente
    useEffect(() => {
        getProductos();
    }, []);

    // Funciones para productos
    const addProducto = () => {
        if (nombreProducto.trim() === "" || precioProducto.trim() === "") {
            alert("Por favor, completa todos los campos del producto.");
            return;
        }
        Axios.post("http://localhost:3001/createProducto", {
            nombre: nombreProducto,
            descripcion: descripcionProducto, // Incluir la descripción en el POST
            precio: precioProducto
        }).then(() => {
            alert("Producto Registrado");
            limpiarDatosProducto();
            getProductos(); // Obtener la lista actualizada de productos
        }).catch((error) => {
            console.error("Error al registrar producto:", error);
        });
    }

    const updateProducto = () => {
        Axios.put("http://localhost:3001/updateProducto", {
            cod: idProducto,
            nombre: nombreProducto,
            descripcion: descripcionProducto, // Incluir la descripción en el PUT
            precio: precioProducto
        }).then(() => {
            getProductos();
            alert("Producto Actualizado");
            limpiarDatosProducto();
        }).catch((error) => {
            console.error("Error al actualizar producto:", error);
        });
    }

    const deleteProducto = (id) => {
        Axios.delete(`http://localhost:3001/deleteProducto/${id}`).then(() => {
            getProductos();
            alert("Producto Eliminado");
            limpiarDatosProducto();
        }).catch((error) => {
            console.error("Error al eliminar producto:", error);
        });
    }

    const limpiarDatosProducto = () => {
        setNombreProducto("");
        setDescripcionProducto(""); // Limpiar la descripción
        setPrecioProducto("");
        setEditarProducto(false);
    }

    const editarProductoFunc = (val) => {
        setEditarProducto(true);
        setNombreProducto(val.nombre);
        setDescripcionProducto(val.descripcion); // Establecer la descripción para editar
        setPrecioProducto(val.precio);
        setIdProducto(val.cod); // Cambiado a cod según la estructura de la tabla
    }

    const getProductos = () => {
        Axios.get("http://localhost:3001/productos").then((response) => {
            setProductos(response.data);
        }).catch((error) => {
            console.error("Error al obtener productos:", error);
        });
    }

    return (
        <div className='App'>
            <div className='datos'>

                <label>Nombre del Producto: 
                    <input
                        type="text"
                        value={nombreProducto}
                        onChange={(e) => setNombreProducto(e.target.value)}
                        placeholder="Ingresa el nombre del producto"
                    />
                </label>

                <label>Descripción del Producto: 
                    <input
                        type="text"
                        value={descripcionProducto}
                        onChange={(e) => setDescripcionProducto(e.target.value)} // Campo de descripción
                        placeholder="Ingresa la descripción del producto"
                    />
                </label>

                <label>Precio del Producto: 
                    <input
                        type="text"
                        value={precioProducto}
                        onChange={(e) => setPrecioProducto(e.target.value)}
                        placeholder="Ingresa el precio del producto"
                    />
                </label>

                <div>
                    {
                        editarProducto ? (
                            <>
                                <button onClick={updateProducto}>Actualizar</button>
                                <button onClick={limpiarDatosProducto}>Cancelar</button>
                            </>
                        ) : (
                            <button onClick={addProducto}>Registrar</button>
                        )
                    }
                </div>

            </div>

            <div className="listaUsuarios">
                <table>
                    <thead>
                        <tr>
                            <th>Cod</th>
                            <th>Nombre</th>
                            <th>Descripción</th> {/* Agregado para la descripción */}
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaProductos.map((producto) => (
                            <tr key={producto.cod}> {/* Cambiado a cod */}
                                <td>{producto.cod}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.descripcion}</td> {/* Mostrar descripción */}
                                <td>{producto.precio}</td>
                                <td>
                                    <button onClick={() => editarProductoFunc(producto)}>Actualizar</button>
                                    <button onClick={() => deleteProducto(producto.cod)}>Eliminar</button> {/* Cambiado a cod */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Productos;
