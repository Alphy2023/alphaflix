import express from "express";
import personController from "../controllers/person.controller.js";

const personRouter = express.Router({mergeParams: true });

personRouter.get("/:personId", personController.personDetail);
personRouter.get("/:personId/medias", personController.personMedias);



export default personRouter;
