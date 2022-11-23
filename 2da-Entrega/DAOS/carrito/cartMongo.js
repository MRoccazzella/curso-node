import { MongoDBContainer } from "../../containers/index.js";
import { cartModel } from "../../Models/cartModel/cartModel.js"

export class cartMongo extends MongoDBContainer{
    constructor(){
        super({
            name: cartModel.cartCollection,
            schema: cartModel.cartSchema
        })
    }
    async getById(id) {
        const response = await this.model.findById(id).populate("products");
    
        return response;
      }
};
