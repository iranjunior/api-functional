import { Collection, ObjectID } from 'mongodb'
import { AccountModel, IAccountOperations } from '../../protocols/account'

export const updateAccount = (collection: Collection<AccountModel>): IAccountOperations['update'] => {
	return async (id, data) => {
		try {
			await collection.updateOne({ _id: new ObjectID(id) }, {  $set: { ...data } })
			return               
		} catch (error) {
			console.error(error)
			throw new Error('Algo deu errado na hora de atualizar a conta')
		}
	}
}