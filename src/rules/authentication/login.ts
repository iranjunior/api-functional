import { compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import type { Collection } from 'mongodb'
import { Logger } from '../../config/loggers'
import type { AccountModel, RAccountModel } from '../../protocols/account'
import type { IAuthenticationOperations } from '../../protocols/authentication'

export const createLogin = (collection: Collection<AccountModel>, logger: Logger): IAuthenticationOperations['login'] => {
	return async  ({email, password}) => {
		try {
			logger.info('Inicialize rule for authenticate user')
			const account = await collection.findOne<RAccountModel>({ email })
			if(account){
				logger.info('User founded')
				const isValid = compareSync(password, account.password)
				logger.debug('Password compareted', { isValid })
				if(isValid){
					logger.info('inicialize generate token')
					const token = sign({
						id: account._id
					}, 'secret', {
						expiresIn: 3600,
					})
					logger.debug('Token generated', { token })
					return {
						token,
						tokenType: 'Bearer',
						expireIn: 3600
					}
				}
			}
			logger.info('User not found')
			return null
		} catch (error) {
			console.error(error)
			throw new Error('Algo deu errado na hora de salvar')
		}
	}
}