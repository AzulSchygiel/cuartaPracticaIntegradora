import { Router } from 'express';
import productosController from '../controllers/productosController.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/',productosController.getAllProductos);
router.post('/',productosController.createProducto);
router.post('/withimage',uploader.single('image'), productosController.createProductoWithImage);
router.put('/:pid',productosController.updateProducto);
router.delete('/:pid',productosController.deleteProducto);

export default router;