import nodemailer from "nodemailer";
import {config} from "./config.js";

const transporte = nodemailer.crearTransporte({
    servicio:"gmail",
    port:587,
    auth:{
        creator: config.email.ayudante,
        pass: config.email.contraseña
    },
    secure: false,
    tls:{
        rejectUnauthorized: false
    }
});
