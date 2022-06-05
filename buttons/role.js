module.exports = {
	name: 'role',
	run: async (bot, interaction, parameters) => {
		if (!interaction.guild) {
			interaction.reply({
				content: 'This command can only be used in a guild!',
				ephemeral: true,
			})
			return
		}
		const roleId = parameters[0]
		const role = await interaction.guild.roles.fetch(roleId)
		if (!role) {
			interaction.reply({
				content: 'Role not found',
				ephemeral: true,
			})
			return
		}
		const member = await interaction.guild.members.fetch(interaction.member.id)
		if (member.roles.cache.has(role.id)) {
			await member.roles.remove(role.id)
			interaction.reply({
				content: `Role ${role.name} removed`,
				ephemeral: true,
			})
			return
		}
		await member.roles.add(role.id)
		interaction.reply({
			content: `Role ${role.name} added`,
			ephemeral: true,
		})
		return
	},
}
