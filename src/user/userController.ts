import { RequestHandler } from "express";
import { User, Users } from "./userModel";
import userSchema from "./userValidation";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = process.env;

export const registerUser: RequestHandler = async(req, res, next) => {
  const body = req.body;
  const{error} = userSchema.validate(body);
  if (error){
    res.status(400).json({message: error.details[0].message});
    return;
  }
  const username = (req.body as { username: string }).username;
  const password = (req.body as { password: string }).password;
  const user = await Users.findOne({where: {username: username}});
  if(user === null){
    const hashPass = await bcrypt.hash(password, 10);
    const response = await Users.create({username: username, password:hashPass});
    res.status(200).json({message:"User successfully registered", requestState:1, password:response.password});
    return
  }
  res.status(400).json({message: "Username already exists", requestState:0})
  return;
}

export const verifyJwt: RequestHandler = (req, res, next)=>{
  const token = req.body.token;
  if(!token){
    return res.status(403).json("A token is required for authentication");
  }
  try{
    const decoded = jwt.verify(token, config.TOKEN_KEY)
    res.json({auth:true, message:"Successfully authenticated"});
  }catch(err){
    return res.status(400).json({auth:false, message: "Invalid Token"});
  }
}

export const verifyUser: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = userSchema.validate(body);
    if (error) {
      res.status(400).json({ message: error.details[0].message, requestState: 0});
      return;
    }
    const username = (req.body as { username: string }).username;
    const password = (req.body as { password: string }).password;
    const user = await Users.findOne({ where: { username: username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({message:"Successfully Logged In", token:token, requestState: 1});
      return
    }
    res.status(400).json({message:"Invalid Credentials", requestState:0});
  } catch (err) {
    console.log(err);
  }
};
