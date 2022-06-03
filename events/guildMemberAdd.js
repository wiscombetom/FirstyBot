const generateImage = require("../generateImage")
require("dotenv").config()

module.exports = {
	name: "guildMemberAdd",
	run: async function runAll (bot, member) {
		const guild = member.guild
		const welcomeImage = await generateImage(member.user)
		const welcomeChannelId = process.env.WELCOME_CHANNEL_ID
		const welcomeChannel = guild.channels.cache.get(welcomeChannelId)
		const welcomeMessage = `<@${member.id}> Welcome to the server!`
		welcomeChannel.send({
			content: welcomeMessage,
			files: [
				welcomeImage
			]
		})
	}
}
