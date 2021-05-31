const Discord = require("discord.js")
const moment = require('moment');

const filterLevels = {
        DISABLED: 'Off',
        MEMBERS_WITHOUT_ROLES: 'No Role',
        ALL_MEMBERS: 'Everyone'
};
    
const verificationLevels = {
        NONE: 'None',
        LOW: 'Low',
        MEDIUM: 'Medium',
        HIGH: '(╯°□°）╯︵ ┻━┻',
        VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
    
const regions = {
        brazil: 'Brazil',
        europe: 'Europe',
        hongkong: 'Hong Kong',
        india: 'India',
        japan: 'Japan',
        russia: 'Russia',
        singapore: 'Singapore',
        southafrica: 'South Africa',
        sydeny: 'Sydeny',
        'us-central': 'US Central',
        'us-east': 'US East',
        'us-west': 'US West',
        'us-south': 'US South'
};

module.exports = {
	name: 'serverinfo',
	description: 'Display info about this server.',
	async execute(message, args) {
                const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
                const members = message.guild.members.cache;
                const channels = message.guild.channels.cache;
                const emojis = message.guild.emojis.cache;

                const embed = new Discord.MessageEmbed()
                .setColor("#992D22")
                .setDescription(`**Server Info**`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setTimestamp()
                .addField('__General__', [  
                        `**Name:** ${message.guild.name}`,
                        `**ID:** ${message.guild.id}`,
                        `**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
                        `**Region:** ${regions[message.guild.region]}`,
                        `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                        `**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                        `**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                        `**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]`,
                        '\u200b', 
                        true
                ])
                .addField('__Presence__', [
                        `**Online:** ${members.filter(member => member.presence.status === 'online').size}`,
                        `**Idle:** ${members.filter(member => member.presence.status === 'idle').size}`,
                        `**Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`,
                        `**Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
                        '\u200b', 
                        true
                ])
                .addField(`__Roles__ [${roles.length - 1}]`, roles.join(', '), true)
                message.channel.send({embed});
	},
};