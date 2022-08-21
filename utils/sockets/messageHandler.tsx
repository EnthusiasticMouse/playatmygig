import {Message} from '../../types/types';
import executeQuery from '../db';



const MessageHandler =  (io : any, socket : any) => {
  const createdMessage = (msg : Message,convoID : number,userID : number) => {
    console.log(msg);
    executeQuery(`INSERT INTO tblMessages (content,convoID,authorID) VALUES ('${msg.message}',${convoID},${userID})`);
    io.to(convoID.toString()).emit("newIncomingMessage", msg);
  };
  socket.on("createdMessage", createdMessage);
};
export default MessageHandler;