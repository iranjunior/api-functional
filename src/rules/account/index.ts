import { getCollection } from '../../config/database'
import type { Account, AccountModel } from '../../protocols/account'
import { createAccount } from './add'
import { deleteAccount } from './delete'
import { loadAccount } from './loadById'
import { updateAccount } from './update'



export const account: Account = (client, hasher, logger) => {
	const collection = getCollection<AccountModel>(client)('accounts')
	return {
		create: createAccount(collection, logger, hasher.hashSync),
		loadById: loadAccount(collection),
		update: updateAccount(collection),
		remove: deleteAccount(collection),
	}
}