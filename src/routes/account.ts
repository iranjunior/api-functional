import { Router, Application } from 'express'
import { account } from '../rules/account'

type CreateRouter = (app: Application) => (route: Router) => Router

export const router: CreateRouter = (app: Application) => {
	const { locals: { database } } = app
	return (route: Router) => {
		route.post('/v1/create-account', async (req, res, next) => {
			const { body } = req
			try {
				const { create } = await account(database)
				await create(body)
				res.status(201).json({ ok: true, message: 'Usuario cadastrado com sucesso' })
			} catch (error) {
				res.status(500).json({ ok: false, message: 'Algo deu errado' })
			}
			return next()
			
		})
		
		route.get('/v1/fetch-account/:id', async (req, res, next) => {
			const { params } = req
			try {
				const { loadById } = await account(database)
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
				const { update } = await account(database)
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
				const { remove } = await account(database)
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
