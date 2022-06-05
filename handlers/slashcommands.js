const { getFiles } = require('../util/functions')

module.exports = (bot, reload) => {
	const { client } = bot
	const slashCommands = getFiles('./slashcommands/', '.js')

	if (slashCommands.length === 0) {
		console.log('No slash commands to load')
	}

	slashCommands.forEach((f, i) => {
		if (reload) {
			delete require.cache(require.resolve(`../slashcommands/${f}`))
		}
		const slashCommand = require(`../slashcommands/${f}`)
		client.slashCommands.set(slashCommand.name, slashCommand)
		if (!reload) {
			console.log(`${i + 1}. ${f} loaded`)
		}
	})
}