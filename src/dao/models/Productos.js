import mongoose from 'mongoose';

const collection = 'Productos';

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:Number,
    image:String
})

const productosModel = mongoose.model(collection,schema);

export default productosModel;