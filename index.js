const generateImage = require("./generateImage")
const Discord = require("discord.js")
require("dotenv").config()
const welcomeChannelId = "981579348970708992"

var client = new Discord.Client({
	intents: [
		"GUILDS",
		"GUILD_MESSAGES",
		"GUILD_MEMBERS"
	]
})

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
	console.log(`${message.createdAt}: "${message.content}" sent by '${message.author.tag}'`)
	if (message.content == "!hw") {
		reply_message(message, "Hello World!")
	}
	if (message.content == "!twm") {
		send_welcome_message(message.guild, message.member)
	}
})

client.on("guildMemberAdd", async (member) => {
	await send_welcome_message(member.guild, member)
})

function reply_message(original, message) {
	original.reply(message)
}

async function send_welcome_message(guild, member) {
	const welcomeImage = await generateImage(member)
	const welcomeChannel = guild.channels.cache.get(welcomeChannelId)
	const welcomeMessage = `<@${member.id}> Welcome to the server!`
	welcomeChannel.send({
		content: welcomeMessage,
		files: [
			welcomeImage
		]
	})
}

client.login(process.env.TOKEN)