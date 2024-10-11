const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '34.45.234.180',
    user: 'root',
    password: 'labv2802',
    database: 'users',
    port: 3306
});

/* Conexion correcta local
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'react_login',
    port: 3306
});*/

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos', err);
        return;
    }
    console.log('Conectado a la base en MySQL');
});

// Ruta para el login
app.post('/login', (req, res) => {
    console.log('Solicitud POST recibida en /login');
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos', err);
            res.status(500).send('Error en la búsqueda de la base de datos');
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            if (password === user.password) { // Comparar directamente las contraseñas
                const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
                res.json({ token, role: user.role });
            } else {
                res.status(401).send('Credenciales incorrectas');
            }
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    });
});

// Ruta para registrar usuarios
app.post('/register', (req, res) => {
    const { username, password, name, lastname, role } = req.body;
    const query = 'INSERT INTO users (username, password, name, lastname, role) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [username, password, name, lastname, role], (err, results) => {
        if (err) {
            console.error('Error insertando usuario en la base de datos', err);
            res.status(500).send('Error registrando usuario');
            return;
        }
        res.status(200).send('Usuario registrado exitosamente');
    });
});

// Ruta para obtener todos los usuarios
app.get('/users', (req, res) => {
    console.log('Peticion de busqueda recibida en /users');
    const query = 'SELECT id, username, name, lastname, role FROM users';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos', err);
            res.status(500).send('Error en la búsqueda de usuarios');
            return;
        }
        res.json(results);
    });
});

//ruta para eliminar usuarios
app.delete('/users/:id',(req, res)=>{
    const userID = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [userID], (err, results)=>{
        if(err){
            console.error('Error elimnando usuario', err);
            res.status(500).send('Error eliminando usuario');
            return;
        }
        res.status(200).send('USuario eliminado exitosamente');
    });
});

/* Consola log para saber puerto local
app.listen(3000, () => {
    console.log('Server running on port 3000');
}); */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});