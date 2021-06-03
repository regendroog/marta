const { prefix } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity('the loading screen', { type: 'WATCHING' })	
	},
};