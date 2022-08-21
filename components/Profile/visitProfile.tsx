import { FC, useState } from 'react';
import styles from './profile.module.scss'; // using the other scss cos it is the same I'm lazy
import {UserDB} from '../../types/types';
import Image from "next/image";
import Link from 'next/link';
interface user extends UserDB {
  theirID: number;
}
interface Props {
  props: user;
}
const visitProfile: FC<Props> = ( {props} ) => {
    return (
      <>
        <div className={styles.profileBackground}>
          <Image layout="responsive" width={1000} quality={100} height={200} alt="background image" src={`http://localhost:3001/images/${props.theirID}/0`} />
        </div>
        <div id={styles.profilePic}><img alt="profile picture"src={`http://localhost:3001/avatars/${props.theirID}`} /> </div>
        <h2 id={styles.title}> {props.displayName}</h2>
        <div className={styles.loginBox}>
          <form>
              <h2> User Info</h2>
              <label htmlFor="username" >Username: </label>
              <br/>
            <input type="text" value={props.username} readOnly/>
             <br/>
            <label htmlFor='displayName'>Display Name: </label>
            <br/>
            <input type="text" name="displayName" readOnly value={props.displayName} />
             <br/>
        </form>
        <Link href={`http://localhost:3000/chat/${props.theirID}`}>Message Me</Link>
        </div>
      </>
    )
}

export default visitProfile;