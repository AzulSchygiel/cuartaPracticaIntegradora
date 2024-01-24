import { UsuariosService } from "../services/usuariosService.js";

export class UsuariosController{
    static modificarRole = async(req,res) => {
        try {
            const usuarioID = req.params.uid;
            const usuario = await UsuariosService.getUsuarioById(usuarioID);
            if(usuario.status !== "completo"){
                return res.json({status:"error", message:"ERROR (completar todos los documentos necesarios)"})
            }
            if(usuario.role === "premium"){
                usuario.role = "user";
            } else if(usuario.role === "user"){
                usuario.role = "premium";
            } else {
                res.json({status:"error", message:"ERROR (no se puede cambiar el rol del usuario)"});
            }
            await UsuariosService.updateUsuario(usuario._id, usuario);
            res.json({status:"success", message:"Rol de usuario modificado correctamente"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static uploadUsuarioDocumentos = async(req,res)=>{
        try {
            const usuarioID = req.params.uid;
            const usuario = await UsuariosService.getUsuarioById(usuarioID);
            const identificacion = req.files['identificacion']?.[0] || null;
            const domicilio = req.files['domicilio']?.[0] || null;
            const cuenta = req.files['cuenta']?.[0] || null;
            const documentos = [];
            if(identificacion){
                documentos.push({name:"identificacion", reference: identificacion.filename});
            }
            if(domicilio){
                documentos.push({name:"domicilio", reference: domicilio.filename});
            }
            if(cuenta){
                documentos.push({name:"cuenta", reference: cuenta.filename});
            }
            usuario.documentos = documentos;
            if(documentos.length<3){
                usuario.status = "incompleto";
            } else {
                usuario.status = "completo";
            }
            await UsuariosService.updateUsuario(usuario._id, usuario);
            res.json({status:"success", message:"Documentos actualizados correctamente"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
}
