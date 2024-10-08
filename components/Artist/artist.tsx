import { FC } from "react";
import styles from "./artist.module.scss"; // using the other scss cos it is the same I'm lazy
import ArtistBox from "./artistBox";
import { UserDB } from "../../types/types";

interface Props {
  artists: UserDB[];
}
const artist: FC<Props> = ({ artists }) => {
  console.log(artists);
  if (artists.length > 0) {
    return (
      <div className={styles.container}>
        {artists.map((artist) => (
          <ArtistBox key={Math.random()} data={artist} />
        ))}
      </div>
    );
  } else {
    return <p> no published venues</p>;
  }
};

export default artist;
