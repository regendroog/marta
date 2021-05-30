const fs = require('fs');
const Discord = require('discord.js');
require('discord-reply');
const { prefix, token, ownerID, PREFIX } = require('./config.json');
const { Op } = require('sequelize');
const { Users, CurrencyShop } = require('./dbObjects')
const currency = new Discord.Collection();
const Sequelize = require('sequelize');
const config = require('./config.json');

const client = new Discord.Client({ ws: { properties: { $browser: "Discord iOS" }} }) 
const disbut = require('discord-buttons')(client);
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

//command handler
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


//slash command handler
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

Reflect.defineProperty(currency, 'add', {
	/* eslint-disable-next-line func-name-matching */
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	/* eslint-disable-next-line func-name-matching */
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

client.once('ready', async () => {
	const storedBalances = await Users.findAll();
	storedBalances.forEach(b => currency.set(b.user_id, b));
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
	if (message.author.bot) return;
	currency.add(message.author.id, 1);

	if (!message.content.startsWith(PREFIX)) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

	if (command === 'balance') {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
	} else if (command === 'inventory') {
		const target = message.mentions.users.first() || message.author;
		const user = await Users.findOne({ where: { user_id: target.id } });
		const items = await user.getItems();

		if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		return message.channel.send(`${target.tag} currently has ${items.map(t => `${t.amount} ${t.item.name}`).join(', ')}`);
	} else if (command === 'transfer') {
		const currentAmount = currency.getBalance(message.author.id);
		const transferAmount = commandArgs.split(/ +/).find(arg => !/<@!?\d+>/.test(arg));
		const transferTarget = message.mentions.users.first();

		if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount`);
		if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author} you don't have that much.`);
		if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}`);

		currency.add(message.author.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
	} else if (command === 'buy') {
		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
		if (!item) return message.channel.send('That item doesn\'t exist.');
		if (item.cost > currency.getBalance(message.author.id)) {
			return message.channel.send(`You don't have enough currency, ${message.author}`);
		}

		const user = await Users.findOne({ where: { user_id: message.author.id } });
		currency.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You've bought a ${item.name}`);
	} else if (command === 'shop') {
		const items = await CurrencyShop.findAll();
		return message.channel.send(items.map(i => `${i.name}: ${i.cost}💰`).join('\n'), { code: true });
	} else if (command === 'leaderboard') {
		return message.channel.send(
			currency.sort((a, b) => b.balance - a.balance)
				.filter(user => client.users.cache.has(user.user_id))
				.first(10)
				.map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
				.join('\n'),
			{ code: true },
		);
	}
});





client.login(token);

