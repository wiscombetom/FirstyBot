const run = async (bot, interaction) => {
	if (interaction.isCommand()) {
		handleSlashCommand(bot, interaction)
	}
	if (interaction.isButton()) {
		handleButton(bot, interaction)
	}
}

const handleButton = async (bot, interaction) => {
	const { client } = bot
	// format:
	// name-param1-param2-...-
	const [name, ...params] = interaction.customId.split('-')
	const button = client.buttons.get(name)
	if (!button) {
		interaction.reply(`No button with name ${name}`)
		return
	}
	button.run(client, interaction, params)
}

const handleSlashCommand = async (bot, interaction) => {
	const { client } = bot
	if (!interaction.inGuild()) {
		interaction.reply('This command can only be ran in a server')
		return
	}
	const slashCommand = client.slashCommands.get(interaction.commandName)

	if (!slashCommand) {
		interaction.reply('Invalid slash command')
		return
	}

	if (slashCommand.perms && !interaction.member.permissions.has(slashCommand.perms)) {
		interaction.reply('You don\'t have the permissions to use this slash command')
		return
	}

	slashCommand.run(client, interaction)
}

module.exports = {
	name: 'interactionCreate',
	run,
}