import express from "express";
import { CartRouter } from "./Routers/cartRouter.js";
import { ProductRouter } from "./Routers/productRouter.js";
import { MongoDBService } from "./service/MongoDBservice/MongoDBConnection.js";



const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const server = app.listen(PORT, () =>
  console.log(`Server listening on PORT ${PORT}`)
);

MongoDBService.init()

app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
