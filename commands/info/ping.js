module.exports = {
	name: 'ping',
	category: 'info',
	permissions: [],
	devOnly: false,
	run: async ({ message }) => {
		message.reply('PONG!')
	},
}