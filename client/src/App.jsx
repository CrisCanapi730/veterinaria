import Axios from "axios";
import { useState } from 'react';
import './App.css';


function App() {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const add = () => {
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      correo:correo,
      contrasena:contrasena
    }).then(()=>{
      alert("Usuario Registrado");
    });
  }

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
    </div>
  )
}

export default App
