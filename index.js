const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token, ownerID } = require('./config.json');
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


//slash command
client.once('ready', async () => {
  console.log(`\nLogged in : ${client.user.tag}\n`)

  try {
    fs.readdirSync('./slash').forEach(dir => {
      const commandFiles = fs.readdirSync(`./slash/${dir}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`./slash/${dir}/${file}`);
        client.api.applications(client.user.id).guilds(config.guildID).commands.post({
          data: {
            name: command.name,
            description: command.description,
            options: command.commandOptions
          }
        })
        if (command.global == true) {
          client.api.applications(client.user.id).commands.post({
            data: {
              name: command.name,
              description: command.description,
              options: command.commandOptions
            }
          })
        }

        client.commands.set(command.name, command);
        console.log(`Command POST : ${command.name} from ${file} (${command.global ? "global" : "guild"})`)
      }
      console.log("")
    })
  } catch (error) { console.log(error) }
  let cmdArrGlobal = await client.api.applications(client.user.id).commands.get()
  let cmdArrGuild = await client.api.applications(client.user.id).guilds(config.guildID).commands.get()
  cmdArrGlobal.forEach(element => {
    console.log("Global command loaded : " + element.name + " (" + element.id + ")")
  });
  console.log("")
  cmdArrGuild.forEach(element => {
    console.log("Guild command loaded : " + element.name + " (" + element.id + ")")
  });
  console.log("")
});


client.ws.on('INTERACTION_CREATE', async interaction => {

  if (!client.commands.has(interaction.data.name)) return;

  try {
    client.commands.get(interaction.data.name).execute(interaction, client);
  } catch (error) {
    console.log(`Error from command ${interaction.data.name} : ${error.message}`);
    console.log(`${error.stack}\n`)
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          content: `Sorry, there was an error executing that command!`
        }
      }
    })
  }

})


client.login(token);