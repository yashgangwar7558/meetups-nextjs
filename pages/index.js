import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'
import { MongoClient } from 'mongodb'


// STATIC GENERATION
// It runs while the code is Build, before it goes to server and then to client, so this is Pre-rendering of pages 
// U can do secure connections here as this code never goes to client side
// If ur data doesnt changes every sec than u can use this  
export const getStaticProps = async () => {

    const client = await MongoClient.connect("mongodb+srv://yashgangwar:Yash12345@cluster0.vo961.mongodb.net/meetups?retryWrites=true&w=majority")
    const db = client.db()

    const meetupsCollection = db.collection('meetupsList')

    const meetupsList = await meetupsCollection.find().toArray();

    client.close()

    return {
        props: {
            meetups: meetupsList.map((meetup) => ({
                id: meetup._id.toString(),
                image: meetup.image,
                title: meetup.title,
                address: meetup.address
            })),
        },
        revalidate: 1  // after every 1sec it will rebuild to update changes 
    };
}


// SERVICE SIDE RENDERING 
// This will always run on the server after deployment 
// U can do secure connections here as this code never goes to client side
// Page will load at every request so slower than getstaticprops
// U hv access to req and res object 
// export const getServerSideProps = async () => { 
//     return {
//         props: {
//             meetups: DUMMY_LIST
//         },
//     };
// }


const HomePage = (props) => {
    return (
        <div>
            <Head>
                <title>Meetups</title>
                <meta name="description" content="list of highly active meetups in the city"></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </div>
    )
}
export default HomePage
