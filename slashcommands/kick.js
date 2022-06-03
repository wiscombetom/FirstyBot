const run = async (client, interaction) => {
	const member = interaction.options.getMember("user")
	const reason = interaction.options.getString("reason") || "no reason given"

	if (!member) {
		interaction.reply("Invalid member")
		return
	}
	
	try {
		await interaction.guild.members.kick(member, reason)
		interaction.reply(`${member.user.tag} has been kicked for ${reason}`)
		return
	} catch (err) {
		if (err) {
			console.error(err)
			interaction.reply(`Failed to kick ${member.user.tag}`)
		}
	}
}

module.exports = {
	name: "kick",
	description: "Kick a member",
	perm: "KICK_MEMBERS",
	options: [
		{
			name: "user", description: "The user to kick",
			type: "USER", required: true
		},
		{
			name: "reason", description: "The reason for the kick",
			type: "STRING", required: false
		}
	],
	run
}