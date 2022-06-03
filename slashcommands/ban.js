const run = async (client, interaction) => {
	const member = interaction.options.getMember("user")
	const reason = interaction.options.getString("reason") || "no reason given"

	if (!member) {
		interaction.reply("Invalid member")
		return
	}
	
	try {
		await interaction.guild.bans.create(member, {reason})
		interaction.reply(`${member.user.tag} has been banned for ${reason}`)
		return
	} catch (err) {
		if (err) {
			console.error(err)
			interaction.reply(`Failed to ban ${member.user.tag}`)
		}
	}
}

module.exports = {
	name: "ban",
	description: "Ban a member",
	perm: "BAN_MEMBERS",
	options: [
		{
			name: "user", description: "The user to ban",
			type: "USER", required: true
		},
		{
			name: "reason", description: "The reason for the ban",
			type: "STRING", required: false
		}
	],
	run
}