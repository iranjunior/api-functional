import Express from 'express'
import { clientDb } from './factories/database-connection'
import { route } from './routes'
const app = Express()

clientDb(connection => {
	app.locals.database = connection
})

app.use(Express.json())
app.use(route)

export {app}