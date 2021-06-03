  const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "giverole",
  description: "Remove role from any user",
  permissions: 'BAN_MEMBERS',
  async execute(message, args) {
    
    let target = message.mentions.members.first();
    
    if(!target) return message.reply(`I am unable to find the user`)
    
    const penis = args[1];
    let rrole = message.guild.roles.cache.find(r => r. name === penis);
    
    if(!rrole) return message.reply(`I am unable to find the role`)

    await message.channel.send(`Gave the role to **${target.user.tag}**`)
      
    target.roles.add(rrole)
    }
}