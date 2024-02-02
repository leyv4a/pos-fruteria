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
    const nombre = req.body.nombre;
    const stock = req.body.stock;
    const precio = req.body.precio;
    const categoria = req.body.categoria;
   

    db.query("INSERT INTO stock(nombre, precio, categoria, stock) VALUES (?, ?,?,?)",[nombre, precio,categoria,stock],
    (err,result) => err ? console.log(err) : res.send("Producto agregado correctamente")   
    );
});

app.get('/productos', (req, res) => {
    db.query("SELECT id, nombre, precio, categoria, stock FROM stock",
    (err,result) => err ? console.log(err) : res.send(result)   
    );
});

app.put('/productos', (req, res) =>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    const stock = req.body.stock;

    db.query("UPDATE stock SET nombre =?, precio =?, categoria =?, stock =? WHERE (id =?)",[nombre, precio,categoria,stock,id],
    (err,result) => err? console.log(err) : res.send(result)   
    );
})

app.delete('/productos/:id', (req, res) =>{
    const id = req.params.id;
    db.query('DELETE FROM stock WHERE id = ?',[id], (err,result) => err? console.log(err): res.send(result));
})

app.listen(3001, () => {
    console.log('Server running on port 3001');
});