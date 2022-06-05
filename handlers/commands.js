const { getFiles } = require('../util/functions')
const fs = require('fs')

module.exports = (bot, reload) => {
	const { client } = bot

	fs.readdirSync('./commands/').forEach((category) => {
		const commands = getFiles(`./commands/${category}`, '.js')

		commands.forEach((f, i) => {
			if (reload) {
				delete require.cache(require.resolve(`../commands/${f}`))
			}
			const command = require(`../commands/${category}/${f}`)
			client.commands.set(command.name, command)
			if (!reload) {
				console.log(`${i + 1}. ${f} loaded`)
			}
		})
	})
	console.log(`Loaded ${client.commands.size} commands`)
}