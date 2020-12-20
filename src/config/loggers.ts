export interface Logger {
    info: (message: string, data?: Record<string, unknown>) => void;
    error: (message: string, data?: Record<string, unknown>) => void;
    debug: (message: string, data?: Record<string, unknown>) => void;
}

export const creteLogger = (logger = console): Logger => {
	const initialInformations = () => `[${new Date().toISOString()}]`
	return {
		info: (messsage, data) => {
			const args = [`[INFO] - ${initialInformations()} - ${messsage}`]
			if(data) args.push(JSON.stringify(data))

			logger.log(...args)
		},
		debug: (messsage, data) => {
			const args = [`[DEBUG] - ${initialInformations()} - ${messsage}`]
			if(data) args.push(JSON.stringify(data))
			
			logger.log(...args)
		},
		error: (messsage, data) => {
			const args = [`[ERROR] - ${initialInformations()} - ${messsage}`]
			if(data) args.push(JSON.stringify(data))
			
			logger.log(...args)
		}
	}
}