import { NextPage } from "next";
import BackHeader from "../../components/Home/backHeader";
import Footer from "../../components/Footer/footer";
import { withSessionSsr } from "../../utils/lib/withSession";
import { Message } from "../../types/types";
import Chat from "../../components/Chat/chat";
import executeQuery from "../../utils/db";
import { SocketContext, socket } from '../../context/socket';
import { useRouter } from "next/router";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(context) {
    const { req } = context;
    if (req.session.user !== undefined && context.params !== undefined) {
      const convoID = (await executeQuery(
        `SELECT tblConvos.convoID FROM tblConvos WHERE (tblConvos.starterID = ${req.session.user.id} AND tblConvos.recieverID = ${context.params.id}) OR (tblConvos.starterID = ${context.params.id} AND tblConvos.recieverID = ${req.session.user.id})`
      )) as any[];
      if (convoID.length > 0) {
        const results = (await executeQuery(
          `SELECT username from tblUsers where userID = ${req.session.user.id}`
        )) as any[];
        const recipient = (await executeQuery(
          `SELECT displayName from tblUsers where userID = ${context.params.id}`
        )) as any[];
        //const newConvo = await executeQuery(`INSERT INTO tblConvos (starterID, recieverID) VALUES (${req.session.user.id}, ${context.params.id})`) as any[];
        const messages = (await executeQuery(
          `SELECT tblMessages.*,tblUsers.username from tblMessages INNER JOIN tblUsers ON tblUsers.userID = tblMessages.authorID where convoID = ${convoID[0].convoID}`
        )) as any[];
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
        const results = (await executeQuery(
          `SELECT username from tblUsers where userID = ${req.session.user.id}`
        )) as any[];
        const recipient = (await executeQuery(
          `SELECT username from tblUsers where userID = ${context.params.id}`
        )) as any[];
        await executeQuery(
          `INSERT INTO tblConvos (starterID, recieverID) VALUES (${req.session.user.id}, ${context.params.id})`
        );
        const newConvoID = (await executeQuery(
          `SELECT tblConvos.convoID FROM tblConvos WHERE (tblConvos.starterID = ${req.session.user.id} AND tblConvos.recieverID = ${context.params.id}) OR (tblConvos.starterID = ${context.params.id} AND tblConvos.recieverID = ${req.session.user.id})`
        )) as any[];
        const messages = (await executeQuery(
          `SELECT tblMessages.*,tblUsers.username from tblMessages INNER JOIN tblUsers ON tblUsers.userID = tblMessages.authorID where convoID = ${newConvoID[0].convoID}`
        )) as any[];
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
