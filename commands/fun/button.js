const { MessageButton } = require('discord-buttons');

module.exports = {
    name: 'test',
    description: "Button test",
    category: "fun",
    async execute(client, message, args) {
        let button = new MessageButton()
          .setStyle('red')
          .setLabel('My First Button!') 
          .setID('click_to_function') 
          .setDisabled(); //disables the button | default: false

        await message.channel.send('Done!', { button: button })
    },
}

//message.channel.send('Done!', { button: button })