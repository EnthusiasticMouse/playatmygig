import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import styles from "../Home/header.module.scss"; // using the other scss cos it is the same I'm lazy

const backHeader: FC<{name: string }> = ({ name }) => {
  const router = useRouter()
  return (
    <>
      <div id={styles.backbtn}>
        <a onClick={() => router.back()}> back </a>
      </div>
      <ul className={styles.navbar}>
        <li id={styles.name}>
          <a> {name} </a>
        </li>
      </ul>
    </>
  );
};

export default backHeader;
