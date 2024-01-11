import carritoModel from "./models/Carrito.js";

export default class Carrito {

    get = (params) =>{
        return carritoModel.find(params);
    }

    getBy = (params) =>{
        return carritoModel.findOne(params);
    }

    save = (doc) =>{
        return carritoModel.create(doc);
    }

    update = (id,doc) =>{
        return carritoModel.findByIdAndUpdate(id,{$set:doc})
    }
    
    delete = (id) =>{
        return carritoModel.findByIdAndDelete(id);
    }
}