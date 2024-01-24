import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const crearHash = (contraseña) => {
    return bcrypt.hashSync(contraseña, bcrypt.genSaltSync());
};

export const invalidContraseña = (contraseña, usuario) => {
    return bcrypt.compareSync(contraseña, usuario.contraseña);
};

//MULTER
const checkValidFields = (usuario)=>{
    const {first_name, email, password} = usuario;
    if(!first_name || !email || !password){
        return false;
    } else {
        return true;
    }
};

const perfilMulterFiltro = (req,file,cb)=>{
    if(!checkValidFields(req.body)){
        cb(null, false);
    } else {
        cb(null, true);
    }
};

//MULTER (para guardar las imagenes de los usuarios)
const perfilStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/multer/usuarios/img"))
    },

    filename: function (req, file, cb) {
        cb(null, `${req.body.email}-perfil-${file.originalname}`)
    }
});

const uploadPerfil = multer({storage:perfilStorage, fileFilter:perfilMulterFiltro});

//MULTER (para guardar los documentos de los usuarios)
const documentosStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/multer/usuarios/documentos"))
    },

    filename: function (req, file, cb) {
        cb(null, `${req.usuario.email}-documentos-${file.originalname}`)
    }
});

const uploadDocumento = multer({storage:documentosStorage});

//MULTER (para guardar las imagenes de los productos)
const productosImgStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/multer/productos/img"))
    },

    filename: function (req, file, cb) {
        cb(null, `${req.body.code}-productos-${file.originalname}`)
    }
});

const uploadProductosImg = multer({storage:productosImgStorage});

export {uploadPerfil, uploadDocumento, uploadProductosImg};
