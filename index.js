const Discord = require("discord.js")
require("dotenv").config()
// const fs = require('fs')
// const os = require('node:os')

// var token = fs.readFileSync('bot-token.txt', 'utf-8')

var client = new Discord.Client({
	intents: [
		"GUILDS",
		"GUILD_MESSAGES"
	]
})

// client.on("ready", function(){
// 	console.log(`Logged in as ${client.user.tag}`)
// })

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
	console.log(`${message.createdAt}: "${message.content}" sent by '${message.author.tag}'`)
	if (message.content == "!hw") {
		message.reply("Hello World!")
	}
})

client.login(process.env.TOKEN)