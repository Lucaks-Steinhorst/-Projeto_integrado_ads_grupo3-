import jwt from 'jsonwebtoken';
import {promisify} from "util";
import authConfig from "../config/auth.js";

export default async(req, res, next) => {
    
    const authHeader = req.headers.authorization
    if(!authHeader) {
        return res.status(401).json({
            error: true,
            message: "Token não encontrado"
        })
    }

    //Bearer <token>
    const [, token] = authHeader.split(" ")

    try {
        const decode = await promisify(jwt.verify)(token, authConfig.secret)
        req.userID = decode.id
        return next()
    } catch (error) {
        return res.status(401).json({
            error: true,
            message: "Token inválido"
        })
    }
}

