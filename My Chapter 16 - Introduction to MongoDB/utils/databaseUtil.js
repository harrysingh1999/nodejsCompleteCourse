import mongodb from 'mongodb'

const mongoConnect = mongodb.MongoClient

const mongo_url = 'mongodb+srv://harvinder_db_user:harvinderDeveloper@backend.lqovuqz.mongodb.net/?appName=Backend'

let _db

export const mongodbConnect = async () => {
    try {
        const client = await mongoConnect.connect(mongo_url)
        _db = client.db('airbnb')
        return client
    } catch (error) {
        console.log('error while connecting to Mongodb', error)
    }

}

export const getDB = () => _db ? _db : console.log('mongodb not connected')