import Axios from "axios";
import { useEffect, useState } from "react";
import "./styles/App.css";

function Citas() {
    // Estados para Citas
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [id_usuario, setIdUsuario] = useState("");
    const [id_mascota, setIdMascota] = useState("");
    const [editar, setEditar] = useState(false);
    const [listaCitas, setCitas] = useState([]);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [listaMascotas, setListaMascotas] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        getCitas();
        getUsuarios();
    }, []);

    // Funciones para citas
    const add = () => {
        if (fecha.trim() === "" || hora.trim() === "" || id_usuario.trim() === "" || id_mascota.trim() === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }
        Axios.post("http://localhost:3001/createCita", {
            fecha: fecha,
            hora: hora,
            id_usuario: id_usuario,
            id_mascota: id_mascota
        }).then(() => {
            alert("Cita Registrada");
            limpiarDatos();
            getCitas();
        });
    };

    const update = () => {
        Axios.put("http://localhost:3001/updateCita", {
            id: id,
            fecha: fecha,
            hora: hora,
            id_usuario: id_usuario,
            id_mascota: id_mascota
        }).then(() => {
            alert("Cita Actualizada");
            limpiarDatos();
            getCitas();
        });
    };

    const deleteCita = (id) => {
        Axios.delete(`http://localhost:3001/deleteCita/${id}`).then(() => {
            alert("Cita Eliminada");
            limpiarDatos();
            getCitas();
        });
    };

    const limpiarDatos = () => {
        setFecha("");
        setHora("");
        setIdUsuario("");
        setIdMascota("");
        setEditar(false);
    };

    const editarCita = (val) => {
        setEditar(true);
        setFecha(val.fecha);
        setHora(val.hora);
        setIdUsuario(val.id_usuario);
        setIdMascota(val.id_mascota);
        setId(val.id);
    };

    const getCitas = () => {
        Axios.get("http://localhost:3001/citas").then((response) => {
            setCitas(response.data);
        });
    };

    const getUsuarios = () => {
        Axios.get("http://localhost:3001/usuarios").then((response) => {
            setListaUsuarios(response.data);
        });
    };

    const getMascotas = (idUsuario) => {
        if (idUsuario) {
            Axios.get(`http://localhost:3001/mascotasByUsuario/${idUsuario}`).then((response) => {
                setListaMascotas(response.data);
            });
        } else {
            setListaMascotas([]);
        }
    };

    return (
        <div className="App">
            <div className="datos">
                <label>Usuario: 
                    <select value={id_usuario} onChange={(event) => {
                        setIdUsuario(event.target.value);
                        getMascotas(event.target.value);
                    }}>
                        <option value="">Selecciona un usuario</option>
                        {listaUsuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre} (ID: {usuario.id})
                            </option>
                        ))}
                    </select>
                </label>

                <label>Mascota: 
                    <select value={id_mascota} onChange={(event) => setIdMascota(event.target.value)}>
                        <option value="">Selecciona una mascota</option>
                        {listaMascotas.map((mascota) => (
                            <option key={mascota.id} value={mascota.id}>
                                {mascota.nombre} (ID: {mascota.id})
                            </option>
                        ))}
                    </select>
                </label>

                <label>Fecha: 
                    <input type="date" value={fecha} onChange={(event) => setFecha(event.target.value)} />
                </label>

                <label>Hora: 
                    <input type="time" value={hora} onChange={(event) => setHora(event.target.value)} />
                </label>

                <div>
                    {editar ? (
                        <>
                            <button onClick={update}>Actualizar Cita</button>
                            <button onClick={limpiarDatos}>Cancelar</button>
                        </>
                    ) : (
                        <button onClick={add}>Registrar Cita</button>
                    )}
                </div>
            </div>

            <div className="listaCitas">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Mascota</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaCitas.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.id}</td>
                                <td>{cita.id_usuario}</td>
                                <td>{cita.id_mascota}</td>
                                <td>{cita.fecha}</td>
                                <td>{cita.hora}</td>
                                <td>
                                    <button onClick={() => editarCita(cita)}>Editar</button>
                                    <button onClick={() => deleteCita(cita.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Citas;
