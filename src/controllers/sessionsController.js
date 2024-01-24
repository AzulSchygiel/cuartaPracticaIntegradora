port {generarEmailToken, sendChangeContraseñadeEmail, verifyEmailToken} from "../helpers/email.js";
import { UsuariosService } from "../services/usuariosService.js";
import { crearHash, invalidContraseña } from "../utils.js";

export class SessionesController{
    static redirectIniciarsesion = (req,res)=>{
        res.redirect("/iniciarsesion");
    };

    static failRegistro = (req,res)=>{
        res.render("registrarse", {error:"ERROR (no se pudo registrar al usuario, inténtelo más tarde...)"});
    };

    static redirectPerfil = (req,res)=>{
        res.render("perfilView", {usuario:req.usuario});
    };

    static failIniciodesesion = (req,res)=>{
        res.render("iniciarsesion", {error:"ERROR (no se logró iniciar sesion al usuario, inténtelo más tarde..."});
    };

    static forgotContraseña = async(req,res)=>{
        const {email} = req.body;
        console.log(email);
        try {
            const usuario =await UsuariosService.getUsuarioByEmail(email);
            const emailToken = generarEmailToken(email, 10 * 30)
            await sendChangeContraseñadeEmail(req,email,emailToken);
            res.send(`Se envió un enlace a su correo <a href="/"> Volver a la página de inicio de sesión </a>`);
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static resetContraseña = async(req,res)=>{
        try {
            const token = req.query.token;
            const {newContraseña} = req.body;
            const validEmail = verifyEmailToken(token);
            if (!validEmail) {
                return res.send(`El enlace ya no es válido, genera uno nuevo haciendo click aqui <a href="/forgot-contraseña">enlace</a>`);
            }
            const usuario = await UsuariosService.getUsuarioByEmail(validEmail);
            console.log("usuario", usuario);
            if(!usuario){
                return res.send(`ERROR (no es valido)`);
            }
            if(invalidContraseña(newContraseña,usuario)){
                return res.render("resetPassView", {error:"ERROR (contraseña incorrecta)",token});
            }
            const usuarioData = {
                ...usuario,
                contraseña:crearHash(newContraseña)
            };
            await UsuariosService.updateUsuario(usuario._id, usuarioData);
            res.render("iniciarsesion", {message:"Contraseña actualizada correctamente"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static cerrarsesion = async(req,res)=>{
        console.log(req.usuario);
        const usuario = {...req.usuario};
        usuario.last_connection = new Date();
        await UsuariosService.updateUsuario(usuario._id, usuario);
        req.session.destroy((error)=>{
            res.send("Fin de la sesión");
        });
    };
