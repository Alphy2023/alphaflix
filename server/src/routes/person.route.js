import express from "express";
import personController from "../controllers/person.controller.js";

const personRouter = express.Router({ mergeParams: true });

personRouter.get("/:personId/medias", personController.personMedias);

personRouter.get("/:personId", personController.personDetail);


export default personRouter;
