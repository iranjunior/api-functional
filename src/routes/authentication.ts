import { Application, Router } from 'express'
import { authentication } from '../rules/authentication'

type CreateRouter = (app: Application) => (route: Router) => Router

export const router: CreateRouter = (app: Application) => {
	const { locals: { database, logger } } = app
	return (route: Router) => {
		route.post('/v1/auth', async (req, res, next) => {
			logger.info(`Inicialize request for ${req.path}`)
			const { body } = req
			try {
				const { login } = await authentication(database, logger)
				logger.info('Called rule to authenticate account')
				const authenticationInformations = await login(body)
				if(authenticationInformations){
					logger.info('Returns datas corrects authenticate complete')
					res.status(200).json({ ...authenticationInformations })
				}else {
					logger.info('Returns fails authenticate')
					res.status(401).json({ ok: false, message: 'Falha ao logar' })
				}
			} catch (error) {
				logger.info('Returns erro in authenticate', error)
				res.status(500).json({ ok: false, message: 'Algo deu errado' })
			}
			return next()
			
		})

		return route
	}

}
