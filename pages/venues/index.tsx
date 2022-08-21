import { NextPage } from 'next';
import Header from '../../components/ExploreHeader/header';
import Footer from '../../components/Footer/footer';
import Venue from '../../components/Venue/venue';
import { UserDB } from '../../types/types';
import { withSessionSsr } from "../../utils/lib/withSession";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
  const res = await fetch('http://localhost:3000/api/fetch/venues')
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

const Venues: NextPage<Props> = (data) => {
  const venues = data.myProps;
  return(
    <>
      <Header/>
      <Venue venues={venues}/>
      <Footer userID={data.userID}/>
    </>
  )
}
export default Venues;