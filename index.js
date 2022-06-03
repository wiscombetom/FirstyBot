// const app = require("./src/app")
// app()

const {Client, Collection} = require("discord.js")
const loadEvents = require("./handlers/events")

const loadCommands = require("./handlers/commands")

const loadButtons = require("./handlers/buttons")
const loadSlashCommands = require("./handlers/slashcommands")

require("dotenv").config()

var client = new Client({
	intents: [
		"GUILDS",
		"GUILD_MESSAGES",
		"GUILD_MEMBERS"
	]
})

client.events = new Collection()
client.commands = new Collection()

client.slashCommands = new Collection()
client.buttons = new Collection()

client.loadEvents = loadEvents
client.loadCommands = loadCommands

client.loadSlashCommands = loadSlashCommands
client.loadButtons = loadButtons

let bot = {
	client,
	prefix: "n.",
	owners: [process.env.DEV_ID]
}

client.loadEvents(bot, false)
client.loadCommands(bot, false)

client.loadSlashCommands(bot, false)
client.loadButtons(bot, false)

client.login(process.env.TOKEN)

module.exports = bot
