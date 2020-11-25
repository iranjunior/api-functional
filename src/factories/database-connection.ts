import { MongoClient } from 'mongodb'
import { buildDb } from '../config/database'

export const clientDb = async ():Promise<MongoClient> => {
	const connection = buildDb()

	const conn = await connection('mongodb://localhost:27017/development', { useNewUrlParser: true })
	
	return conn
}