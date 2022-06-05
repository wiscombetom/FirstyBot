const { SlashCommandBuilder } = require('@discordjs/builders')

const quit = new SlashCommandBuilder()
quit.setName('quit')
quit.setDescription('Stops the bot and clears the queue')

module.exports = {
	data: quit,
	run: async ({ client, interaction }) => {

		if (!interaction.member.voice.channel) {
			interaction.editReply('You need to be in a VC (voice channel) to run this command.')
			return
		}

		const queue = await client.player.createQueue(interaction.guild)

		if (!queue || !queue.playing) {
			await interaction.editReply('There are no songs in the queue')
			return
		}

		queue.destroy()

		await interaction.editReply('Queue cleared, playback stopped, leaving voice channel')
	},
}