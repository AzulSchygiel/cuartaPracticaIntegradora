import { ProductosManagerFiles } from "./files/ProductosManagerFiles.js";
import { CarritoManagerFiles } from "./files/CarritoManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";
import { ProductosManagerMongo } from "./mongo/productosManagerMongo.js";
import { CarritoManagerMongo } from "./mongo/carritoManagerMongo.js";
import { UsuariosManagerMongo } from "./mongo/usuariosManagerMongo.js";

export const productosDao = new ProductosManagerMongo();
export const carritoDao = new CarritoManagerMongo();
