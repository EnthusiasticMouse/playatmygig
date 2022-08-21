import { NextPage } from 'next';
import Footer from '../components/Footer/footer';
import Header from '../components/Home/Header'
import Notice from '../components/Notice/notice';
import { withSessionSsr } from "../utils/lib/withSession";
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session.user !== undefined) {
      return {
        props:{
          hasUser: true,
          userID: req.session.user.id,
        }
      };
    }

    return {
      props: {
        hasUser: false,
        userID: 0,
      },
    };
  },
);
interface Props {
  hasUser: boolean;
  userID: number;
}

const IndexPage: NextPage<Props> = ( props ) => {
  const { hasUser,userID } = props;
  return(
    <>
    <Header hasUser={hasUser}/>
      <Notice title={"Login Information"}>
        <div>
        <p>Username: <span>dave</span> </p>
        <p>Password: <span>password</span> </p>
        </div>
        <div>
        <p>Username: <span>bob</span> </p>
        <p>Username: <span>password</span> </p>
        </div>
      </Notice>
      <Notice title={"Signup Information"}>
        <p> Signup is currently disabled</p>
      </Notice>
      <Footer userID={userID}/>
    </>
  )
}
export default IndexPage;