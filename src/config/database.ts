import { Collection, MongoClient, MongoClientOptions } from 'mongodb'

export type BuildDB = (db?: typeof MongoClient) => (url: string, options?: Partial<MongoClientOptions>) => Promise<MongoClient>

export type GetCollection = <T = unknown>(client: MongoClient) => (collection: string) => Collection<T>

export const buildDb: BuildDB = (db = MongoClient) => async (url, options) => {
	const connection = await db.connect(url, options)
	if(!connection.isConnected())
		await buildDb(db)(url, options)
		
	return connection
}

export const getCollection: GetCollection = (client) => (collection) => {
	return client.db().collection(collection)
}
