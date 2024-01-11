import { carritoService, productosService, usuariosService } from "../services/index.js"

const getAllCarrito = async(req,res)=>{
    const resultado = await carritoService.getAll();
    res.send({status:"success",payload:resultado})
}

const getCarrito = async(req,res)=>{
    const carritoId = req.params.cid;
    const compra = await carritoService.getBy({_id:carritoId})
    if(!compra) return res.status(404).send({status:"error",error:"Compra no procesada"})
    res.send({status:"success",payload:adoption})
}

const createCarrito = async(req,res)=>{
    const {uid,pid} = req.params;
    const usuario = await usuariosService.getUsuarioById(uid);
    if(!usuario) return res.status(404).send({status:"error", error:"Usuario Not found"});
    const producto = await productosService.getBy({_id:pid});
    if(!producto) return res.status(404).send({status:"error",error:"Producto not found"});
    if(producto.carrito) return res.status(400).send({status:"error",error:"El producto está en el carrito"});
    usuario.productos.push(producto._id);
    await usuariosService.update(usuario._id,{productos:usuario.productos})
    await productosService.update(producto._id,{carrito:true,usuario:usuario._id})
    await carritoService.create({usuario:usuario._id,producto:producto._id})
    res.send({status:"success",message:"Compra realizada"})
}

export default {
    createCarrito,
    getAllCarrito,
    getCarrito
}