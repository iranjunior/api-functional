import { ObjectID } from 'mongodb'
import { getCollection } from '../config/database'
import type { Account,AccountModel } from '../protocols/account'


export const account: Account = (client) => {
	const collection = getCollection<AccountModel>(client)('accounts')
	return {
		async create(data) {
			try {
				await collection.insertOne(data)
				return               
			} catch (error) {
				console.error(error)
				throw new Error('Algo deu errado na hora de salvar')
			}
		},
		async loadById (id) {
			try {
				const account = await collection.findOne<AccountModel>({ _id: new ObjectID(id) })
				return account
			} catch (error) {
				console.error(error)
				throw new Error('Algo deu errado na hora de salvar')
			}
		}
	}
}