import { MongoClient } from 'mongodb'
import { buildDb } from '../config/database'

type CallbackConnection = (conn: MongoClient) => void 

export const clientDb = async (cb: CallbackConnection):Promise<void> => {
	const connection = buildDb()

	const conn = await connection('mongodb://localhost:27017/development', { useNewUrlParser: true })
	
	cb(conn)
}