import favouriteModel from "../models/favourite.model.js";
import responseHandler from "../handlers/response.handler.js";
import asyncHandler from "express-async-handler";

const addFavourite = asyncHandler(async(req,res)=>{
    try {
        const isFavourite = await favouriteModel.findOne({
            user:req.user.id,
            mediaId:req.body.mediaId
        });
        if(isFavourite) return responseHandler.ok(res,isFavourite);

        const favourite = new favouriteModel({
            ...req.body,
            user:req.user.id
        });
        await favourite.save();
        responseHandler.created(res,favourite);

    } catch {
        responseHandler.error(res)
    }
});
const removeFavourite = asyncHandler(async(req,res)=>{
    try {
        const {favouritId} = req.params;
        const favourite = await favModel.findOne({
            user:req.user.id,
            _id:favouritId
        });
        if(!favouritId) return responseHandler.notFound(res);
        await favourite.remove();
        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
});
const getUserFavourites = asyncHandler(async(req,res)=>{
    try {
        const favourite = await favouriteModel.find({user:req.user.id}).sort("-createdAt");
        responseHandler.ok(res,favourite);
    } catch {
        responseHandler.error(res)
    }
});
export default { addFavourite, removeFavourite, getUserFavourites };
