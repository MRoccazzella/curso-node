import express from "express";
import dayjs from 'dayjs';
import { Server as HttpServer} from 'http';
import { Server as IOServer } from 'socket.io';
import { getAll, save, getById, deleteById } from './Funciones/funciones.js'

const app = express();
const PORT = 8080;
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

httpServer.listen(PORT, () =>
  console.log(`Server listening on PORT ${PORT}`)
);

io.on('connection', socket => {
  traerProductos(socket)
  enviarTodosLosMensajes(socket)

  socket.on('new-product', newProduct => {
    save(newProduct)
    const productos = getAll('productos.json')
    io.sockets.emit('productos', productos)
  })
  socket.on("new message", nuevoMensaje => {
    guardarMensaje(nuevoMensaje)
  })

} )

const traerProductos = async (socket) => {
  const productos = await getAll('productos.json')
  socket.emit('productos', productos)
}
const guardarMensaje = async (message) =>{
  const date = new Date()
  const dateFormated = dayjs(date).format('DD/MM/YYYY hh:mm:ss')
  const newMessage = { ...message, createdAt: `${dateFormated} hs` }
  await save(newMessage,'mensajes.json')
  const allMessage = await getAll('mensajes.json')
  io.sockets.emit("all message", allMessage)
}

const enviarTodosLosMensajes = async (socket) => {
  const allMessage = await getAll('mensajes.json')
  socket.emit("all message", allMessage)
  
}