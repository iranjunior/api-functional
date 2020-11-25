import { Collection, ObjectID } from 'mongodb'
import { AccountModel, IAccountOperations } from '../../protocols/account'

export const deleteAccount = (collection: Collection<AccountModel>): IAccountOperations['remove'] => {
	return async (id) => {
		try {
			await collection.deleteOne({ _id: new ObjectID(id) })
			return 
		} catch (error) {
			console.error(error)
			throw new Error('Algo deu errado na hora de salvar')
		}
	}
}