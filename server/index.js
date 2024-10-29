const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Conexion con la BD
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "122889Ccm",
    database: "veterinaria",
    port: 3305,
});

// BACKEND USUARIOS
app.post("/create", (req, res) => {
    console.log(req.body);
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;


    db.query(
        'INSERT INTO usuarios(nombre, correo, contrasena) VALUES(?,?,?)',
        [nombre, correo, contrasena],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al registrar el usuario");
            } else {
                res.send(result);
            }
        }
    );
});

app.get("/usuarios", (req, res) => {
    db.query('SELECT * FROM usuarios',
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al cargar los usuarios");
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/update", (req, res) => {
    console.log(req.body);
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const id = req.body.id;

    db.query(
        'UPDATE usuarios SET nombre=?, correo=?, contrasena=? WHERE id=?',
        [nombre, correo, contrasena, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al actualizar el usuario");
            } else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        'DELETE FROM usuarios WHERE id=?',id,
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al eliminar el usuario");
            } else {
                res.send(result);
            }
        }
    );
});

// BACKEND MASCOTAS

// Crear una mascota
app.post("/createMascota", (req, res) => {
    const { nombre, especie, edad, id_usuario } = req.body;

    db.query(
        'INSERT INTO mascotas(nombre, especie, edad, id_usuario) VALUES(?,?,?,?)',
        [nombre, especie, edad, id_usuario],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al registrar la mascota");
            } else {
                res.send(result);
            }
        }
    );
});

// Obtener todas las mascotas
app.get("/mascotas", (req, res) => {
    db.query('SELECT * FROM mascotas',
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al cargar las mascotas");
            } else {
                res.send(result);
            }
        }
    );
});

// Actualizar una mascota
app.put("/updateMascota", (req, res) => {
    const { nombre, especie, edad, id_usuario, id } = req.body;

    db.query(
        'UPDATE mascotas SET nombre=?, especie=?, edad=?, id_usuario=? WHERE id=?',
        [nombre, especie, edad, id_usuario, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al actualizar la mascota");
            } else {
                res.send(result);
            }
        }
    );
});

// Eliminar una mascota
app.delete("/deleteMascota/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        'DELETE FROM mascotas WHERE id=?', [id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al eliminar la mascota");
            } else {
                res.send(result);
            }
        }
    );
});


// BACKEND productos


// Crear un producto
app.post("/createProducto", (req, res) => {
    const { nombre, descripcion, precio } = req.body;

    db.query(
        'INSERT INTO productos(nombre, descripcion, precio) VALUES(?,?,?)',
        [nombre, descripcion, precio],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al registrar el producto");
            } else {
                res.send(result);
            }
        }
    );
});

// Obtener todos los productos
app.get("/productos", (req, res) => {
    db.query('SELECT * FROM productos',
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al cargar los productos");
            } else {
                res.send(result);
            }
        }
    );
});

// Actualizar un producto
app.put("/updateProducto", (req, res) => {
    const { nombre, descripcion, precio, cod } = req.body;

    db.query(
        'UPDATE productos SET nombre=?, descripcion=?, precio=? WHERE cod=?',
        [nombre, descripcion, precio, cod],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al actualizar el producto");
            } else {
                res.send(result);
            }
        }
    );
});

// Eliminar un producto
app.delete("/deleteProducto/:cod", (req, res) => {
    const cod = req.params.cod;
    db.query(
        'DELETE FROM productos WHERE cod=?', [cod],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al eliminar el producto");
            } else {
                res.send(result);
            }
        }
    );
});
// backend citas


// BACKEND CITAS

// Crear una cita
app.post("/createCita", (req, res) => {
    const { id_usuario, id_mascota, fecha, hora } = req.body;

    db.query(
        'INSERT INTO citas(id_usuario, id_mascota, fecha, hora) VALUES(?,?,?,?)',
        [id_usuario, id_mascota, fecha, hora],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al registrar la cita");
            } else {
                res.send(result);
            }
        }
    );
});

// Obtener todas las citas
app.get("/citasLista", (req, res) => {
    db.query('SELECT * FROM citas',
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al cargar las citas");
            } else {
                res.send(result);
            }
        }
    );
});

// Actualizar una cita
app.put("/updateCita", (req, res) => {
    const { id_usuario, id_mascota, fecha, hora, id } = req.body;

    db.query(
        'UPDATE citas SET id_usuario=?, id_mascota=?, fecha=?, hora=? WHERE id=?',
        [id_usuario, id_mascota, fecha, hora, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al actualizar la cita");
            } else {
                res.send(result);
            }
        }
    );
});

// Eliminar una cita
app.delete("/deleteCita/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        'DELETE FROM citas WHERE id=?', [id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al eliminar la cita");
            } else {
                res.send(result);
            }
        }
    );
});

// Obtener mascotas de un usuario
app.get("/mascotasByUsuario/:id_usuario", (req, res) => {
    const id_usuario = req.params.id_usuario;
    db.query('SELECT * FROM mascotas WHERE id_usuario=?', [id_usuario],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al cargar las mascotas del usuario");
            } else {
                res.send(result);
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});


