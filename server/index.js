const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "122889Ccm",
    database: "veterinaria",
    port: 3305,
});

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
                res.send("Usuario registrado con éxito!!!");
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});
