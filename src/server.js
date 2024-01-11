import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import session from "express-session";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import path, { extname } from "path";
import { connectDB } from "./config/connectionDB.js";
import passport from "passport";
import { initPassport } from "./config/passport.config.js";
import { generateToken } from "./utils.js";
import { config } from "./config/config.js";

import sessionsRouter from "./routes/sessionsRoute.js";
import productosRouter from "./routes/productosRoute.js";
import carritoRouter from "./routes/carritoRoute.js";
import usuariosRouter from "./routes/usuariosRouter.js"


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

const app = express();
const PUERTO = process.env.PUERTO||8080;
const connection = mongoose.connect(`URL de mongo`);
console.log("Base de datos conectada")

//~~~~~~~~~~~~~MIDDLEWARES~~~~~~~~~~~~~~~//
app.use(express.json());
app.use(cookieParser());

//~~~~~~~~~~~~~~~RUTAS~~~~~~~~~~~~~~~~//
app.use("/api/usuario", usuariosRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/carrito", carritoRouter);
app.use("/api/productos", productosRouter);

app.listen(PUERTO, () => console.log(`Server Funcionando en puerto ${port}`))

//~~~~~~~~~~~~~HANDLEBARS~~~~~~~~~~~~~~~//
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"));


//~~~~~~~~~~~~~TOKEN~~~~~~~~~~~~~~~//
app.get("/login", (req, res) => {
    const user = req.body; //Se pasa el usuario de la Base de Datos
    const token = generateToken(user); //Genera el Token
    res.json({ status: "success", accessToken: token }); //Se responde al usuario
});

//~~~~~~~~MOTOR DE PLANTILLAS~~~~~~~~~~//
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "/views"));

/*~~~~~~~~~~~~~SESSIONS~~~~~~~~~~~~~~~
app.use(
    session({
        store: MongoStore.create({
            ttl: 4000,
            mongoUrl: config.mongo.url,
        }),
        secret: config.server.secretSession,
        resave: true,
        saveUninitialized: true,
    })
);
*/
/*~~~~~~~~PASSPORT~~~~~~~~~~
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
*/

export {app};