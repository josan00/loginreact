const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: ' sql5.freemysqlhosting.net',
  user: 'sql5736216',
  password: 'ZlQwgrEvrv',
  database: 'sql5736216',
  port: '3306'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.get('/test-connection', (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      res.status(500).send('Error querying the database');
      return;
    }
    res.send('Database connection successful');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
