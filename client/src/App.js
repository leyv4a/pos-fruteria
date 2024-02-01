import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState(0);
  const [categoria, setCategoria] = useState("");

  const [listaProductos, setProductos] = useState([]);

  const add = () => {
   axios.post("http://localhost:3001/productos",{
    producto: producto,
    cantidad: cantidad,
    precio: precio,
    categoria: categoria
   }).then(()=>{getProductos(); alert("Producto registrado con exito")});
  }

  const getProductos = () => {
    axios.get("http://localhost:3001/productos").then((res)=>{
      setProductos(res.data);
    });
  }

  return (
    <div className="App">
      <div className="container my-3 bg-success rounded"> 
        <div className='row '> 
        <div className='col-md-6 border-end '>
          <form className='p-5'>
            <input placeholder="Productos" className='form-control mb-3' onChange={(e)=>{setProducto(e.target.value)}} type='text'/>
            <input placeholder="Cantidad" className='form-control mb-3' onChange={(e)=>{setCantidad(e.target.value)}} type='text'></input>
            <input placeholder="Precio" className='form-control mb-3' onChange={(e)=>{setPrecio(e.target.value)}} type='text'></input>
            <input placeholder="Categoria" className='form-control mb-3' onChange={(e)=>{setCategoria(e.target.value)}}></input>
            <button className='btn btn-light text-success  px-5' onClick={add}>Aceptar</button>
          </form>
        </div>
        <div className='col-md-6 p-5'>
          <table class="table table-striped table-success">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
      <div className='Listar'>
        <button onClick={getProductos}>Listar</button>

        {
          listaProductos.map((val, key) => {
            return <div>{val.nombre}</div>
          })
        }
      </div>
    </div>
    
  );
}

export default App;
