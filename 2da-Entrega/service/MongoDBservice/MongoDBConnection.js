import mongoose from "mongoose";

const init = async () => {
    try {
        mongoose.connect("mongodb+srv://Mroccazzella:Mrocca99@cluster0.1komusn.mongodb.net/test",{
            dbName: "Ecommerce"
        })
        console.log('/...CONECTADO A LA BASE DE DATOS.../')
    } catch (error) {
        console.log(error)
    }
}

export const MongoDBService = {
    init,
}