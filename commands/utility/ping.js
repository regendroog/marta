module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.channel.send('Pinging...').then(sent => {
			sent.edit(`Latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
		});
	},
};