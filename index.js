// const generateImage = require("./generateImage")
const Discord = require("discord.js")
require("dotenv").config()

var client = new Discord.Client({
	intents: [
		"GUILDS",
		"GUILD_MESSAGES",
		"GUILD_MEMBERS"
	]
})

let bot = {
	client,
	prefix: "n.",
	owners: ["437725622702309376"]
}

client.events = new Discord.Collection()
client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadEvents(bot, false)

client.commands = new Discord.Collection()
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadCommands(bot, false)

client.slashCommands = new Discord.Collection()
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", (interaction) => {
	if (!interaction.isCommand()) {
		return
	}
	if (!interaction.inGuild()) {
		interaction.reply("This command can only be ran in a server")
		return
	}
	const slashCommand = client.slashCommands.get(interaction.commandName)

	if (!slashCommand) {
		interaction.reply("Invalid slash command")
		return
	}

	if (slashCommand.perms && !interaction.member.permissions.has(slashCommand.perms)) {
		interaction.reply("You don't have the permissions to use this slash command")
		return
	}

	slashCommand.run(client, interaction)
})

client.login(process.env.TOKEN)

module.exports = bot

/*
// client.on("ready", () => {
// 	console.log(`Logged in as ${client.user.tag}`)
// })

// client.on("messageCreate", (message) => {
// 	console.log(`${message.createdAt}: "${message.content}" sent by '${message.author.tag}'`)
// 	if (message.content == "!hw") {
// 		reply_message(message, "Hello World!")
// 	}
// 	if (message.content == "!twm") {
// 		send_welcome_message(message.guild, message.member)
// 	}
// })

// client.on("guildMemberAdd", async (member) => {
// 	await send_welcome_message(member.guild, member)
// })

// function reply_message(original, message) {
// 	original.reply(message)
// }

// async function send_welcome_message(guild, member) {
// 	const welcomeImage = await generateImage(member.user)
//  const welcomeChannelId = "981579348970708992"
// 	const welcomeChannel = guild.channels.cache.get(welcomeChannelId)
// 	const welcomeMessage = `<@${member.id}> Welcome to the server!`
// 	welcomeChannel.send({
// 		content: welcomeMessage,
// 		files: [
// 			welcomeImage
// 		]
// 	})
// }
// client.login(process.env.TOKEN)
*/