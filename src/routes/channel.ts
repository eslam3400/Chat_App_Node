import express from "express";
import Channel from "../controllers/channel";

const router = express.Router();

router
  .route("/")
  .post(new Channel().createChannel)
  .get(new Channel().getChannels);

export default router;
