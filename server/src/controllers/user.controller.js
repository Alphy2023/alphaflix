import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import asyncHandler from "express-async-handler";
import generateToken from "../middlewares/token.middleware.js"

const signUp = asyncHandler (async(req,res)=>{
    try {
      const { username, displayName, password } = req.body;
      const checkUser = await userModel.findOne({ username });
      if (checkUser)
        return responseHandler.badRequest(res, "User already exists");
      const user = new userModel();
      user.displayName = displayName;
      user.username = username;
      // user.email = email;
      user.setPassword(password);
      await user.save();

      const token = jwt.sign({ data: user?.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      responseHandler.created(res,{
          token,
          ...user._doc,
          id:user.id
      });
    } catch {
        responseHandler.error(res);
    }
});

const signIn = asyncHandler (async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await userModel.findOne({username:username}).select("password displayName username id salt");
        console.log(user);

        if(!user) return responseHandler.badRequest(res, "User does not exist!");

        if(!user.validPassword(password)) return responseHandler.badRequest(res, "Invalid credentials!");
        
        const token = jwt.sign({ data: user?.id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        user.password = undefined; //
        user.salt = undefined;
        responseHandler.created(res, {
          token,
          ...user._doc,
          id: user.id,
        });
    } catch {
        responseHandler.error(res);
    }
});

const updatePassword = asyncHandler (async(req,res)=>{
    try {
        const {password,newPassword} = req.body;

        const user = await userModel.findById(req.user.id).select("password, id, salt");
        if(!user) return responseHandler.unauthorize(res);
        if(!user.validPassword(password)) return responseHandler.badRequest(res, "Invalid Current password");
        
        user.setPassword(newPassword);
        await user.save();
        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
});

const getInfo = asyncHandler (async(req,res)=>{
    try {
        const user = await userModel.findById(req.user.id);
        if(!user) return responseHandler.notFound(res);
        responseHandler.ok(res,user);
    } catch {
        responseHandler.error(res);
    }
});

export default {signIn,signUp,getInfo,updatePassword}