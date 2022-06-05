const { SlashCommandBuilder } = require('@discordjs/builders')

const run = ({ interaction }) => {
	return interaction.reply({ content: 'PONG!' })
}

const data = new SlashCommandBuilder()
data.setName('ping')
data.setDescription('Test the server!')

module.exports = { data, run }
