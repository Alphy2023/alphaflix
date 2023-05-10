import userModel from "../models/user.model.js";
import reviewModel from "../models/review.model.js";
import favouriteModel from "../models/favourite.model.js";
import responseHandler from "../handlers/response.handler.js";
import asyncHandler from "express-async-handler";
import tmdbApi from "../tmdb/tmdb.api.js";
import tokenMiddleware from "../middlewares/token.middleware.js"
// get lists
const getList = asyncHandler(async(req,res)=>{
    try {
        const {page} = req.query;
        const {mediaType,mediaCategory} = req.params;
        const data = await tmdbApi.mediaList({mediaType,mediaCategory,page});
        return responseHandler.ok(res,data);
    } catch{
        responseHandler.error(res);
    }
});
// get genres
const getGenres = asyncHandler(async(req,res)=>{
    try {
        const {mediaType}= req.params;
        const data = await tmdbApi.mediaGenres({mediaType});
        return responseHandler.ok(res,data);
    } catch{
        responseHandler.error(res);
    }
});
// search media
const search = asyncHandler(async(req,res)=>{
    try {
        const {mediaType}= req.params;
        const {query,page}= req.query;
        const data = await tmdbApi.mediaSearch({ query, page, mediaType:mediaType==='people'?'person':mediaType });
        return responseHandler.ok(res,data);
    } catch{
        responseHandler.error(res);
    }
});
// get media details
const getDetail = asyncHandler(async(req,res)=>{
    try {
        const {mediaType,mediaId}= req.params;
        const params = {mediaType,mediaId}
        const media = await tmdbApi.mediaDetail(params);
        media.credits = await  tmdbApi.mediaCredits(params);
        const videos = await tmdbApi.mediaVideos(params);
        media.videos = videos

        const recommend = await tmdbApi.mediaRecommend(params);
        media.recommend = recommend.results;
        media.images = await tmdbApi.mediaImages(params);

        const tokenDecoded = tokenMiddleware.tokenDecode(req);
        if(tokenDecoded){
            const user = await userModel.findById(tokenDecoded.data)

            if(user){
                const isFavourite = await favouriteModel.findOne({user:user.id,mediaId});
                media.isFavourite = isFavourite !==null;
            }
        }
        media.reviews = await reviewModel.findOne({mediaId}).populate("user").sort("-createdAt");
        return responseHandler.ok(res,media);
    } catch (e){
        console.log(e)
        responseHandler.error(res);
    }
});

export default {getList,getGenres,search,getDetail};