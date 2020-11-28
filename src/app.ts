import Express, { Router } from 'express'
import { clientDb } from './factories/database-connection'
import { router } from './routes'
const app = Express()

clientDb(connection => {
	app.locals.database = connection
	app.use(Express.json())
	app.use(router(app)(Router()))
}, (error) => { 
	throw new Error(error.stack)}
)


export {app}