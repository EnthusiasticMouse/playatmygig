import { useRouter } from 'next/router'
import { withSessionSsr } from "../../utils/lib/withSession";
import  executeQuery  from "../../utils/db";
import {UserDB} from '../../types/types';
import {FC} from 'react';
import VisitProfile from '../../components/Profile/visitProfile';
import VisitHeader from '../../components/Home/backHeader';
import Footer from '../../components/Footer/footer';

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req,query }) {
    const {venueID} = query;
    if (venueID !== undefined && req.session.user !== undefined) {
      const userID = parseInt(venueID as string)
      
    const response = await executeQuery({
        sql: "SELECT displayName,userID,description,payment,dates,username,isVenue,published from tblUsers WHERE isVenue=1 AND userID=?;",
        timeout: 10000,
        values: [userID.toString()]
      }) as UserDB[];
      if(response.length  > 0  && response[0].published == 1){
        return {
          props:{
            theirID: userID,
            isVenue: response[0].isVenue,
            userID: req.session.user.id,
            username: response[0].username,
            displayName: response[0].displayName,
            payment: response[0].payment,
            description:response[0].description,
            dates:response[0].dates,
          }
        };
      }
    }

    return {
      props: {
        userID: 0,
        username: "",
        isVenue: 0,
        displayName: "",
        payment: 0,
        description:"",
        dates: "",
        theirID: 0,
      }
    };
  },
);

interface user extends UserDB {
  theirID: number;
}
const venuePage : FC<user>= ( props,theirID) => {
  const router = useRouter()
  const { venueID } = router.query

  return (
    <>
    <VisitHeader name="venues"/>
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

export default venuePage;