const Discord = require("discord.js")

module.exports = {
	name: 'avatar',
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	aliases: ['icon', 'pfp', 'av'],
	execute(message) {
		if (!message.mentions.users.size) {
			const avatarImagePng = message.author.displayAvatarURL({format:'png'}) + '?size=1024';
			const avatarImageJpg = message.author.displayAvatarURL({format:'jpg'}) + '?size=1024';
			const avatarImageWebp = message.author.displayAvatarURL({format:'webp'}) + '?size=1024';
			const embed = new Discord.MessageEmbed()
  			.setTitle(`Avatar for ${message.member.user.tag}`)
			.setColor("#992D22")	  
			.addField("Link as",
			`[png](${avatarImagePng}) | [jpg](${avatarImageJpg}) | [webp](${avatarImageWebp})`)
  			.setImage(avatarImagePng)
  			message.channel.send({embed});
		} else if (message.mentions.users.size === 1) {
			const target = message.mentions.users.first()
			message.mentions.users.map(user => {
				const avatarImagePngUser = user.displayAvatarURL({format:'png'}) + '?size=1024';
				const avatarImageJpgUser = user.displayAvatarURL({format:'jpg'}) + '?size=1024';
				const avatarImageWebpUser = user.displayAvatarURL({format:'webp'}) + '?size=1024';
				const embed = new Discord.MessageEmbed()
  				.setTitle(`Avatar for ${target.tag}`)
				.setColor("#992D22")
				.addField("Link as",
				`[png](${avatarImagePngUser}) | [jpg](${avatarImageJpgUser}) | [webp](${avatarImageWebpUser})`)
  				.setImage(avatarImagePngUser)
  				message.channel.send({embed});
			});
		} else if (message.mentions.users.size > 1) {
			message.lineReplyNoMention("Please only mention one person.")
		}
	},
};	
