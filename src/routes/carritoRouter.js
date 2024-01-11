import { Router} from 'express';
import carritoController from '../controllers/carritoController.js';

const router = Router();

router.get('/',carritoController.getAllCarrito);
router.get('/cid',carritoController.getCarrito);
router.post('/:uid/:pid',carritoController.createCarrito);

export default router;