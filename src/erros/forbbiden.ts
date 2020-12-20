export class Forbbiden extends Error {
	constructor (message?: string){
		super(message || 'Sem acesso a este recurso')
		this.name = 'Forbbiden'
	}
}