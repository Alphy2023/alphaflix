import express from "express";
import mediaController from "../controllers/media.controller.js";

const mediaRouter = express.Router({mergeParams: true});

mediaRouter.get("/search",mediaController.search);

mediaRouter.get("/genres",mediaController.getGenres);

mediaRouter.get("/detail/:mediaId",mediaController.getDetail);

mediaRouter.get("/:mediaCategory",mediaController.getList);

export default mediaRouter
