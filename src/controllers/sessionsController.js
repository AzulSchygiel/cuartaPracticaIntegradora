import Usuario from "../dao/UsuariosDao.js";
import { usuariosService } from "../services";

const iniciarsesion = async(req,res) => {
    const {email, password} = req.body;
    if(!email || !password) return res.status(400).send({status:"error", error:"Valores incompletos"});
    const usuario = await usuariosService.getUsuarioByEmail(email);
    if(!usuario) return res.status(404).send({status:"error", error:"El usuario no existe"});
    const isValidPassword = await passwordValidation(usuario, password);
    if(!isValidPassword) return res.status(400).send({status:"error", error:"Contraseña incorrecta"});
    const usuarioDto = UsuarioDTO.getUsuarioTokenFrom(usuario);
    const token= jwt.sign(usuarioDto, 'tokenSecretJWT', {expiresIn:"1h"});
    res.cookie('coderCookie',token,{maxAge:3000000}).send({status:"success", message:"Se inició sesión"})
}

const current = async(req,res) => {
    const cookie = req.cookies['coderCookie']
    const usuario = jwt.verify(cookie, 'tokenSecretJWT');
}
