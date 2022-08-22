import { NextApiRequest } from "next";
import { Server } from "socket.io";
import messageHandler from "../../../utils/sockets/messageHandler";
import executeQuery from "../../../utils/db";

import { withSessionRoute } from "../../../utils/lib/withSession";

export default withSessionRoute(socketHandler);

async function socketHandler(req: NextApiRequest, res: any) {
  // It means that socket server was already initialised
  const id = req.query.id;
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;
  const onConnection = async (socket: any) => {
    if(id !== undefined){
    socket.join(id.toString());
    }
    messageHandler(io, socket);
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}