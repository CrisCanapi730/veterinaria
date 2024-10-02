import Axios from "axios";
import { useState } from 'react';
import './App.css';



function App() {
  // Estados para Usuarios
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [editar, setEditar] = useState(false);
  const [listaUsuarios, setUsuarios] = useState([]);
  const [id, setId] = useState("");

  // Estados para productos
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [editarProducto, setEditarProducto] = useState(false);
  const [listaProductos, setProductos] = useState([]);

  // Estados para Mascotas
  const [nombreMascota, setNombreMascota] = useState("");
  const [tipoMascota, setTipoMascota] = useState("");
  const [idMascota, setIdMascota] = useState("");
  const [editarMascota, setEditarMascota] = useState(false);
  const [listaMascotas, setMascotas] = useState([]);



  // Funciones para usuarios
  const add = () => {
    if (nombre.trim() === "" || correo.trim() === "" || contrasena.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      correo:correo,
      contrasena:contrasena
    }).then(()=>{
      alert("Usuario Registrado");
      limpiarDatos();
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      correo:correo,
      contrasena:contrasena
    }).then(()=>{
      getUsuarios();
      alert("Usuario Actualizado");
      limpiarDatos();
    });
  }

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
      getUsuarios();
      alert("Usuario ELIMINADO");
      limpiarDatos();
    });
  }

  const limpiarDatos = () => {
    setNombre("");
    setCorreo("");
    setContrasena("");
    setEditar(false);
  }



  const editarUsuario = (val)=>{
    setEditar(true);
    setNombre(val.nombre);
    setCorreo(val.correo);
    setContrasena(val.contrasena);
    setId(val.id);
  }

  const getUsuarios = () => {
    Axios.get("http://localhost:3001/usuarios").then((response)=>{
      setUsuarios(response.data);
    });
  }
  // Funciones para mascotas
  const addMascota = () => {
    if (nombreMascota.trim() === "" || tipoMascota.trim() === "") {
      alert("Por favor, completa todos los campos de la mascota.");
      return;
    }
    Axios.post("http://localhost:3001/createMascota", {
      nombre: nombreMascota,
      tipo: tipoMascota
    }).then(() => {
      alert("Mascota Registrada");
      limpiarDatosMascota();
    });
  }
  
  const updateMascota = () => {
    Axios.put("http://localhost:3001/updateMascota", {
      id: idMascota,
      nombre: nombreMascota,
      tipo: tipoMascota
    }).then(() => {
      getMascotas();
      alert("Mascota Actualizada");
      limpiarDatosMascota();
    });
  }
  
  const deleteMascota = (id) => {
    Axios.delete(`http://localhost:3001/deleteMascota/${id}`).then(() => {
      getMascotas();
      alert("Mascota Eliminada");
      limpiarDatosMascota();
    });
  }
  
  const limpiarDatosMascota = () => {
    setNombreMascota("");
    setTipoMascota("");
    setEditarMascota(false);
  }
  
  const editarMascotaFuncion = (val) => {
    setEditarMascota(true);
    setNombreMascota(val.nombre);
    setTipoMascota(val.tipo);
    setIdMascota(val.id);
  }
  
  const getMascotas = () => {
    Axios.get("http://localhost:3001/mascotas").then((response) => {
      setMascotas(response.data);
    });
  }

  // ----------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------
  // FUNCIONES PARA MANEJAR PRODUCTOS
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
  

  // -- MOOOOSTRAR USUARIOS IMPORTANTE
  getUsuarios();

  return (
    <div className='App'>
      <div className='datos'>

        <label htmlFor="">Nombre: <input value={nombre} 
        onChange={(event)=>{
          setNombre(event.target.value);
        }}
        type="text" placeholder="Ingresa tu nombre"/></label>

        <label htmlFor="">Correo electronico: <input value={correo} 
        onChange={(event)=>{
          setCorreo(event.target.value);
        }}
        type="text" placeholder="Ingresa tu correo"/></label>

        <label htmlFor="">Contrasena: <input value={contrasena} 
        onChange={(event)=>{
          setContrasena(event.target.value);
        }}
        type="text" placeholder="Ingresa tu contrasena"/></label>

        <div>
          {
            editar?(
              <>
                <button onClick={update}>Actualizar</button>
                <button onClick={limpiarDatos}>Cancelar</button>
              </>
            ):(
              <button onClick={add}>Registrarse</button>
            )
          }
        </div>

        
      </div>
      <div className="listaUsuarios">

        <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Contrasena</th>
                  <th>Accion</th>
              </tr>
          </thead>
          <tbody>
            {
              listaUsuarios.map((val)=>{
                return <tr key={val.id}>
                        <td>{val.id}</td>
                        <td>{val.nombre}</td>
                        <td>{val.correo}</td>
                        <td>{val.contrasena}</td>
                        <td>
                          <div>
                            <button onClick={()=>{
                              editarUsuario(val);
                            }}>Actualizar</button>
                            <button onClick={()=>{
                              deleteUser(val.id);
                            }}>Eliminar</button>
                          </div>
                        </td>
                      </tr>
              })
            }
              
          </tbody>
          <tfoot>
              <tr>
              </tr>
          </tfoot>
        </table>

      </div>
    </div>
  )
}

export default App
