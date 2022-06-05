const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')

const play = new SlashCommandBuilder()
play.setName('play')
play.setDescription('Load songs from YouTube')
play.addSubcommand(
	(subCommand) => subCommand.setName('song')
		.setDescription('Loads a single song from a url')
		.addStringOption (
			(option) => option.setName('url')
				.setDescription('The URL of the song')
				.setRequired(true),
		),
)
	.addSubcommand(
		(subCommand) => subCommand.setName('playlist')
			.setDescription('Loads a playlist from a url')
			.addStringOption (
				(option) => option.setName('url')
					.setDescription('The URL of the playlist')
					.setRequired(true),
			),
	)
	.addSubcommand(
		(subCommand) => subCommand.setName('search')
			.setDescription('Searches for a song by keywords')
			.addStringOption (
				(option) => option.setName('searchterms')
					.setDescription('The keywords to search')
					.setRequired(true),
			),
	)

module.exports = {
	data: play,
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) {
			interaction.editReply('You need to be in a VC (voice channel) to run this command.')
			return
		}

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) {
			await queue.connect(interaction.member.voice.channel)
		}

		const embed = new MessageEmbed()
		if (interaction.options.getSubcommand() === 'song') {
			const url = interaction.options.getString('url')

			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO,
			})

			if (result.tracks.length === 0) {
				interaction.editReply('No song found at that url')
				return
			}

			const song = result.tracks[0]
			await queue.addTrack(song)

			embed.setTitle('Song Added to Queue')
			embed.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
			embed.setThumbnail(song.thumbnail)
			embed.setFooter({ text: `Duration: ${song.duration}` })

		}
		else if (interaction.options.getSubcommand() === 'playlist') {
			const url = interaction.options.getString('url')

			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST,
			})

			if (result.tracks.length === 0) {
				interaction.editReply('No playlist found at that url')
				return
			}

			const playlist = result.playlist
			await queue.addTracks(result.tracks)

			embed.setTitle('Playlist Added to Queue')
			embed.setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** have been added to the Queue`)
			embed.setThumbnail(playlist.thumbnail)

		}
		else if (interaction.options.getSubcommand() === 'search') {
			const searchTerms = interaction.options.getString('searchterms')

			const result = await client.player.search(searchTerms, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			})

			if (result.tracks.length === 0) {
				interaction.editReply('No song found with those keywords')
				return
			}

			const song = result.tracks[0]
			await queue.addTrack(song)

			embed.setTitle('Song Added to Queue')
			embed.setDescription(`**[${song.title}](${song.url})** has been added to the Queue`)
			embed.setThumbnail(song.thumbnail)
			embed.setFooter({ text: `Duration: ${song.duration}` })
		}
		if (!queue.playing) {
			await queue.play()
		}
		await interaction.editReply({ embeds:[embed] })
	},
}