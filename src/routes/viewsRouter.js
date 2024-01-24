import { Router } from "express";
import { ProductosService } from "../services/productosService.js";
import { logger } from "../helpers/logger.js";

const router = Router();

router.get("/", async(req,res)=>{
    const {limit=3,page=1} = req.query;
    /*const query = {
        category:"videojuegos",
        stock:20
    };*/
    const options = {
        limit,
        page,
        sort:{price:1},
        lean:true
    };
    const resultado = await ProductosService.getProductosPaginate(query, options);
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProductos = {
        status:"success",
        payload:resultado.docs,
        totalPages:resultado.totalPages,
        prevLink:resultado.hasPrevPage ? `${baseUrl.replace(`page=${resultado.page}`,`page=${resultado.prevPage}`)}` : null,
        nextLink:resultado.hasNextPage ? baseUrl.includes("page") ? baseUrl.replace(`page=${resultado.page}`, `page=${resultado.nextPage}`) : baseUrl.concat(`?page=${resultado.nextPage}`) : null
    }
    console.log(dataProductos);
    res.render("home", dataProductos);
});

router.get("/registrarse", (req,res)=>{
    res.render("registro");
});

router.get("/iniciarsesion",(req,res)=>{
    res.render("iniciodesesion");
});

router.get("/realtimeproductos",(req,res)=>{
    res.render("productos");
});

router.get("/perfil",(req,res)=>{
    console.log(req.usuario);
    res.render("perfil", {usuario:req.usuario});
});

router.get("/testLogger", (req,res)=>{
    logger.error("log error");
    logger.advertencia("log advertencia");
    logger.debbug("log debbug");
    res.send("prueba logger");
});
