import UsuarioDTO from "../dto/Usuario.dto.js";
import { usuariosService } from "../services/index.js";
import __dirname from "../utils/index.js";

const getAllUsuarios = async(req,res) => {
    const usuarios = await usuariosService.getAll();
    res.send({status:"success", payload:usuarios})
}

const createUsuario = async(req,res) => {
    const { name, email, password } = req.body;
    if(!name||!email||!password) return res.status(400).send({status:"error", error:"Valores incompletos"})
    const usuario = UsuarioDTO.getUsuarioInputFrom({name, email, password});
    const resultado = await usuariosService.create(usuario);
    res.send({status:"success", payload:resultado})
}

const updateUsuario = async(req,res) => {
    const usuarioUpdateBody = req.body;
    const usuarioId = req.params.uid;
    const resultado = await usuariosService.update(usuarioId,usuarioUpdateBody);
    res.send({status:"success",message:"Usuario actualizado"})
}

const deleteUsuario = async(req,res) => {
    const usuarioId = req.params.uid;
    const resultado = await usuariosService.delete(usuarioId);
    res.send({status:"success", message:"Usuario eliminado... para siempre"})
}

const createUsuarioWithImage = async(req,res) => {
const file = req.file;
const {name, email, password} = req.body;
if(!name||!email||!password) return res.status(400).send({status:"error", error:"Valores Incompletos"})
console.log(file);
const usuario = UsuarioDTO.getUsuarioInputFrom({
    name,
    email,
    password,
    image:`${__dirname}/../public/img/${file.filename}`
});
};

console.log(usuario);
const resultado =await usuariosService.create(usuario);
res.send({status:"success", payload:resultado})

export default {
    getAllUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    createUsuarioWithImage
}