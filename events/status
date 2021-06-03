const { prefix } = require('../config.json');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

		let activities = [
    	{ type: 'PLAYING', status: 'with new commands!' },
    	{ type: 'WATCHING', status: `for ${prefix}help` },
		], i = 0
		client.user.setActivity('the loading screen', { type: 'WATCHING' })

		setInterval(() => {
			const current = activities[i++ % activities.length]
    	const { type, status } = current
    	client.user.setActivity(status, { type })
		}, 30 * 1000) 
	},
};