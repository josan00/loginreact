const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'react_login',
    port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos', err);
        return;
    }
    console.log('Conectado a la base en MySQL');
});

app.post('/login', (req, res) => {
    console.log('Solicitud POST recibida en /login');
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos', err);
            res.status(500).send('Error en la búsqueda de la base de datos');
            return;
        }
        if (results.length > 0) {
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
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

app.post('/register', async (req, res) => {
    const { username, password, nombre, apellido } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, password, nombre, apellido) VALUES (?, ?, ?, ?)';
        db.query(query, [username, hashedPassword, nombre, apellido], (err, results) => {
            if (err) {
                console.error('Error insertando usuario en la base de datos', err);
                res.status(500).send('Error registrando usuario');
                return;
            }
            res.status(200).send('Usuario registrado exitosamente');
        });
    } catch (err) {
        console.error('Error encriptando la contraseña', err);
        res.status(500).send('Error registrando usuario');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
