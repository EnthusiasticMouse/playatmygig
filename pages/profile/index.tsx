import { NextPage } from 'next';
import Footer from '../../components/Footer/footer';
import Header from '../../components/Home/Header'
import { withSessionSsr } from "../../lib/withSession";
import executeQuery from '../../utils/db';
import { useState } from 'react';
import { UserDB } from '../../types/types';
import Image from 'next/image';
import styles from './profile.module.scss';
import Link from 'next/link';

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    if (req.session.user !== undefined) {
      const response  = await executeQuery(`SELECT * from tblUsers where userID = ${req.session.user.id};`) as UserDB[];
      if(response.length > 0){
        return {
          props:{
            userID: req.session.user.id,
            username: response[0].username,
            displayName: response[0].displayName,
            payment: response[0].payment,
            published: response[0].published,
            preview: response[0].preview,
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
        displayName: "",
        preview: "",
        payment: 0,
        published: false,
        description:"",
        dates:"",
      },
    };
  },
);

const IndexPage: NextPage<UserDB> = ( props ) => {
  const userID = props.userID;
  if(userID != 0){
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [description, setDescription] = useState('');
    const [preview, setPreview] = useState('');
    const [payment, setPayment] = useState('');
    const [dates, setDates] = useState('');
  return(
    <>
      <Header hasUser={userID != 0}/>
      
      <div className={styles.profileBackground}>
          <Image layout="responsive" width={1000} quality={100} height={200} alt="background image" src={`http://localhost:3001/images/${props.userID}/0`} />
        </div>
        <div id={styles.profilePic}><img alt="profile picture"src={`http://localhost:3001/avatars/${props.userID}`} /> </div>
        <h2 id={styles.title}> {props.displayName}</h2>
        <div className={styles.loginBox}>
          <form method='POST' action={'/api/update/user'}>
              <h2> User Info</h2>
              <label htmlFor="username" >Username: </label>
              <br/>
            <input type="text" placeholder={props.username} name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
             <br/>
            <label htmlFor='displayName'>Display Name: </label>
            <br/>
            <input type="text" name="displayName" placeholder={props.displayName} value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
             <br/>
             <h2> Profile Page</h2>
             <label htmlFor="description" >Profile Description: </label>   
            <input type="text" placeholder={props.description} id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <br/>
            <label htmlFor="preview" >Profile Preview: </label>   
            <input type="text" placeholder={props.preview} id="preview" name="preview" value={preview} onChange={(e) => setPreview(e.target.value)} />
            <br/>
            {props.isVenue ?
              <>
              <label htmlFor='payment'>Event Payment: </label>
              <input type="text" placeholder={props.payment?.toString() || "none"} id="payment" name="payment" value={payment} onChange={(e) => setPayment(e.target.value)}/>
              <br/>
             </>
            : null}
            <label htmlFor='dates'>Event Date: </label>
            <br/>
            <input type="text" placeholder={props.dates}id="dates" name="dates" value={dates} onChange={(e) => setDates(e.target.value)}/>
             <br/>
            <input type="submit" value="Update" />
             
          </form>
          <form  encType='multipart/form-data' method='post' action='http://localhost:3001/update/avatar/'>
          <h2> Profile Images</h2>
          <label >Profile Picture: </label>
           <br/>
          <input name="image" type="file"/>
           <br/>
          <input type="submit"/>
        </form>
        <form  encType='multipart/form-data' method='post' action='http://localhost:3001/update/image/'>
          <label >Display Image: </label>
           <br/>
          <input name="image" type="file"/>
           <br/>
          <input type="submit"/>
        </form> 
          <div className={styles.links}>
            <Link href={"http://localhost:3000/api/update/toggletype"}><a>{props.isVenue? <>Change To Artist</> : <> Change To Venue</>}</a></Link> 
            <Link href={"http://localhost:3000/api/update/togglepublished"}><a>{props.published? <>Unpublish</> : <> Publish</>}</a></Link> 
          </div>
        </div>
      <Footer userID={userID}/>
    </>
  )
  }else{
    return(
      <p> not logged in </p>
    )
  }
}
export default IndexPage;