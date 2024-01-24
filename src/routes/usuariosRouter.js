import { Router } from "express";
import { checkRole } from "../middlewares/authentication.js";
import { UsuariosController } from "../controllers/usuariosController.js";
import { uploadDocumentos } from "../utils.js";

const router = Router();

router.put("/premium/:uid", checkRole(["admin"]), UsuariosController.modificarRole);
router.post("/:uid/documentos", isAuth, uploadDocumentos.fields([
    {name:"identificacion", maxCount:1},
    {name:"domicilio", maxCount:1},
    {name:"cuenta", maxCount:1},
]), UsuariosController.uploadUsuarioDocumentos);

export { router as usuariosRouter };
