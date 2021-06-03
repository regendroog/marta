const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'marta',
	description: "Get a random Marta image.",
	execute(message) {
		const martaImages = [
			"https://i2-prod.dailystar.co.uk/incoming/article22697678.ece/ALTERNATES/s1200b/0_Marta-Diaz.jpg", "https://pbs.twimg.com/media/EVLwB_GXYAE9ap7.jpg", "https://www.thesun.co.uk/wp-content/uploads/2020/09/NINTCHDBPICT000608711128.jpg"
		]
		const ranImgNum = Math.floor(Math.random() * (martaImages.length));
		const attachment = new MessageAttachment(martaImages[ranImgNum]);

		message.channel.send(attachment)
	},
};