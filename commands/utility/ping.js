module.exports = {
	name: 'ping',
	execute(message) {
		message.channel.send('Pinging...').then(sent => {
			sent.edit(`Latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
		});
	},
};