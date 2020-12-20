import { Express, Router } from 'express'
import { Forbbiden } from '../erros'
import { account } from '../rules/account'

type CreateRouter = (app: Express) => (route: Router) => Router

export const router: CreateRouter = (app: Express) => {
	const { locals: { database, hasher, logger } } = app
	return (route: Router) => {
		route.post('/v1/create-account', async (req, res, next) => {
			logger.info(`Inicialize request for ${req.path}`)
			const { body } = req
			try {
				const { create } = await account(database, hasher, logger)
				logger.info('Called rule to create account')
				await create(body)
				logger.info('Returns with success for create account')
				res.status(201).json({ ok: true, message: 'Usuario cadastrado com sucesso' })
			} catch (error) {
				if(error instanceof Forbbiden) {
					logger.info('Account already created')
					res.status(403).json({ ok: false, message: 'Usuario já criado' })
				}else {
					res.status(500).json({ ok: false, message: 'Algo deu errado' })
				}
			}
			return next()
			
		})
		
		route.get('/v1/fetch-account/:id', async (req, res, next) => {
			const { params } = req
			try {
				const { loadById } = await account(database, hasher, logger)
				const response = await loadById(params.id)
				res.status(200).json({ ok: true, data: response })
			} catch (error) {
				res.status(500).json({ ok: false, message: 'Algo deu errado' })
			}
			return next()
			
		})
		route.patch('/v1/update-account/:id', async (req, res, next) => {
			const { params, body } = req
			try {
				const { update } = await account(database, hasher, logger)
				await update(params.id, body)
				res.status(200).json({ ok: true, message: 'Usuario cadastrado com sucesso' })
			} catch (error) {
				res.status(500).json({ ok: false, message: 'Algo deu errado' })
			}
			return next()
			
		})
		
		route.delete('/v1/delete-account/:id', async (req, res, next) => {
			const { params } = req
			try {
				const { remove } = await account(database, hasher, logger)
				await remove(params.id)
				res.status(200).json({ ok: true, message: 'Usuario deletado com sucesso' })
			} catch (error) {
				res.status(500).json({ ok: false, message: 'Algo deu errado' })
			}
			return next()
			
		})

		return route
	}

}
