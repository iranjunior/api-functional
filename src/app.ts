import hasher from 'bcrypt'
import Express, { Router } from 'express'
import { creteLogger } from './config/loggers'
import { clientDb } from './factories/database-connection'
import * as routes from './routes'
const app = Express()

clientDb(connection => {
	app.locals.database = connection
	app.locals.hasher = hasher
	app.locals.logger = creteLogger()

	app.use(Express.json())
	app.use(routes.Account.router(app)(Router()))
	app.use(routes.Auth.router(app)(Router()))
}, (error) => { 
	throw new Error(error.stack)}
)


export { app }
