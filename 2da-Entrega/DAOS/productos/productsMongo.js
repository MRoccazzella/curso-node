import { MongoDBContainer } from "../../containers/index.js";
import { productCollection,productSchema } from "../../Models/productModel/productModel.js";

export class productsMongo extends MongoDBContainer{
    constructor(){
        super({
            name: productCollection,
            schema: productSchema
        })
    }
}