const { Collection } = require("discord.js")
const { getJsFiles, getFile } = require("../util/functions")

module.exports = (client) => {
	client.events = new Collection()
	const eventFiles = getJsFiles("./src/events")

	eventFiles.forEach((eventFile) => {
		const event = getFile(`./src/events/${eventFile}`)
		console.log(`[EVENT] ${event.name} loaded`)
		client.events.set(event.name, event)
		client.on(event.name, (...args) => event.run(...args))
	})
}
