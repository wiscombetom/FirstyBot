const Discord = require('discord.js')
require('dotenv').config()

const client = new Discord.Client({
	intents: [
		'GUILDS',
		'GUILD_MESSAGES',
		'GUILD_MEMBERS',
	],
})

const bot = {
	client,
}

const guildId = '981531025324797952'

client.slashCommands = new Discord.Collection()
client.loadSlashCommands = require('./handlers/slashcommands')
client.loadSlashCommands(bot, false)

client.on('ready', async () => {
	const guild = client.guilds.cache.get(guildId)
	if (!guild) {
		console.error('Target guild not found')
		return
	}
	console.log(`Successfully loaded in ${client.slashCommands.size} slash commands`)

	await guild.commands.set([...client.slashCommands.values()])
	process.exit(0)
})

client.login(process.env.TOKEN)
