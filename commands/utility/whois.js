const Discord = require("discord.js")
const moment = require('moment');

module.exports = {
    name: 'whois',
    description: 'Get user information.',
    execute(message, args) {
        if (!message.mentions.users.size) {
            let userinfoget = message.guild.members.cache.get(args[0]) || message.guild.member(message.author)
                const avatarImagePng = message.author.displayAvatarURL({format:'png'}) + '?size=1024';
                const memberPermissions = userinfoget.permissions.toArray();
                const n = memberPermissions.toString();
                const q = n.replace(/_/g, " ");
                const z = q.replace(/,/g, ', ');
                const w = z.toLowerCase();
                const p = w.replace("add reactions, view audit log, ", "");
                const a = p.replace("create instant invite, ", "");
                const b = a.replace("priority speaker, ", "");
                const c = b.replace("stream, ", "");
                const e = c.replace("view channel, ", "");
                const f = e.replace("send messages, ", "");
                const g = f.replace("send tts messages, ", "");
                const h = g.replace("embed links, ", "");
                const i = h.replace("attach files, ", "");
                const j = i.replace("read message history, ", "");
                const k = j.replace("use external emojis, ", "");
                const l = k.replace("view guild insights, ", "");
                const m = l.replace("connect, ", "");
                const u = m.replace("speak, ", "");
                const o = u.replace("mute members, ", "");
                const r = o.replace("deafen members, ", "");
                const s = r.replace("move members, ", "");
                const t = s.replace("use vad, ", "");
                const x = t.replace("change nickname, ", "");
                const ab = x.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());				
                const embed = new Discord.MessageEmbed()
                .setDescription(`<@${userinfoget.id}>`)
                .setAuthor(`${message.author.tag}`, `${avatarImagePng}`)
                .setColor("#992D22")
                .setThumbnail(avatarImagePng)                
                .addField("Joined",
                `${moment(userinfoget.user.joinedAt).format('llll')}`,
                true)
                .addField("Registered",
                `${moment(userinfoget.user.createdAt).format('llll')}`,
                true)
                .addField(`Roles [${userinfoget.roles.cache.size - 1}]`,
                userinfoget.roles.cache.map(r => `${r}`).join(' '),   
                false)
                .addField("Key Permissions",
                ab,
                false)
                .setFooter(`ID: ${message.author.id}`)
                .setTimestamp()
                message.channel.send({embed});
        } else if (message.mentions.users.size === 1) {
            const target = message.mentions.users.first()		
            message.mentions.users.map(user => {
                let userinfoget = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.member(message.author)
                const avatarImagePngUser = user.displayAvatarURL({format:'png'}) + '?size=1024';
                const memberPermissions = userinfoget.permissions.toArray();
                const n = memberPermissions.toString();
                const q = n.replace(/_/g, " ");
                const z = q.replace(/,/g, ', ');
                const w = z.toLowerCase();
                const p = w.replace("add reactions, view audit log, ", "");
                const a = p.replace("create instant invite, ", "");
                const b = a.replace("priority speaker, ", "");
                const c = b.replace("stream, ", "");
                const e = c.replace("view channel, ", "");
                const f = e.replace("send messages, ", "");
                const g = f.replace("send tts messages, ", "");
                const h = g.replace("embed links, ", "");
                const i = h.replace("attach files, ", "");
                const j = i.replace("read message history, ", "");
                const k = j.replace("use external emojis, ", "");
                const l = k.replace("view guild insights, ", "");
                const m = l.replace("connect, ", "");
                const u = m.replace("speak, ", "");
                const o = u.replace("mute members, ", "");
                const r = o.replace("deafen members, ", "");
                const s = r.replace("move members, ", "");
                const t = s.replace("use vad, ", "");
                const x = t.replace("change nickname, ", "");
                const ab = x.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());				
                const embed = new Discord.MessageEmbed()
                .setDescription(`<@${userinfoget.id}>`)
                .setAuthor(`${target.tag}`, `${avatarImagePngUser}`)
                .setColor("#992D22")
                .setThumbnail(avatarImagePngUser)
                .addField("Joined",
                `${moment(userinfoget.user.joinedAt).format('llll')}`,
                true)
                .addField("Registered",
                `${moment(userinfoget.user.createdAt).format('llll')}`,
                true)
                .addField(`Roles [${userinfoget.roles.cache.size - 1}]`,
                userinfoget.roles.cache.map(r => `${r}`).join(' '),   
                false)
                .addField("Key Permissions",
                ab,
                false)
                .setFooter(`ID: ${user.id}`)
                .setTimestamp()
                message.channel.send({embed});
            });		
        } else if (message.mentions.users.size > 1) {
            message.lineReplyNoMention("Please only mention one person.")
        }
    },
};	