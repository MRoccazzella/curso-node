import express from "express";
import { getAll, save, getById } from "./CRUD/funciones.js";
import { baseDeDatosMariaDB } from "./db/mariaDB/index.js";
import { routerProductos } from "./Routers/routerProductos.js";



const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () =>
  console.log(`Server listening on PORT ${PORT}`)
);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/productos',routerProductos)

baseDeDatosMariaDB.schema.createTableIfNotExists('productos', (table) => {
        table.increments('id')
        table.string('titulo')
        table.integer('precio')
        table.string('thumbnail')
    })
    .then(res => console.log({res}))
    .catch(e=>console.log(e.sqlMessage))



