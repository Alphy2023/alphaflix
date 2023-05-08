
import express from "express";
import mediaRouter from "./media.route.js";
import personRouter from "./person.route.js";
import reviewsRouter from "./reviews.route.js";
import userRouter from "./user.route.js";

const router = express.Router();
// user routes
router.use("/user",userRouter);
// media routes
router.use("/:mediaType",mediaRouter);
router.use("/person",personRouter);
router.use("reviews",reviewsRouter);

export default router;