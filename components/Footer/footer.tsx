import Link from 'next/link';
import { FC } from 'react';
import styles from './footer.module.scss'; // using the other scss cos it is the same I'm lazy
import { Icon } from '@iconify/react';
import Image from 'next/image';

interface Props {
  userID: number;
}
const footer: FC<Props> = ( props ) => {
  return (
    <>
    <br/><br/><br/>
      <ul className={styles.footer}>      
        <li> 
          <Link href="/venues">
          <Icon height={50} icon="bxs:search" />
          </Link>
        </li>
        <li>
          <Link href="/">
          <Icon height={50} icon="ant-design:home-filled" />
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <div className={styles.circleDiv}>
              <Image src={"http://localhost:3001/avatars/" + props.userID} width={40} height={40} className={styles.circle}/>
            </div>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default footer;