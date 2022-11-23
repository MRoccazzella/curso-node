import { ProductDao } from "../DAOS/index.js";
import { DATE_UTILS } from "../Utils/dateUtils.js";


const getAll = async (req, res) => {
    try {
      const product = await ProductDao.getAll();
  
      if (!product) {
        return res.send({error: "error"});
      }
  
      res.send(product);
    } catch (error) {
      res.send({ error: "Internal server error" });
    }
  };
  
  const getById = async (req, res) => {
    const { id } = req.params;
  
    const product = await ProductDao.getById(id);
  
    res.send(product);
  };
  
  const createProduct = async (req, res) => {
    try {
      const { title, description, code, thumbnail, price, stock } = req.body;
  
      // con el validador que creamos en el archivo joi validator, podemos invocar al método validateAsync y pasarle las propiedades que creemos seran nuestro producto, y si están bien, nos devolvera el objeto que guardamos en product
      // si no, saltará al catch
      const product = {
        title,
        description,
        code,
        thumbnail,
        price,
        stock,
        timestamp: DATE_UTILS.getTimestamp(),
      };
  
      const createdProduct = await ProductDao.save(product);
  
      res.send(createdProduct);
    } catch (error) {
      // no seria recomendable guardar logs de errores de input de usuario, que genera joi
      // normalmente guardariamos errores propios e internos del servidor
      console.log(error)
      res.send(error);
    }
  };
  
  const deleteById = async (req, res) => {
    try {
      const { id } = req.params;
  
      await ProductDao.deleteById(id);
  
      res.send({ success: true });
    } catch (error) {
      console.error(error);
      res.send({ error: "Ocurrio un error" });
    }
  };
  
  export const ProductController = {
    getAll,
    getById,
    createProduct,
    deleteById,
  };