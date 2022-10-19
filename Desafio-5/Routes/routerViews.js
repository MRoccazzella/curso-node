import { Router } from 'express'
const routerViews = Router();
import fs from "fs";
const filePath = "productos.json";
async function getAll() {
  try {
    const contenido = await fs.promises.readFile(filePath, "utf8");
    const elementos = JSON.parse(contenido);
    return elementos;
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.promises.writeFile(filePath, JSON.stringify([], null, 3));

      return [];
    }
    throw new Error(`${error.message}`);
  }
}
routerViews.get('/',  (req, res) => {
        res.render("form");
    })
routerViews.get('/productos', (req,res) =>{
    getAll().then( (data) => {
        res.render('tabla-productos', {productos: data} )
        
    })

})
export { routerViews };