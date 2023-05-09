import express from "express";
import {body} from "express-validator";
import favouriteController from "../controllers/favourite.controller.js";
import userController from "../controllers/user.controller.js";
import userModel from "../models/user.model.js";
import requestHandler from "../handlers/request.handler.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const userRouter = express.Router({ mergeParams: true });

userRouter.post(
    "/signup",
    body("username")
    .exists().withMessage("Username is Required!")
    .isLength({min:8}).withMessage("Username should be a minimum of 8 characters!").custom(async value=>{
        const user = await userModel.findOne({username: value})
        if(user) return Promise.reject("Username already taken!")
    }),
    body("password")
    .exists().withMessage("Password is Required!")
    .isLength({min:8}).withMessage("Password should be a minimum of 8 characters!"),
    body("confirmPassword")
    .exists().withMessage("Please confirm your password!")
    .isLength({min:8}).withMessage("Confirm password should be a minimum of 8 characters!").custom(
        (value,{req})=>{
            if(value !== req.body.password) throw new Error("Passwords do not match!")
            return true;
        }),
    body("displayName")
    .exists().withMessage("Your Name is Required!"),
    requestHandler.validate,
    userController.signUp
)
// login
userRouter.post(
    "/signin",
    body("username")
    .exists().withMessage("Username is Required!")
    .isLength({min:8}).withMessage("Username should be a minimum of 8 characters!"),
    body("password")
    .exists().withMessage("Password is Required!")
    .isLength({min:8}).withMessage("Password should be a minimum of 8 characters!"),
    requestHandler.validate,
    userController.signIn
)
userRouter.put(
    "/update-password",
    tokenMiddleware.isAuth,
    body("password")
    .exists().withMessage("Current Password is Required!")
    .isLength({min:8}).withMessage("Password should be a minimum of 8 characters!"),
    body("newPassword")
    .exists().withMessage("New Password is Required!")
    .isLength({min:8}).withMessage("New password should be a minimum of 8 characters!"),
    body("confirmNewPassword")
    .exists().withMessage("Please Confirm your new password")
    .isLength({min:8}).withMessage("Confirm New password should be a minimum of 8 characters!").custom(
        (value,{req})=>{
            if(value !== req.body.newPassword) throw new Error("Passwords do not match!")
            return true;
        }),
     requestHandler.validate,
     userController.updatePassword
);
// user info
userRouter.get(
    "/info",
    tokenMiddleware.isAuth,
    userController.getInfo
)
// user favorites
userRouter.get(
  "/favourites",
  tokenMiddleware.isAuth,
  favouriteController.getUserFavourites
);
userRouter.post(
    "/favourites",
    tokenMiddleware.isAuth,
    body("mediaType")
    .exists().withMessage("Media type is Required!").
    custom(type=>["movie","tv"].includes(type)).withMessage("Mediatype is Invalid!"),
    body("mediaId")
    .exists().withMessage("Media Id is Required!")
    .isLength({min:1}).withMessage("Media id cannot be empty!"),
    body("mediaTitle")
    .exists().withMessage("Media Title is Required!"),
    body("mediaPoster")
    .exists().withMessage("Media poster is Required!"),
    body("mediaRate")
    .exists().withMessage("Media rate is Required!"),
    requestHandler.validate,
    favouriteController.addFavourite
);
userRouter.delete(
  "/favourite/:favouriteId",
  tokenMiddleware.isAuth,
  favouriteController.removeFavourite
);
export default userRouter;
