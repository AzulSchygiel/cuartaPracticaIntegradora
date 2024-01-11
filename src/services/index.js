import Usuarios from "../dao/UsuariosDao.js";
import Productos from "../dao/ProductosDao.js";
import Carrito from "../dao/CarritoDao.js";

import UsuariosRepository from "../repository/UsuariosRepository.js";
import ProductosRepository from "../repository/ProductosRepository.js";
import CarritoRepository from "../repository/CarritoRepository.js";

export const usuariosService = new UsuariosRepository(new Usuarios());
export const productosService = new ProductosRepository(new Productos());
export const carritoService = new CarritoRepository(new Carrito());