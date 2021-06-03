module.exports = {
	name: 'statushelp',
	description: 'placeholder',
	execute(message) {
		message.channel.send(".status [ dnd / online / idle ] [ test to display ] [ playing / listening / competing / watching ] \n.status [ text to display ] [ twitch username ] streaming")
	},
};