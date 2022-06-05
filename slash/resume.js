const { SlashCommandBuilder } = require('@discordjs/builders')

const resume = new SlashCommandBuilder()
resume.setName('resume')
resume.setDescription('Resumes the currently paused song')

module.exports = {
	data: resume,
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

		queue.setPaused(false)

		await interaction.editReply('Song resumed')
	},
}