import ProductosDTO from "../dto/ProductosDTO.js";
import { productosService } from "../services/index.js";
import __dirname from "../utils/index.js";

const getAllProductos = async(req,res)=>{
    const productos = await productosService.getAll();
    res.send({status:"success",payload:productos})
}

const createProducto = async(req,res)=> {
    const {title,type,price,stock} = req.body;
    if(!title||!type||!price||!stock) return res.status(400).send({status:"error",error:"Incomplete values"})
    const producto = ProductosDTO.getPetInputFrom({title,type,price,stock});
    const resultado = await productosService.create(producto);
    res.send({status:"success",payload:resultado})
}

const updateProducto = async(req,res) =>{
    const productoUpdateBody = req.body;
    const productoId = req.params.pid;
    const resultado = await productosService.update(productoId,productoUpdateBody);
    res.send({status:"success",message:"Producto updated"})
}

const deleteProducto = async(req,res)=> {
    const productoId = req.params.pid;
    const resultado = await productosService.delete(productoId);
    res.send({status:"success",message:"Producto deleted"});
}

const createProductoWithImage = async(req,res) =>{
    const file = req.file;
    const {title,type,price,stock} = req.body;
    if(!title||!type||!price||!stock) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const producto = ProductosDTO.getProductoInputFrom({
        title,
        type,
        price,
        stock,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    console.log(producto);
    const resultado = await productosService.create(producto);
    res.send({status:"success",payload:resultado})
}
export default {
    getAllProductos,
    createProducto,
    updateProducto,
    deleteProducto,
    createProductoWithImage
}