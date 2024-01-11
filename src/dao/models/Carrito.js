import mongoose from "mongoose";


const collection = "Carrito";

const schema = new mongoose.Schema({
    usuario:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Usuario'
    },
    productos:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Productos'
    }
})

const carritoModel = mongoose.model(collection,schema);

export default carritoModel;