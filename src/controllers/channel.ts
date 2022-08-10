import { Request, Response } from "express";
import IChannel from "../interfaces/channel";
import ChannelModel from "../model/channel";

export default class Channel implements IChannel {
  async getChannels(req: Request, res: Response): Promise<Response> {
    try {
      const channels = await ChannelModel.find().exec();
      return res.status(200).json(channels);
    } catch (e) {
      return res.status(400).json({ msg: "something wrong happened!" });
    }
  }

  async createChannel(req: Request, res: Response): Promise<Response> {
    try {
      const channel = new ChannelModel(req.body);
      await channel.save();
      return res.status(200).json({ msg: "channel created successfully!" });
    } catch (e) {
      return res.status(400).json({ msg: "something wrong happened!" });
    }
  }
}
