import { useState } from 'react';
import './App.css';


function Mascotas(){
    // Estados para Mascotas
    const [nombreMascota, setNombreMascota] = useState("");
    const [tipoMascota, setTipoMascota] = useState("");
    const [idMascota, setIdMascota] = useState("");
    const [editarMascota, setEditarMascota] = useState(false);
    const [listaMascotas, setMascotas] = useState([]);

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
}

export default Mascotas