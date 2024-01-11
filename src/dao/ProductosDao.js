import productosModel from "./models/Productos.js";

export default class Producto{
    
    get = (params) => {
        return productosModel.find(params)
    }
    getBy = (params) => {
        return productosModel.findOne(params)
    }
    save = (doc) => {
        return productosModel.create(doc);
    }
    update = (id,doc) => {
        return productosModel.findByIdAndUpdate(id,{$set:doc})
    }
}