const jwt = require("jsonwebtoken");
import { RequestHandler } from "express";
const config = process.env

const verifyToken: RequestHandler = (req, res, next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token){
        return res.status(403).send("A token is required for authentication");
    }
    try{
        const decoded = jwt.verify(token, config.TOKEN_KEY);
    }catch(err){
        return res.status(400).send("Invalid Token");
    }
    return next();
}

module.exports = verifyToken;
