import { Request, Response } from "express";

export default interface IChannel {
  getChannels(req: Request, res: Response): void;
  createChannel(req: Request, res: Response): Promise<Response>;
}
