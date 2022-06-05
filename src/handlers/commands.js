const { Collection } = require('discord.js')
const { getFolders, getJsFiles, getFile } = require('../util/functions')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = async (client) => {
	client.commands = new Collection()
	const slash = []
	const commandFolders = getFolders('./src/commands')
	commandFolders.forEach((commandFolder) => {
		const commandFiles = getJsFiles(`./src/commands/${commandFolder}`)
		commandFiles.forEach((commandFile) => {
			const { data, run } = getFile(`./src/commands/${commandFolder}/${commandFile}`)
			const { commands } = client
			if (data instanceof SlashCommandBuilder) {
				commands.set(data.name, { run, ...data })
				slash.push(data.toJSON())
			}
		})
	})
	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN)
	try {
		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID,
				process.env.GUILD_ID,
			),
			{
				body: slash,
			},
		)
	}
	catch (err) {
		if (err instanceof Error) {
			console.error(`${err.message}\nin ${__dirname}`, 'error')
		}
	}
}
