import express from "express";
import reviewsController from "../controllers/review.controller.js";
import { body } from "express-validator";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const reviewsRouter = express.Router({ mergeParams: true });

reviewsRouter.get(
  "/",
  tokenMiddleware.isAuth,
  reviewsController.getUserReviews
);
reviewsRouter.post(
  "/",
  tokenMiddleware.isAuth,
  body("mediaId")
    .exists()
    .withMessage("Media Id is Required!")
    .isLength({ min: 1 })
    .withMessage("Media id cannot be empty!"),
  body("content")
    .exists()
    .withMessage("Content is Required!")
    .isLength({ min: 1 })
    .withMessage("Content cannot be empty!"),
  body("mediaType")
    .exists()
    .withMessage("Media type is Required!")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("Media type is Invalid!"),
  body("mediaTitle").exists().withMessage("Media Title is Required!"),
  body("mediaPoster").exists().withMessage("Media poster is Required!"),
  requestHandler.validate,
  reviewsController.create
);

reviewsRouter.delete(
  "/:reviewId",
  tokenMiddleware.isAuth,
  reviewsController.remove
);

export default reviewsRouter;
