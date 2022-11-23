import { cartMongo } from './carrito/cartMongo.js'
import { productsMongo } from './productos/productsMongo.js'


const ProductDao =  new productsMongo() 
const CartDao =new cartMongo()
            

export {ProductDao,CartDao} 