import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productosCollection = "productos";

const productosSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "El campo es obligatorio"]
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
        enum:["Ropa", "Videojuegos", "Tecnología"]
    },
    stock:{
        type:Number,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
    }
})
