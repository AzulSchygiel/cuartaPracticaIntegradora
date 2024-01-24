import passport from "passport";
import LocalStrategy from "passport-local";
import { crearHash, invalidContraseña } from "../utils.js";
import { usuariosDao } from "../dao/index.js";

passport.use("registrarseLocalStrategy", new LocalStrategy(
    {
        passReqToCallback:true,
        usernameField:"email",
    },
    async(req,username,password,done)=>{
        const {first_name,email,age} = req.body;
        //console.log("req.file", req.file);
        try{
        const usuario = await usuariosDao.getUsuarioByEmail(username);
        if(usuario){
            return done(null,false);
        }
        const newUsuario = {
            first_name,
            age,
            email:username,
            password:crearHash(password),
            avatar:req.file.filename
        };
        console.log(newUsuario);
        const usuarioCreado = await usuariosDao.crearUsuario(newUsuario);
        return done(null,usuarioCreado);
    } catch(error){
        return done(error);
    }
    }
));

    passport.use("iniciarsesionLocalStrategy", new LocalStrategy(
        {
            usernameField: "email",
        },
        async (username, password, done)=>{
            try {
                const usuario = await usuariosDao.getUsuarioByEmail(username);
                if (!usuario){
                    return done(null, false);
                }
                if (!invalidContraseña(password, usuario)){
                    return done(null, false);
                }
                usuario.last_connection = new Date();
                await usuariosDao.updateUsuario(usuario._id, usuario);
                return done(null, usuario);
            } catch (error) {
                return done(error);
            }
        }
    ));
