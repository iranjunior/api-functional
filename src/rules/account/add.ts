import { Collection } from 'mongodb'
import { AccountModel, IAccountOperations } from '../../protocols/account'

export const createAccount = (collection: Collection<AccountModel>): IAccountOperations['create'] => {
	return async (data) => {
		try {
			await collection.insertOne(data)
			return               
		} catch (error) {
			console.error(error)
			throw new Error('Algo deu errado na hora de salvar')
		}
	}
}