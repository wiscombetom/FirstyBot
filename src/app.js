const { loadDotEnv } = require('./util/functions')
const { Client } = require('discord.js')
const loadEvents = require('./handlers/events')
const loadCommands = require('./handlers/commands')

loadDotEnv()

const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_MESSAGES',
		'GUILD_MEMBERS',
	],
})

const init = async () => {
	await loadCommands(client)
	loadEvents(client)
	client.login(process.env.TOKEN)
}

module.exports = init
