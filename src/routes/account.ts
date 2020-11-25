import { Router } from 'express'
import { account } from '../rules/account'
const route = Router()

route.post('/v1/create-account', async (req, res, next) => {
	const { body, app } = req
	try {
		const { create } = await account(app.locals.database)
		await create(body)
		res.status(200).json({ ok: true, message: 'Usuario cadastrado com sucesso' })
	} catch (error) {
		res.status(500).json({ ok: false, message: 'Algo deu errado' })
	}
	return next()
    
})

route.get('/v1/fetch-account/:id', async (req, res, next) => {
	const { params, app } = req
	try {
		const { loadById } = await account(app.locals.database)
		const response = await loadById(params.id)
		res.status(200).json({ ok: true, data: response })
	} catch (error) {
		res.status(500).json({ ok: false, message: 'Algo deu errado' })
	}
	return next()
    
})

export { route }