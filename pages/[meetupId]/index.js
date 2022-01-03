import MeetupDetail from "../../components/meetups/MeetupDetail"
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'

// Use this function when using getStaticProps in dynamic pages 
// we need to pre generate pages for all meetupsIds, for that we need all the ids from all possible url paths 
export const getStaticPaths = async () => {

    const client = await MongoClient.connect("mongodb+srv://yashgangwar:Yash12345@cluster0.vo961.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection('meetupsList')

    const meetupsIds = await meetupsCollection.find({}, {_id: 1}).toArray()

    client.close()

    return {
        fallback: false, // means all the possible pages are already pre generated as their data is thier in paths 
        paths: meetupsIds.map((currElem) => (    // its a list of objects with all possible pages data
            {
                params: {  // object with list of values for a particular page 
                    meetupId: currElem._id.toString()
                },
            }
        ))
    };
}

export const getStaticProps = async (context) => { 

    const meetupId = context.params.meetupId;  // gives the value of dynamic page i.e id in [meetupId]
    console.log(meetupId);

    const client = await MongoClient.connect("mongodb+srv://yashgangwar:Yash12345@cluster0.vo961.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection('meetupsList')

    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)})

    client.close()

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            },
        },
    };
}

const MeetupDetails = (props) => {
    console.log(props.meetupData);
    return (
        <div>
            <Head>
                <title>{props.meetupData.title}</title>
            </Head>
            <MeetupDetail meetupDetails={props.meetupData}/>
        </div>
    )
}

export default MeetupDetails
