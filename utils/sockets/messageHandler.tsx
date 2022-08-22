import {Message} from '../../types/types';
import executeQuery from '../db';



const MessageHandler =  (io : any, socket : any) => {
  const createdMessage = (msg : Message,convoID : number,userID : number) => {
    console.log(msg);
    
    executeQuery({
      sql: "INSERT INTO tblMessages (content,convoID,authorID) VALUES (?,?,?)",
      timeout: 10000,
      values: [msg.message,convoID.toString(),userID.toString()]
    });
    
    io.to(convoID.toString()).emit("newIncomingMessage", msg);
  };
  socket.on("createdMessage", createdMessage);
};
export default MessageHandler;