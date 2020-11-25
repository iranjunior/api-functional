import { getCollection } from '../../config/database'
import { createAccount } from './add'
import { loadAccount } from './loadById'
import { updateAccount } from './update'
import type { Account,AccountModel } from '../../protocols/account'


export const account: Account = (client) => {
	const collection = getCollection<AccountModel>(client)('accounts')
	return {
		create: createAccount(collection),
		loadById: loadAccount(collection),
		update: updateAccount(collection)
	}
}