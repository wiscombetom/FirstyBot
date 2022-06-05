module.exports = {
	name: 'messageCreate',
	run: async function runAll(bot, message) {
		const { client, prefix, owners } = bot

		if (!message.guild) {
			return
		}

		if (message.author.bot) {
			return
		}

		if (!message.content.startsWith(prefix)) {
			return
		}

		const args = message.content.slice(prefix.length).trim().split(/ +/g)
		const commandString = args.shift().toLowerCase()

		const command = client.commands.get(commandString)
		if (!command) {
			return
		}

		const member = message.member
		if (command.devOnly && !owners.includes(member.id)) {
			return message.reply('This command is only available to the bot owners')
		}

		if (command.permissions && member.permissions.missing(command.permissions).length !== 0) {
			return message.reply('You don\'t have the permissions to use this command')
		}

		try {
			await command.run({
				...bot, message, args,
			})
		}
		catch (err) {
			let errMessage = err.toString()

			if (errMessage.startsWith('?')) {
				errMessage = errMessage.slice(1)
				await message.reply(errMessage)
			}
			else {
				console.error(err)
			}
		}
	},
}
