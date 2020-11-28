import { MongoClient } from 'mongodb'
import { buildDb } from '../config/database'

type CallbackConnection = (conn: MongoClient) => void 
type CallbackErrorConnection = (error: Error) => unknown 

export const clientDb = async (cb: CallbackConnection, cbError?: CallbackErrorConnection):Promise<void> => {
	try {
		const connection = buildDb()
		
		const conn = await connection('mongodb://localhost:27017/development', { useNewUrlParser: true })
		
		cb(conn)
		
	} catch (error) {
		cbError && cbError(error)
	}
}