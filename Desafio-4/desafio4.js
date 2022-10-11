const { promises: fs } = require("fs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
  console.log(`Server listening on PORT ${PORT}`)
);

server.on("error", (err) => console.log(`Error: ${err}`));

app.use(express.json());

const routerProductos = require("./routes/routerProductos.js");

app.use("/api/productos", routerProductos);

