import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import channelRouter from "./routes/channel";
import { Server } from "socket.io";
import Socket from "./controllers/socket";

dotenv.config();
const app: express.Express = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server);

mongoose
  .connect(String(process.env.CLIENT_LOCAL_DB))
  .then((r) => console.log("connected to db"))
  .catch((r) => console.log(r));

// io.on("connection",socket=>{
//   socket.broadcast.to("")
// })

new Socket(io);

app.use(cors({ origin: [String(process.env.CLIENT_LOCAL_SERVER), String(process.env.CLIENT_LIVE_SERVER)] }));
app.use(express.json());

app.use("/channels", channelRouter);

server.listen(port, () =>
  console.log(`server is running on http://localhost:${port}`)
);
