import { Router } from "express"
import { getAll, save, getById, deleteById } from "../CRUD/funciones.js";
import { baseDeDatosMariaDB } from "../db/mariaDB/index.js";


const routerProductos = Router();

routerProductos.get("/", async(req, res) => {
  const products = await getAll(baseDeDatosMariaDB)
    res.send(products);
});
routerProductos.get("/:id", async (req, res) => {
  const id =  req.params.id;
  const objeto = await getById(baseDeDatosMariaDB,id)
  objeto === null ? res.send("Error: No pudo encontrarse el producto") : res.send(objeto)   

});
routerProductos.post("/", async (req, res) => {
    const producto = req.body;
    await save(baseDeDatosMariaDB,producto)
    res.status(200).send("Producto agregado")
});
routerProductos.put("/:id", async (req, res) => {
    const {titulo,precio,thumbnail} = await req.body
    console.log(titulo,precio,thumbnail)
    const id = req.params.id;
    await baseDeDatosMariaDB
    .from('productos')
    .where('id', id)
    .update({titulo:titulo,precio:precio,thumbnail:thumbnail})
    const elementoEditado = await getById(baseDeDatosMariaDB,id)
    if(elementoEditado === null){
      res.send('Error: No pudo encontrarse el producto')
    }else{
      res.send(elementoEditado);
    }
});
routerProductos.delete("/:id", async (req,res) => {
    const id = req.params.id;
    const elemento = await getById(baseDeDatosMariaDB,id)
    await deleteById(baseDeDatosMariaDB,id)
    if(elemento === null){
      res.send('Error: No pudo encontrarse el producto')
    }else{
      res.send(elemento);
    }
})
export { routerProductos };
