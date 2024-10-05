const express = require ('express');
const mysql = require ('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user:'admin',
    password:'admin',
    database:'react_login',
    port: 3306
})

db.connect(err=> {
    if(err) {
        console.error('Error connectado a la base de datos', err);
        return;
    }
    console.log('Conectado a la base en MySQL');
});

app.post('/login', (req, res) => {
    console.log('Solicitud recibida en /login');
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta a la base de datos', err);
            res.status(500).send('Error en la búsqueda de la base de datos');
            return;
        }
        if (results.length > 0) {
            res.send({ message: 'Login correcto' });
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    });
});


app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});