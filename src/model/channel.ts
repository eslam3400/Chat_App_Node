import { Schema, model } from "mongoose";

const ChannelModel = model(
  "Channel",
  new Schema({
    name: String,
    password: String,
    users: [String],
    createdAt: { type: Date, default: Date.now },
  })
);

export default ChannelModel;
