import mongoose from 'mongoose';

const collection = 'Usuarios';

const schema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        default:'usuario'
    },
    image:String
})

const usuarioModel = mongoose.model(collection,schema);

export default usuarioModel;