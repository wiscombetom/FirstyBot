const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour
const week = 7 * day

const durations = [
	{
		name: '60 seconds',
		value: minute,
	},
	{
		name: '5 minutes',
		value: 5 * minute,
	},
	{
		name: '10 minutes',
		value: 10 * minute,
	},
	{
		name: '30 minutes',
		value: 30 * minute,
	},
	{
		name: '60 minutes',
		value: hour,
	},
	{
		name: '6 hour',
		value: 6 * hour,
	},
	{
		name: '12 hour',
		value: 12 * hour,
	},
	{
		name: '24 hour',
		value: day,
	},
	{
		name: '3 day',
		value: 3 * day,
	},
	{
		name: '7 day',
		value: week,
	},
]

const run = async (client, interaction) => {
	const member = interaction.options.getMember('user')
	const duration = interaction.options.getNumber('duration')
	const reason = interaction.options.getString('reason') || 'no reason given'

	if (!member) {
		interaction.reply('Invalid member')
		return
	}

	try {
		await member.timeout(duration, reason)
		interaction.reply(`${member.user.tag} has been timed out for ${durations.find(d => duration === d.value)?.name} for ${reason}`)
		return
	}
	catch (err) {
		if (err) {
			console.error(err)
			interaction.reply(`Failed to timeout ${member.user.tag}`)
		}
	}
}

module.exports = {
	name: 'timeout',
	description: 'Timeout a member',
	perm: 'MODERATE_MEMBERS',
	options: [
		{
			name: 'user', description: 'The user to timeout',
			type: 'USER', required: true,
		},
		{
			name: 'duration', description: 'The duration of the timeout',
			type: 'NUMBER', choices: durations,
			required: true,
		},
		{
			name: 'reason', description: 'The reason for the timeout',
			type: 'STRING', required: false,
		},
	],
	run,
}