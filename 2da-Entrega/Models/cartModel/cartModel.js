import { Schema } from "mongoose";
//import { productModel } from "../index.js";

const cartCollection = "cart";

const cartSchema = new Schema(
  {
    timestamp: { type: String, required: true },
    productos: [{type: Schema.Types.ObjectId, ref: 'products'}],

  },
  {
    virtuals: true,
  }
);

cartSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response._id;
    return response;
  },
});

export const cartModel = { cartCollection, cartSchema };