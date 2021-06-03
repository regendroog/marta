module.exports = {
  name: "unmute",
  async execute(message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Sorry but you do not have permission to unmute anyone"
      );
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to manage roles.");
    }

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!user) {
      return message.channel.send("Please mention the member to who you want to unmute");
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "muted");

    if (user.roles.cache.has(muterole)) {
      return message.channel.send("Given User do not have mute role so what i am suppose to take");
    }

    user.roles.remove(muterole)

    await message.channel.send(`**${user.user.tag}** is now unmuted`);

    user.send(`You are now unmuted from **${message.guild.name}**`);
  }
};