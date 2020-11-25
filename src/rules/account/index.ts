import { getCollection } from '../../config/database'
import { createAccount } from './add'
import { loadAccount } from './loadById'
import type { Account,AccountModel } from '../../protocols/account'


export const account: Account = (client) => {
	const collection = getCollection<AccountModel>(client)('accounts')
	return {
		create: createAccount(collection),
		loadById: loadAccount(collection)
	}
}