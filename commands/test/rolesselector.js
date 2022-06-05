const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'rolesselector',
	category: 'test',
	devOnly: true,
	run: async ({ message }) => {
		const embed = new MessageEmbed()
		embed.setTitle('Select Role')
		embed.setDescription('Select roles from the buttons below')
		embed.setColor('BLUE')

		const roleButton = new MessageButton()
		roleButton.setCustomId('role-982407628951027752')
		roleButton.setStyle('PRIMARY')
		roleButton.setLabel('5')

		const buttonRow = new MessageActionRow()
		buttonRow.addComponents([
			roleButton,
		])

		message.channel.send({
			embeds: [
				embed,
			],
			components: [
				buttonRow,
			],
		})
	},
}