import responseHandler from "../handlers/response.handler.js";
import asyncHandler from "express-async-handler";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = asyncHandler(async(req,res)=>{
    try {
        const {personId} = req.params;
        const person = await tmdbApi.personDetail({personId});
        responseHandler.ok(res,person);
    } catch {
        responseHandler.error(res);
    }
});
const personMedias = asyncHandler(async(req,res)=>{
    try {
        const {personId} = req.params;
        const medias = await tmdbApi.personMedias({personId});
        responseHandler.ok(res,medias);
    } catch {
        responseHandler.error(res);
    }
});

export default {personDetail, personMedias};
