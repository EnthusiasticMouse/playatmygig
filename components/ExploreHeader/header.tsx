import Link from 'next/link';
import { FC } from 'react';
import styles from './header.module.scss'; // using the other scss cos it is the same I'm lazy

const header: FC = () => {
  return (
    <>
      <ul className={styles.navbar}>      
        <li> 
          <Link href="/artists">
          <a> Artists </a>
          </Link>
        </li>
        <li>
          <Link href="/venues">
          <a>  Venues </a>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default header;