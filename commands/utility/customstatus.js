module.exports = {
	name: 'status',
	description: 'Change the status',
    usage: '[command name]',
    args: true,
	execute(message, args) {

        let statusdis = args[0]
        let namedis = args[1];
        let typedis = args[2].toUpperCase();

        let okstatus = [
            "dnd", 
            "online", 
            "idle"
        ];

       

        for (status in okstatus) {
            if (okstatus.hasOwnProperty(status)) {
                return message.channel.send("Status name too long.");
            } 
        }
        

        if (typedis == 'STREAMING') {
            let namedisstream = args[0]
            let username = args[1]
            message.client.user.setPresence({               
                activity: {
                    name: `${namedisstream}`,
                    type: "STREAMING",
                    url: `https://www.twitch.tv/${username}`
                }
            });
        } else if (typedis == 'WATCHING') {
            message.client.user.setPresence({ 
                status: `${statusdis}`,
                activity: {
                    name: `${namedis}`,
                    type: "WATCHING" 
                }
            });
        } else if (typedis == 'PLAYING') {
            message.client.user.setPresence({ 
                status: `${statusdis}`,
                activity: {
                    name: `${namedis}`,
                    type: "PLAYING" 
                }
            });
        } else if (typedis == 'COMPETING') {
            message.client.user.setPresence({ 
                status: `${statusdis}`,
                activity: {
                    name: `${namedis}`,
                    type: "COMPETING" 
                }
            });
        } else if (typedis == 'LISTENING') {
            message.client.user.setPresence({ 
                status: `${statusdis}`,
                activity: {
                    name: `${namedis}`,
                    type: "LISTENING" 
                }
            });
        }   
	},  
};
/*
if (namedis.length > 20) {
    return message.channel.send("Status name too long.");
}
*/