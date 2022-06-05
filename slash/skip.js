const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

const skip = new SlashCommandBuilder()
skip.setName('skip')
skip.setDescription('Skips the currently playing song')

module.exports = {
	data: skip,
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

		const currentSong = queue.current

		queue.skip()

		const embed = new MessageEmbed()
		embed.setDescription(`${currentSong.title} has been skipped`)
		embed.setThumbnail(currentSong.thumbnail)

		await interaction.editReply({ embeds: [embed] })
	},
}