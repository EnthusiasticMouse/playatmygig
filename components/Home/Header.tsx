import { FC, useEffect } from "react";
import styles from "./header.module.scss"; // using the other scss cos it is the same I'm lazy
import Login from "../Logins/Login/login";
import Signup from "../Logins/Signup/signup";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  hasUser: boolean;
}
const Header: FC<Props> = (props) => {
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  const { query } = useRouter();

  useEffect(() => {
    if (query.error) {
      setLogin(true);
    }
    if (query.success) {
      setLogin(true);
    }
  }, [query.error, query.success]);

  const toggleLogin = () => {
    setLogin((login) => !login);
    setSignup(() => false);
  };

  const toggleSignup = () => {
    setSignup((signup) => !signup);
    setLogin(() => false);
  };

  if (props.hasUser) {
    return (
      <>
        <ul className={styles.navbar}>
          <li>
            <Link href={"http://localhost:3000"}>
              <a> home </a>
            </Link>
          </li>
          <li className={styles.rightItem}>
            <a href="/api/auth/logout"> Logout </a>
          </li>
        </ul>
        <span className={styles.popup}>
          <Login display={login} />
          <Signup display={signup} />
        </span>
      </>
    );
  } else {
    return (
      <>
        <ul className={styles.navbar}>
          <li>
            <Link href={"http://localhost:3000"}>
              <a> home </a>
            </Link>
          </li>
          <li className={styles.rightItem}>
            <a onClick={toggleSignup}> Signup </a>
          </li>
          <li className={styles.rightItem}>
            <a onClick={toggleLogin}> Login </a>
          </li>
        </ul>
        <span className={styles.popup}>
          <Login display={login} />
          <Signup display={signup} />
        </span>
      </>
    );
  }
};

export default Header;
