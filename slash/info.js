const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

const info = new SlashCommandBuilder()
info.setName('info')
info.setDescription('Displays info about the currently playing song')

module.exports = {
	data: info,
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

		const progressBar = queue.createProgressBar({
			queue: false,
			length: 19,
		})

		const currentSong = queue.current
		let currentSongString = 'None'
		if (currentSong) {
			currentSongString = `Currently Playing [${currentSong.title}](${currentSong.url})\n\n\`[${currentSong.duration}]\` ${progressBar} -- <@${currentSong.requestedBy.id}>`
		}

		const embed = new MessageEmbed()
		embed.setDescription(currentSongString)
		embed.setThumbnail(currentSong.thumbnail)

		await interaction.editReply({
			embeds: [
				embed,
			],
		})
	},
}