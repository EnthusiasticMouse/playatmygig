import ErrorBox from '../errorbox/errorbox'
import { FC, useState } from 'react';
import styles from './login.module.scss'; // using the other scss cos it is the same I'm lazy
interface LoginProps {
  display: boolean;
}
const Login: FC<LoginProps> = ({display}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  if(display){
    
    return (
      <>
        <div className={styles.loginBox}>
          <p>Login</p>
          <br/>
          <form method='POST' action={'/api/auth/login'}>
            <label>Username: </label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Password: </label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <ErrorBox/>
            <input type="submit" value="Login" />
          </form>
        </div>
      </>
    )
  }
  return null;
}

export default Login;