import express from "express";
import { routerViews } from "./routes/routerViews.js";
import { routerProductos } from "./routes/routerProductos.js";

import handlebars from "express-handlebars";
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const server = app.listen(PORT, () =>
  console.log(`Server listening on PORT ${PORT}`)
);

server.on("error", (err) => console.log(`Error: ${err}`));
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);

app.set("view engine","hbs")
app.set("views","./views")



app.use("/", routerViews)
app.use("/api/productos", routerProductos);

