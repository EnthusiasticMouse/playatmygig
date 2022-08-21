import Image from 'next/image';
import { FC } from 'react';
import styles from './venue.module.scss'; // using the other scss cos it is the same I'm lazy
import Link from 'next/link';
import {  UserDB} from '../../types/types';
interface Props {
  data: UserDB;
}
const venueBox: FC<Props> = ( {data} ) => {
  return (
    <>
    <div className={styles.venueBox}>
      <Image loading="lazy" src={"http://localhost:3001/images/"+ data.userID + "/0"} alt="venue" width={320} height={179}/>
      <div className={styles.topDiv}>
        <h2>
          <span className={styles.circleDiv}>
            <Image loading="lazy" src={"http://localhost:3001/avatars/"+ data.userID} width={28} height={28}className={styles.circle}/>
          </span><Link target="_blank" href={`http://localhost:3000/venues/${data.userID}`}>
          {data.displayName}
          </Link>
        </h2>
        <p className={styles.middleText}>{data.preview}</p>
      </div>
        <div className={styles.bottomDiv}>
          <p>{data.dates}</p> <p> £{data.payment} </p>
        </div>
    </div>
    </>
  )
}

export default venueBox;