import { NextPage } from "next";
import BackHeader from "../../components/Home/backHeader";
import Footer from "../../components/Footer/footer";
import { withSessionSsr } from "../../utils/lib/withSession";
import { Message } from "../../types/types";
import Chat from "../../components/Chat/chat";
import executeQuery from "../../utils/db";
import { SocketContext, socket } from '../../context/socket';
import { useRouter } from "next/router";
import { ConvoDB,UserDB} from "../../types/types";
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(context) {
    const { req } = context;
    if (req.session.user !== undefined && context.params?.id !== undefined) {
      /*const convoID = (await executeQuery(
        `SELECT tblConvos.convoID FROM tblConvos WHERE (tblConvos.starterID = ${req.session.user.id} AND tblConvos.recieverID = ${context.params.id}) OR (tblConvos.starterID = ${context.params.id} AND tblConvos.recieverID = ${req.session.user.id})`
      )) as ConvoDB[];*/
      const convoID = await executeQuery({
        sql: "SELECT tblConvos.convoID FROM tblConvos WHERE (tblConvos.starterID = ? AND tblConvos.recieverID =?) OR (tblConvos.starterID = ? AND tblConvos.recieverID = ?)",
        timeout: 10000,
        values: [req.session.user.id.toString(),context.params.id.toString(),context.params.id.toString(),req.session.user.id.toString()]
      }) as {convoID: number}[];
      
      if (convoID.length > 0) {
        /*const results = (await executeQuery(
          `SELECT username from tblUsers where userID = ${req.session.user.id}`
        )) as any[];*/
        const results = await executeQuery({
          sql: "SELECT username from tblUsers where userID =?",
          timeout: 10000,
          values: [req.session.user.id.toString()]
        }) as UserDB[];

        const recipient = await executeQuery({
          sql: "SELECT displayName from tblUsers where userID =?",
          timeout: 10000,
          values: [context.params.id.toString()]
        }) as UserDB[];

        //const newConvo = await executeQuery(`INSERT INTO tblConvos (starterID, recieverID) VALUES (${req.session.user.id}, ${context.params.id})`) as any[];

        /*const messages = (await executeQuery(
          `SELECT tblMessages.*,tblUsers.username from tblMessages INNER JOIN tblUsers ON tblUsers.userID = tblMessages.authorID where convoID = ${convoID[0].convoID}`
        )) as any[];*/

        const messages = await executeQuery({
          sql: "SELECT tblMessages.*,tblUsers.username from tblMessages INNER JOIN tblUsers ON tblUsers.userID = tblMessages.authorID where convoID = ?",
          timeout: 10000,
          values: [convoID[0].convoID.toString()]
        }) as any[];
        //console.log(messages);
        return {
          props: {
            convoID: convoID[0].convoID,
            username: results[0].username,
            userID: req.session.user.id,
            messages: messages.map((result, i) => {
              return {
                author: result.username,
                message: result.content,
                authorID: result.authorID,
              };
            }),
            recipientID: parseInt(context.params.id as string),
            recipientName: recipient[0].displayName,
          },
        };
      } else if(req.session.user.id.toString() != context.params.id){
        const results = await executeQuery({
          sql: "SELECT username from tblUsers where userID =?",
          timeout: 10000,
          values: [req.session.user.id.toString()]
        }) as UserDB[];

        const recipient = await executeQuery({
          sql: "SELECT displayName from tblUsers where userID =?",
          timeout: 10000,
          values: [context.params.id.toString()]
        }) as UserDB[];

        await executeQuery({
          sql: "INSERT INTO tblConvos (starterID, recieverID) VALUES (?,?)",
          timeout: 10000,
          values: [req.session.user.id.toString(),context.params.id.toString()]
        })
        
        const newConvoID  = await executeQuery({
          sql: "SELECT tblConvos.convoID FROM tblConvos WHERE (tblConvos.starterID = ? AND tblConvos.recieverID =?) OR (tblConvos.starterID = ? AND tblConvos.recieverID = ?)",
          timeout: 10000,
          values: [req.session.user.id.toString(),context.params.id.toString(),context.params.id.toString(),req.session.user.id.toString()]
        }) as {convoID: number}[];

        const messages = await executeQuery({
          sql: "SELECT tblMessages.*,tblUsers.username from tblMessages INNER JOIN tblUsers ON tblUsers.userID = tblMessages.authorID where convoID = ?",
          timeout: 10000,
          values: [convoID[0].convoID.toString()]
        }) as any[];
        //console.log(messages);
        return {
          props: {
            convoID: newConvoID[0].convoID,
            username: results[0].username,
            userID: req.session.user.id,
            messages: messages.map((result, i) => {
              return {
                author: result.username,
                message: result.content,
                authorID: result.authorID,
              };
            }),
            recipientID: parseInt(context.params.id as string),
            recipientName: recipient[0].displayName,
          },
        };
      }
    }

    return {
      props: {
        username: "",
        userID: 0,
        messages: [],
        recipientID: 0,
        convoID: 0,
        recipientName: "",
      },
    };
  }
);
interface Props {
  username: string;
  userID: number;
  messages: Array<Message>;
  recipientID: number;
  convoID: number;
  recipientName: string;
}

const ChatPage: NextPage<Props> = (props) => {
  const {
    userID,
    messages,
    username,
    recipientID,
    recipientName,
    convoID,
  } = props;
  if(userID != recipientID){
  return (
    <>
    <SocketContext.Provider value={socket}>
      <BackHeader name={recipientName} />
      <Chat
        userID={userID}
        messages={messages}
        convoID={convoID}
        username={username}
        recipientID={recipientID}
        recipientName={recipientName}
      />
      <Footer userID={userID} />
      </SocketContext.Provider>
    </>
  );
  }else{
    const router = useRouter()
    router.back()
    return (
      <> <p>you cannot message yourself silly</p> </>
    )
  }
};
export default ChatPage;
