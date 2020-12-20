import type { hashSync } from 'bcrypt'
import { Collection } from 'mongodb'
import { Logger } from '../../config/loggers'
import { AccountModel, IAccountOperations } from '../../protocols/account'

export const createAccount = (collection: Collection<AccountModel>, logger: Logger, generateHash: typeof hashSync): IAccountOperations['create'] => {
	return async (data) => {
		logger.info('Inicialize Rule for create account')
		try {
			const { password } = data
			logger.debug('Inicialize generate crypt password')
			const cryptPassword = generateHash(password, 5)
			logger.debug('Password crypted')
			
			logger.debug('Insert account', { ...data, password: cryptPassword })
			await collection.insertOne({ ...data, password: cryptPassword })
			logger.info('Finalize insert account in database')              
		} catch (error) {
			logger.error('Error in store data', error)
			throw new Error('Algo deu errado na hora de salvar')
		}
	}
}