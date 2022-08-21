import { FC, ReactNode } from "react";
import styles from "./notice.module.scss"; // using the other scss cos it is the same I'm lazy

const Notice: FC<{title: string, children: ReactNode}> = ({ title,children}) => {
  return (
    <>
     <div className={styles.mainDiv}>
        <h3> {title} </h3>
        {children}
     </div>
    </>
  );
};

export default Notice;
