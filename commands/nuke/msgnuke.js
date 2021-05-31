module.exports = {
	name: 'msgnuke',
	description: 'Penisair',
	async execute(message) {
		const ownerID = "789058381126172702";
		if (message.author.id == ownerID) {
			await message.channel.clone();
            await message.channel.delete();
		} else {
			message.channel.send("You have to be the bot owner to use this command.")
		}
	},
};