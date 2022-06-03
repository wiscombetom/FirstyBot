const {MessageActionRow, MessageButton, MessageEmbed} = require("discord.js")

module.exports = {
	name: "rolesselector",
	category: "test",
	// permissions: [],
	devOnly: true,
	run: async ({client, message, args}) => {
		const embed = new MessageEmbed()
		embed.setTitle("Select Role")
		embed.setDescription("Select roles from the buttons below")
		embed.setColor("BLUE")
		const roleButton = new MessageButton()
		roleButton.setCustomId("role-982407628951027752")
		roleButton.setStyle("PRIMARY")
		roleButton.setLabel("5")
		const buttonRow = new MessageActionRow()
		buttonRow.addComponents([
			roleButton
		])
		message.channel.send({
			embeds: [
				embed
				// new MessageEmbed().setTitle("Select Role").setDescription("Select roles from the buttons below").setColor("BLUE")
			],
			components: [
				buttonRow
				// new MessageActionRow().addComponents([
				// 	new MessageButton().setCustomId("role-982407628951027752").setStyle("PRIMARY").setLabel("5")
				// ])
			]
		})
	}
}