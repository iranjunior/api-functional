import { getCollection } from '../../config/database'
import type { AccountModel } from '../../protocols/account'
import type { Authentication } from '../../protocols/authentication'
import { createLogin } from './login'


export const authentication: Authentication = (client, logger) => {
	const collection = getCollection<AccountModel>(client)('accounts')
	return {
		login: createLogin(collection, logger),
	}
}