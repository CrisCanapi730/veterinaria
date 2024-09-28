import Axios from "axios";
import { useState } from 'react';
import './App.css';



function App() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [listaUsuarios, setUsuarios] = useState([]);



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
    });

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

        <label htmlFor="">Nombre: <input
        onChange={(event)=>{
          setNombre(event.target.value);
        }}
        type="text" /></label>

        <label htmlFor="">Correo electronico: <input
        onChange={(event)=>{
          setCorreo(event.target.value);
        }}
        type="text" /></label>

        <label htmlFor="">Contrasena: <input 
        onChange={(event)=>{
          setContrasena(event.target.value);
        }}
        type="text" /></label>

        <button onClick={add}>Registrarse</button>
      </div>
      <div className="listaUsuarios">

        <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>Contrasena</th>
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
