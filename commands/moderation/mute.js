module.exports = {
  name: "mute",
  aliases: ["mutes", "muted"],
  description: "mute",
  async execute(message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("sorry you need permission to mute someone");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("I do not have permission to mute");
    }
    const user = message.mentions.members.first();
    const exeuser = message.author.username;
    if (!user) {
      return message.channel.send("\```please mention the members for mute\```");
    }
    if (user.id === message.author.id) {
      return message.channel.send("I can't mute you because you are message author");
    }
    let reason = args[2];
    let time = args[1];
    if(isNaN(time)){
        return message.channel.send("\```.mute | mention | time | reason\```");
    }
    if (!reason) {
      return message.channel.send(" \``` please give some  reason for mute\``` ");
    }
    let timems = time*60000;
    const vrole = user.roles.cache
    let muterole = message.guild.roles.cache.find(x => x.name === "muted");
    if (!muterole) {
      return message.channel.send("\```please create role name with muted \``` ");
    }
    await user.roles.remove(vrole);
    await user.roles.add(muterole);
    setTimeout(() => {
        user.roles.remove(muterole, `Temporary mute expired.`)
    }, timems);
    setTimeout(() => {
        user.roles.add(vrole, `Temporary mute expired.`)
        user.roles.remove(muterole, `Temporary mute expired.`)
    }, timems+10);
    // double check mute role is away, sometimes it goes wrong.
    setTimeout(() => {
        message.channel.send("Unmuted.")
    }, timems);
    await message.channel.send(
      `you muted \`${message.mentions.users.first().username}\` for \`${time} minutes\``
    );
    user.send(`**${message.guild.name}**: You have been :mute:Muted (Duration: ${time} minutes) \n**Reason:** ${reason} \n**Executor:** ${exeuser}`);
  }
};

