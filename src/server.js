import express from "express";
import { __dirname } from "./utils.js";
import path from "path";
import {engine} from "express-handlebars";
import {Server} from "socket.io";
import { ProductosService } from "./services/ProductosService.js";
import { connectDB } from "./config/connectionDB.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
import { config } from "./config/config.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import { viewsRouter } from "./routes/viewsRoute.js";
import { productosRouter } from "./routes/productosRoute.js";
import { carritoRouter } from "./routes/carritoRoute.js";
import { sessionsRouter } from "./routes/sessionsRoute.js";
import { usuariosRouter } from "./routes/usuariosRoute.js";
import { connect } from "http2";

//~~~~~~~~~~~~INSTALACIÓN~~~~~~~~~~~~~~//
// npm init -y
// npm i express
// npm i express-session connect-mongo express-handlebars mongoose
// npm i multer
// npm i supertest
// npm i jsonwebtoken
// npm i bcrypt
// npm i passport passport-local
// npm i dotenv
// npm i passport-github2


const port = 8080;
const app = express();

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const httpServer = app.listen(port,()=>console.log(`Servidor ejecutandose en el puerto ${port}`));

const io = new Server(httpServer);

connectDB();

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));

app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongo.url
    }),
    secret:"coderSecret",
    resave:true,
    saveUninitialized:true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//RUTAS/ROUTES
app.use(viewsRouter);
app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritoRouter);
app.use("/api/sesiones", sessionsRouter);
app.use("/api/usuarios", usuariosRouter);
app.use(errorHandler);

io.on("connection", async(socket)=>{
    console.log("Usuario conectado");
    const productos = await ProductosService.getProductos();
    socket.emit("productosArray", productos);
});
