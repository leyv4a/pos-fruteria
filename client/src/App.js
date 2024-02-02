import './App.css';
import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");

  const [editar, setEditarProductos] = useState(false);
  const [listaProductos, setProductos] = useState([]);

  const add = () => {
   Axios.post("http://localhost:3001/productos",{
    nombre:nombre,
    stock:stock,
    precio:precio,
    categoria:categoria
   }).then(()=>{getProductos(); alert("Producto registrado con exito")}); limpiarCampos();
  }

  const actualizar = () => {
    Axios.put("http://localhost:3001/productos", {
      id: id,
      nombre: nombre,
      stock: stock,
      precio: precio,
      categoria: categoria
    }).then(()=>{getProductos(); alert("Producto actualizado con exito")}); limpiarCampos();
  }


  const getProductos = (val) => {
    Axios.get("http://localhost:3001/productos").then((res)=>{
      setProductos(res.data);
    });
  }

  useEffect(() => {
    getProductos();
  }, []);

  const editarProductos = (val) => {
    setEditarProductos(true);
    setNombre(val.nombre);
    setStock(val.stock);
    setPrecio(val.precio);
    setCategoria(val.categoria);
    setId(val.id);
  }

  const eliminarProducto = (val) =>{
    Axios.delete(`http://localhost:3001/productos/${val.id}`).then((res)=>{
      getProductos(); alert("Producto eliminado con exito");
    })
  }

  const limpiarCampos = () =>{
    setNombre("");
    setStock("");
    setPrecio("");
    setCategoria("");
    setId("");
  }

  return (
    <div className="App">
      <div className="container my-3 bg-success rounded"> 
        <div className='row '> 
        <div className='col-md-6 border-end '>
          <form className='p-5'>
            <input placeholder="Productos" className='form-control mb-3' value={nombre} onChange={(e)=>{setNombre(e.target.value)}} type='text'/>
            <input placeholder="Cantidad" className='form-control mb-3' value={stock} onChange={(e)=>{setStock(e.target.value)}} type='text'></input>
            <input placeholder="Precio" className='form-control mb-3' value={precio} onChange={(e)=>{setPrecio(e.target.value)}} type='text'></input>
            <input placeholder="Categoria" className='form-control mb-3' value={categoria} onChange={(e)=>{setCategoria(e.target.value)}}></input>
            <div>
              {
                editar? 
                        <div>
                          <button type='button' className='btn btn-info text-white me-3 px-5' onClick={actualizar}>Actualizar</button>  
                          <button type='button' className='btn btn-danger text-white px-5' onClick={()=>{setEditarProductos(false); limpiarCampos();}}>Cancelar</button>
                        </div> 
                     : 
                        <button type='button' className='btn btn-light text-success  px-5' onClick={add}>Agregar</button>
              }
            </div>
          </form>
        </div>
        <div className='col-md-6 p-5'>
          <table className="table table-striped table-success">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {
          listaProductos.map((val, key) => {
            return <tr key={val.id}>
                      <td>{val.nombre}</td>
                      <td>{val.stock}</td>
                      <td>{val.precio}</td>
                      <td>{val.categoria}</td>
                      <td>
                          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                            <button type="button" onClick={() => editarProductos(val)} className="btn btn-warning">Actualizar</button>
                            <button type="button" className="btn btn-danger" onClick={()=>{eliminarProducto(val)}}>Eliminar</button>
                          </div>
                      </td>
                   </tr>
          })
        }
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
