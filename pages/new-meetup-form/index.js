import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import { useRouter } from "next/router";
import Head from 'next/head'

const NewMeetups = () => {

    const router = useRouter()

    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/add-new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: { 'Content-Type': 'application/json' }
        })

        const data = await response.json()
        console.log(data);

        router.push('/')
    }

    return (
        <div>
            <Head>
                <title>Add New Meetup</title>
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </div>
    )
}

export default NewMeetups
