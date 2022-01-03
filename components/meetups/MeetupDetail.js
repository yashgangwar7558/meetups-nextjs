import {Fragment} from 'react'
import styles from './MeetupDetail.module.css'

const MeetupDetail = (props) => {
    return (
        <section className={styles.details}>
            <img src={props.meetupDetails.image} alt={props.meetupDetails.title}></img>
            <h1>{props.meetupDetails.title}</h1>
            <address>{props.meetupDetails.address}</address>
            <p>{props.meetupDetails.description}</p>
        </section>
    )
}

export default MeetupDetail
