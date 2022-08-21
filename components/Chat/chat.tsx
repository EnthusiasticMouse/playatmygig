import { useState, useEffect, useContext } from "react";
import { SocketContext } from '../../context/socket';
import { NextPage } from "next";
import styles from './chat.module.scss';

type Message = {
  author: string;
  message: string;
  recipientID: number;
  authorID: number;
};
interface Props {
  messages: Array<Message>;
  username: string;
  recipientID: number;
  recipientName: string;
  userID: number;
  convoID: number;
}
const Chat: NextPage<Props> = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    socketInitializer();
    setMessages(props.messages);
  }, []);
  const socket = useContext(SocketContext);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch(`/api/socket/${props.convoID}`);
    socket.on("newIncomingMessage", (msg: Message) => {
      if(msg.author === props.username) return;
      setMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, message: msg.message, recipientID: msg.recipientID, authorID: msg.authorID },
      ]);

    });
  };
  const sendMessage = async () => {
    socket.emit("createdMessage", { author: props.username, message, recipientID: props.recipientID }, props.convoID, props.userID);
    setMessages((currentMsg) => [
      ...currentMsg,
      { author: props.username, message, recipientID: props.recipientID, convoID: props.convoID, authorID: props.userID },
    ]);
    //console.log(messages);
    setMessage("");
  };
  const handleKeypress = (e: { key: string; }) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      if (message) {
        sendMessage();
      }
    }
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.messageDiv}>
          {messages.map((msg, i) => {
            return (
              <div
                key={i}
                className={msg.author === props.username ? styles.message : styles.messageOther}
              >
                {msg.message}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.textBox}>
        <input
          type="text"
          placeholder="New message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={handleKeypress}
        />
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            Send
          </button>
      </div>
    </>
  );
}
export default Chat;