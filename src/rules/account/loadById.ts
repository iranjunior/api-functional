import { Collection, ObjectID } from 'mongodb'
import { AccountModel, IAccountOperations } from '../../protocols/account'

export const loadAccount = (collection: Collection<AccountModel>): IAccountOperations['loadById'] => {
	return async  (id) => {
		try {
			const account = await collection.findOne<AccountModel>({ _id: new ObjectID(id) })
			return account
		} catch (error) {
			console.error(error)
			throw new Error('Algo deu errado na hora de salvar')
		}
	}
}