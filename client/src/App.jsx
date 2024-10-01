import Axios from "axios";
import { useState } from 'react';
import './App.css';



function App() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [editar, setEditar] = useState(false);
  const [listaUsuarios, setUsuarios] = useState([]);
  const [id, setId] = useState("");



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
