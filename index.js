// const app = require('./src/app')
// app()

const { Client, Collection } = require('discord.js')
require('dotenv').config()

const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_MESSAGES',
		'GUILD_MEMBERS',
		'GUILD_VOICE_STATES',
	],
})

client.events = new Collection()
client.commands = new Collection()
client.slashCommands = new Collection()
client.buttons = new Collection()

const loadEvents = require('./handlers/events')
const loadCommands = require('./handlers/commands')
const loadSlashCommands = require('./handlers/slashcommands')
const loadButtons = require('./handlers/buttons')

client.loadEvents = loadEvents
client.loadCommands = loadCommands
client.loadSlashCommands = loadSlashCommands
client.loadButtons = loadButtons

const bot = {
	client,
	prefix: 'n.',
	owners: [process.env.DEV_ID],
}

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
client.loadButtons(bot, false)

client.login(process.env.TOKEN)

module.exports = bot

// const { readdirSync } = require('fs')
// const { REST } = require('@discordjs/rest')
// const { Routes } = require('discord-api-types/v10')
// const { Player } = require('discord-player')
// const TOKEN = process.env.TOKEN
// const LOAD_SLASH = process.argv[2] == 'load'
// const CLIENT_ID = process.env.CLIENT_ID
// const GUILD_ID = process.env.GUILD_ID

// client.slash = new Collection()
// client.player = new Player(client, {
// 	ytdlOptions: {
// 		quality: 'highestaudio',
// 		highWaterMark: 1 << 25,
// 	},
// })

// const commands = []

// const slashFiles = readdirSync('./slash').filter((f) => f.endsWith('.js'))
// for (const file of slashFiles) {
// 	const slashCommand = require(`./slash/${file}`)
// 	client.slash.set(slashCommand.data.name, slashCommand)
// 	if (LOAD_SLASH) {
// 		// console.log(slashCommand.data.toJSON())
// 		commands.push(slashCommand.data.toJSON())
// 	}
// }

// if (LOAD_SLASH) {
// 	const rest = new REST({ version: '9' }).setToken(TOKEN)
// 	console.log('Deploying slash commands')
// 	rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands }).then(() => {
// 		console.log('Successfully loaded')
// 		process.exit(0)
// 	}).catch((err) => {
// 		if (err) {
// 			console.error(err)
// 			process.exit(1)
// 		}
// 	})
// }
// else {
// 	client.on('ready', () => {
// 		console.log(`Logged in as ${client.user.tag}`)
// 	})
// 	client.on('interactionCreate', (interaction) => {
// 		async function handleCommand() {
// 			if (!interaction.isCommand()) {
// 				return
// 			}
// 			const slashCommand = client.slash.get(interaction.commandName)
// 			if (!slashCommand) interaction.reply('Not a valid slash command')
// 			await interaction.deferReply()

// 			await slashCommand.run({ client, interaction })
// 		}
// 		handleCommand()
// 	})
// 	client.login(TOKEN)
// }