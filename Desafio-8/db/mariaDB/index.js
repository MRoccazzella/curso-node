import knex from "knex"

const options = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'Desafio-8'
	}
}

export const baseDeDatosMariaDB = knex(options)
