import { Router } from 'express';
import usuariosController from "../controllers/usuariosController.js";
import uploader from "../utils/uploader.js";

const router = Router();

router.get("/", usuariosController.getAllUsuarios);
router.post("/", usuariosController.createUsuario);
router.post("/withimage", uploader.single("image"), usuariosController.createUsuarioWithImage);
router.put("/:uid", usuariosController.updateUsuario);
router.delete("/uid", usuariosController.deleteUsuario);

export default router;
