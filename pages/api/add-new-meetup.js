// this page will not serve any html to server , it acts as a backend page nd is used to make apis
// this page can be accessed at "/api/add-new-meetup" for put/post/delete requests
import {MongoClient} from 'mongodb'

const handler = async (req, res) => {
    if(req.method === 'POST')
    {
        const data = req.body;

        const client = await MongoClient.connect("mongodb+srv://yashgangwar:Yash12345@cluster0.vo961.mongodb.net/meetups?retryWrites=true&w=majority")
        const db = client.db()

        const meetupsCollection = db.collection('meetupsList')

        const result = await meetupsCollection.insertOne(data)
        console.log(result);

        client.close()

        res.status(201).json({message: "Meetup added!"})
    }
}

export default handler;