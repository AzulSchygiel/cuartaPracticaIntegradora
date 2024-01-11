import { Router } from 'express';
import sessionsController from "../controllers/sessionsController.js";

const router = Router();

router.post("/registro", sessionsController.registro);
router.post("/iniciarsesion", sessionsController.iniciarsesion);
router.get("/current", sessionsController.current);
router.get("/unprotectedIniciarsesion", sessionsController.unprotectedIniciarsesion);
router.get("/unprotectedCurrent", sessionsController.unprotectedCurrent);

export default router;