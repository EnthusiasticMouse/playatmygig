import { FC } from 'react';
import styles from './venue.module.scss'; // using the other scss cos it is the same I'm lazy
import VenueBox from './venueBox';
import { UserDB } from '../../types/types';
interface Props {
  venues: UserDB[];
}
const venue: FC<Props> = ( {venues}) => {
  return (
    <div className={styles.container}>
      {venues.map((venue) => <VenueBox key={Math.random()} data={venue}/>)}
     </div>
  )
}

export default venue;