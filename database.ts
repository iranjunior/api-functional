import { Collection, Db, MongoClient, MongoClientOptions } from 'mongodb'

type GetConnection =  (url: string, optionsOverwrite ?: MongoClientOptions) => Promise<Db>
type GetCollection = (connection: Db) => (collection: string) => Promise<Collection>

export const getConnection: GetConnection = async (url, optionsOverwrite) => {
    const options = optionsOverwrite || {
        useNewUrlParser: true,
        logger: process.env.NODE_ENV !== 'Development' ? 
            () => {} : 
            (...params) => console.log('MongoDB LOG: ', ...params) 
    }
    const connection = await MongoClient.connect(url, options)

    return connection.db()
}

export const getCollectionDatabase: GetCollection = (connection) => async (collection) => {
    const collectionDatabase = await connection.collection(collection)

    return collectionDatabase
} 