import dotenv from "dotenv";
dotenv.config();

export const config = {
    server : {
        env:process.env.NODE_ENVIRONMENT || "development"
    },
    mongo:{
        url:process.env.MONGO_URL
    },
    email:{
        ayudante:process.env.HELP_EMAIL,
        contraseña:process.env.HELP_EMAILPASSWORD,
        token:process.env.TOKEN_EMAIL
    }
};
