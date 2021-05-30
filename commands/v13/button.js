const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'button shit',
    description: "Button test",
    category: "fun",
    async execute(client, message, args) {
      let button = new MessageButton()
          .setStyle('red')
          .setLabel('My First Button!') 
          .setID('placeholder') 
        message.channel.send('Done!', { button: button })
    },
}
