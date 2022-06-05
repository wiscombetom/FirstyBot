const { SlashCommandBuilder } = require('@discordjs/builders')

const pause = new SlashCommandBuilder()
pause.setName('pause')
pause.setDescription('Pauses the currently playing song')

module.exports = {
	data: pause,
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

		queue.setPaused(true)

		await interaction.editReply('Song paused, use `/resume` to resume')
	},
}