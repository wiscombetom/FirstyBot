const { SlashCommandBuilder, SlashCommandNumberOption } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

const page = new SlashCommandNumberOption()
page.setName('page')
page.setDescription('Page number of the queue')
page.setMinValue(1)

const queue = new SlashCommandBuilder()
queue.setName('queue')
queue.setDescription('Displays the current song queue')
queue.addNumberOption(page)

module.exports = {
	data: queue,
	run: async ({ client, interaction }) => {
		const songQueue = client.player.getQueue(interaction.guildId)
		if (!songQueue || !songQueue.playing) {
			await interaction.editReply('There are no songs in the songQueue')
			return
		}

		const totalPages = Math.ceil(songQueue.tracks.length / 10) || 1
		const pageNumber = (interaction.options.getNumber('page') || 1) - 1

		if (pageNumber > totalPages) {
			await interaction.editReply(`Invalid page, there are only ${totalPages} pages of songs in the songQueue`)
			return
		}

		const songQueueString = songQueue.tracks.slice(pageNumber * 10, pageNumber * 10 + 10).map((song, i) => {
			return `**${pageNumber * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
		}).join('\n')

		const currentSong = songQueue.current
		let currentSongString = 'None'
		if (currentSong) {
			currentSongString = `\`[${currentSong.duration}]\` ${currentSong.title} -- <@${currentSong.requestedBy.id}>`
		}

		const pageNumberString = `Page: ${pageNumber + 1} / ${totalPages}`

		const embed = new MessageEmbed()
		embed.setDescription(`**Currently Playing**\n${currentSongString}\n\n**Queue**\n${songQueueString}`)
		embed.setThumbnail(currentSong.thumbnail)
		embed.setFooter({ text: pageNumberString })

		await interaction.editReply({
			embeds: [
				embed,
			],
		})
	},
}