module.exports = {
	name: 'online',
	description: 'How many people are online???',
	execute(message) {
		message.guild.members.fetch().then(fetchedMembers => {
			const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
			const totalDnd = fetchedMembers.filter(member => member.presence.status === 'dnd');
			const totalIdle = fetchedMembers.filter(member => member.presence.status === 'idle');
			const guild = message.guild.id
			const memberCount = message.guild.memberCount
			message.channel.send(`There are currently ${totalOnline.size} members online in this guild! \n${totalDnd.size} are on Do Not Disturb! \nAlso ${totalIdle.size} set there presence to idle! \nTotal members: ${memberCount}.`)
		});
	},
};