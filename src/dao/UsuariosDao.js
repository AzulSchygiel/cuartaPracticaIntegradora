import usuariosModel from "./models/Usuarios.js";

export default class Usuario{
    
    get = (params) => {
        return usuariosModel.find(params)
    }
    getBy = (params) => {
        return usuariosModel.findOne(params)
    }
    create = (doc) => {
        return usuariosModel.create(doc);
    }
    update = (id,doc) => {
        return usuariosModel.findByIdAndUpdate(id,{$set:doc},{new:true})
    }
    delete = (id) => {
        return usuariosModel.findByIdAndDelete(id);
    }
}