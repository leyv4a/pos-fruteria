const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin2511',
    database: 'fruteria_pos',
    insecureAuth: true
});

app.post('/productos', (req, res) => {
    const producto = req.body.producto;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    const categoria = req.body.categoria;
   

    db.query("INSERT INTO stock(nombre, precio, categoria, stock) VALUES (?, ?,?,?)",[producto, precio,categoria,cantidad],
    (err,result) => err ? console.log(err) : res.send("Producto agregado correctamente")   
    );
});

app.get('/productos', (req, res) => {
    db.query("SELECT nombre, precio, categoria, stock FROM stock",
    (err,result) => err ? console.log(err) : res.send(result)   
    );
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});