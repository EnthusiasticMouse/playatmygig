import { FC } from "react"
import styles from "./errorbox.module.scss"
import { useRouter } from 'next/router';
const Login: FC  = () => {
  const { query } = useRouter();
  if(query.error){
  return(
  <p className={styles.error}> {query.error} </p>
  )
  }
  if(query.success){
    return(
      <p className={styles.success}> {query.success} </p>
    )
  }
  return null;
}
export default Login;