import { Router } from "express";
import passport from "passport";
import { SessionsController } from "../controllers/sessionsController.js";
import { uploadPerfil } from "../utils.js";

const router = Router();

router.post("/registrarse", uploadPerfil.single("avatar") , passport.authenticate("registroLocalStrategy", {
    failureRedirect:"/api/sessions/fail-registro"
}), SessionsController.redirectIniciarsesion);

router.get("/fail-registro", SessionsController.failRegistro);

router.post("/iniciarsesion", passport.authenticate("iniciosesionLocalStrategy", {
    failureRedirect:"/api/sessions/fail-iniciodesesion"
}), SessionsController.redirectPerfil);

router.get("/fail-iniciodesesion", SessionsController.failIniciodesesion);

router.post("/forgot-contraseña", SessionsController.forgotContraseña);

router.post("/reset-contraseña", SessionsController.resetContraseña);

router.get("/cerrarsesion", SessionsController.cerrarsesion);

export {router as sessionsRouter};
