import { useRouter } from 'next/router'
import VisitProfile from '../../components/Profile/visitProfile'
import { withSessionSsr } from "../../utils/lib/withSession";
import  executeQuery  from "../../utils/db";
import {UserDB} from '../../types/types';
import {FC} from 'react';
import VisitHeader from '../../components/Home/backHeader';
import Footer from '../../components/Footer/footer';
interface user extends UserDB{
  theirID: number;
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req,query }) {
    const {artistID} = query;
    if (artistID !== undefined && req.session.user !== undefined) {
      const userID = parseInt(artistID as string)
      const response = await executeQuery(`SELECT displayName,userID,description,username,isVenue,published from tblUsers WHERE isVenue=0 AND userID=${userID}`) as UserDB[];
      if(response.length > 0 && response[0].published == 1){
        return {
          props:{
            theirID: userID,
            userID: req.session.user.id,
            username: response[0].username,
            isVenue: response[0].isVenue,
            displayName: response[0].displayName,
            description:response[0].description,
          }
        };
      }
    }

    return {
      props: {
        theirID: 0,
        isVenue: 0,
        userID: 0,
        username: "",
        displayName: "",
        description:"",
      },
    };
  },
);


const artistPage : FC<user>= ( props) => {
  const router = useRouter()
  const { artistID } = router.query
  return (
    <>
    <VisitHeader name="artists"/>
      <VisitProfile props={props}/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
    <Footer userID={props.userID}/>
    </>
  )
}

export default artistPage;