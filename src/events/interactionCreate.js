module.exports = {
	name: "interactionCreate",
	run: async (interaction) => {
		if (interaction.isCommand()) {
			await handleSlashCommand(interaction)
		} else if (interaction.isButton()) {
			await handleButton(interaction)
		} else {
			interaction.reply({
				content: "This interaction cannot be used"
			})
		}
	}
}

const handleSlashCommand = async (interaction) => {
	const {client} = interaction
	if (!interaction.inGuild()) {
		return interaction.reply({
			content: "This interaction cannot be used outside of a guild"
		})
	}
	const slashCommand = client.commands.get(interaction.commandName)
	if (!slashCommand) {
		return interaction.reply({
			content: "No interaction found with that name"
		})
	}
	await slashCommand.run({
		interaction
	})
}

const handleButton = async (interaction) => {
	const {client} = interaction
	if (!interaction.inGuild()) {
		return interaction.reply({content: "This interaction cannot be used outside of a guild"})
	}
	// format:
	// name-param1-param2-...-
	const {name, ...params} = interaction.customId.split("-")
	const button = client.buttons.get(name)
	if (!button) {
		interaction.reply(`No button with name ${name}`)
		return
	}
	await button.run({
		interaction
	})
}
