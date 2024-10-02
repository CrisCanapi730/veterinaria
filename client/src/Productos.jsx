import { useState } from 'react';
import './App.css';


function Productos(){
    // Estados para productos
    const [nombreProducto, setNombreProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState("");
    const [idProducto, setIdProducto] = useState("");
    const [editarProducto, setEditarProducto] = useState(false);
    const [listaProductos, setProductos] = useState([]);

    // Funciones para productos
    const addProducto = () => {
        if (nombreProducto.trim() === "" || precioProducto.trim() === "") {
        alert("Por favor, completa todos los campos del producto.");
        return;
        }
        Axios.post("http://localhost:3001/createProducto", {
        nombre: nombreProducto,
        precio: precioProducto
        }).then(() => {
        alert("Producto Registrado");
        limpiarDatosProducto();
        }).catch((error) => {
        console.error("Error al registrar producto:", error);
        });
    }
    
    const updateProducto = () => {
        Axios.put("http://localhost:3001/updateProducto", {
        id: idProducto,
        nombre: nombreProducto,
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
        setPrecioProducto("");
        setEditarProducto(false);
    }
    
    const editarProductoFunc = (val) => {
        setEditarProducto(true);
        setNombreProducto(val.nombre);
        setPrecioProducto(val.precio);
        setIdProducto(val.id);
    }
    
    const getProductos = () => {
        Axios.get("http://localhost:3001/productos").then((response) => {
        setProductos(response.data);
        }).catch((error) => {
        console.error("Error al obtener productos:", error);
        });
    }
}

export default Productos