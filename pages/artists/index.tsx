import { NextPage } from 'next';
import Header from '../../components/ExploreHeader/header';
import Footer from '../../components/Footer/footer';
import Artist from '../../components/Artist/artist';
import { UserDB} from '../../types/types';
import { withSessionSsr } from "../../lib/withSession";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
  const res = await fetch('http://localhost:3000/api/fetch/artists')
  const data: UserDB[] = await res.json()
  if(req.session.user !== undefined){
    
    return {
      props: {
        myProps: data,
        userID : req.session.user.id,
      },
    }

  }else{
    return {
      props: {
        myProps: data,
        userID : 0,
      },
    }
  }
});
interface Props{
  myProps: UserDB[];
  userID: number;
}

const Artists: NextPage<Props> = (data) => {
  const artists = data.myProps;
  return(
    <>
      <Header/>
      <Artist artists={artists}/>
      <Footer userID={data.userID}/>
    </>
  )
}
export default Artists;