import { NextPage } from "next";
import Header from "../../components/Home/Header";
import Footer from "../../components/Footer/footer";
import styles from "./chat.module.scss";
import { withSessionSsr } from "../../lib/withSession";
import executeQuery from "../../utils/db";
import Image from "next/image";

interface Convos {
  convoID: number;
  starterID?: number;
  recieverID?: number;
  recipientID?: number;
  username: string;
}
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(context) {
    const { req } = context;
    if (req.session.user !== undefined) {
      const toConvos = (await executeQuery(
        `SELECT tblConvos.recieverID,tblConvos.convoID,tblUsers.username FROM tblConvos INNER JOIN tblUsers ON tblUsers.userID = tblConvos.recieverID WHERE (tblConvos.starterID = ${req.session.user.id});`
      )) as Convos[];
      const fromConvos = (await executeQuery(
        `SELECT tblConvos.starterID,tblConvos.convoID,tblUsers.username FROM tblConvos INNER JOIN tblUsers ON tblUsers.userID = tblConvos.starterID WHERE (tblConvos.recieverID = ${req.session.user.id});`
      )) as Convos[];
      const convos = toConvos.concat(fromConvos);
      const newConvos = convos.map((convo, i) => {
        if (convo.starterID) {
          convo.recipientID = convo.starterID;
        } else {
          convo.recipientID = convo.recieverID;
        }
        return {
          convoID: convo.convoID,
          recipientID: convo.recipientID,
          username: convo.username,
        };
      });
      return {
        props: {
          hasUser: true,
          userID: req.session.user.id,
          convos: newConvos as Convos[],
        },
      };
    }

    return {
      props: {
        hasUser: false,
        userID: 0,
        convos: [] as Convos[],
      },
    };
  }
);
interface Props {
  hasUser: boolean;
  userID: number;
  convos: Convos[];
}

const ChatIndex: NextPage<Props> = (props) => {
  const { hasUser, userID, convos } = props;
  return (
    <>
        <Header hasUser={hasUser} />
        {convos.map((convo, i) => {
          return (
            <div key={i} className={styles.chatBox}>
              <a href={`/chat/${convo.recipientID}`}>
                Chat with {convo.username}
              </a>
              <div className={styles.circleDiv}>
                <Image
                  alt="PFP"
                  src={"http://localhost:3001/avatars/" + convo.recipientID}
                  width={40}
                  height={40}
                  className={styles.circle}
                />
              </div>
            </div>
          );
        })}
        <Footer userID={userID} />
    </>
  );
};
export default ChatIndex;
