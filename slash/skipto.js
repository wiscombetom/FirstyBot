const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

const skipTo = new SlashCommandBuilder()
skipTo.setName('skipto')
skipTo.setDescription('Skip to a certain track number')
skipTo.addNumberOption((option) => option.setName('tracknumber')
	.setDescription('The track number to skip to')
	.setMinValue(1)
	.setRequired(true),
)

module.exports = {
	data: skipTo,
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) {
			interaction.editReply('You need to be in a VC (voice channel) to run this command.')
			return
		}

		const queue = await client.player.createQueue(interaction.guild)

		const trackNumber = interaction.options.getNumber('tracknumber')

		if (trackNumber - 1 > queue.tracks.length) {
			interaction.editReply(`There are only ${queue.tracks.length} tracks in the queue`)
			return
		}

		const song = queue.tracks[trackNumber - 1]
		await queue.skipTo(trackNumber - 1)

		const embed = new MessageEmbed()
		embed.setTitle('Skipped To Song')
		embed.setDescription(`Skipped to **[${song.title}](${song.url})**`)
		embed.setThumbnail(song.thumbnail)
		embed.setFooter({ text: `Duration: ${song.duration}` })

		await interaction.editReply({ embeds: [embed] })
	},
}