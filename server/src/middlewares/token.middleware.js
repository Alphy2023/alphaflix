 import jwt from "jsonwebtoken";
 import responseHandler from "../handlers/response.handler.js";
 import userModel from "../models/user.model.js";

 const tokenDecode = (req)=>{
    try{
        const authorization = req.headers["authorization"];
        if(authorization){
            const token = authorization.split(" ")[1];
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        return false;
    }
    catch{
        return false;
    }
 };

 const isAuth = async (req,res,next)=>{
    const tokenDecoded = tokenDecode(req);

    if(!tokenDecoded) return responseHandler.unauthorize(res);

    const user = await userModel.findById(tokenDecoded.data);

    if(!user) return responseHandler.unauthorize(res);

    req.user = user;

    next();
 };


 export default { isAuth, tokenDecode};
