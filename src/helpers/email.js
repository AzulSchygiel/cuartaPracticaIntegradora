import {config} from "../config/config.js";
import jwt from "jsonwebtoken";

export const generateEmailToken = (email,expireTime) => {
    const token = jwt.sign({email},config.email.token,{expiresIn:expireTime});
    return token;
};
