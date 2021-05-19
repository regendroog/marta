module.exports = {
	name: 'ban',
	description: 'Ban someone from a server!',
	guildOnly: true,
	execute(message) {
		const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.members.resolve(user);
      if (member) {
				member
          .ban('Optional reason that will display in the audit logs')
          .then(() => {
						message.channel.send(`Successfully banned ${user.tag}`);
         	})
          .catch(err => {
            message.channel.send('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.channel.send("That user isn't in this guild!");
      }
    } else {
      message.channel.send("You didn't mention the user to ban!");
    } 	
	},
};