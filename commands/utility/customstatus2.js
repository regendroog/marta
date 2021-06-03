module.exports = {
    name: 'kaas',
    description: 'set status',
    async execute(client, message, args) {

        const typelist = [
            "WATCHING",
            "LISTENING",
            "PLAYING",
            "COMPETING"
        ]

        const type = args[1];        
        const ttype = type.toUpperCase();
        if (ttype != typelist) {
            return message.channel.send("Please give me a valid status type")
        }

    

      /*
      const status = args.slice(1).join(" ");
      if(!status) {
          return message.channel.send(`You must specify a status.`)
        }
  
      if (type === 'watching'){
        client.user.setActivity(`${status}`, {
          type: "WATCHING"
        });

      } else if (type === 'listening'){
        client.user.setActivity(`${status}`, {
          type: "LISTENING"
        });

      } else if (type === 'playing'){
        client.user.setActivity(`${status}`, {
          type: "PLAYING"
        });

      } else if (type === 'streaming'){
        client.user.setActivity(`${status}`, {
          type: "STREAMING",
          url: 'https://www.twitch.tv/test'
        });
  
      } else if (type === 'competing'){
        client.user.setActivity(`${status}`, {
          type: "COMPETING"
        });

      } else if (type != ['watching', 'listening', 'playing', 'streaming', 'competing']) {
        message.channel.send("Your type must be valid. The valid status types are as following:\n`watching, listening, playing, streaming, competing`. Please try again, but this time with valid input. Thank you")
      }
      */

    },
};