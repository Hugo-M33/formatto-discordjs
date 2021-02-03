const dotenv = require('dotenv');
dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Bot Online');
});

client.on('message', message => {
    if (!message.author.bot ) {
    message.channel.send(`\`\`\`${message.content}\`\`\`  ${message.author}`);
    }
});

client.login(process.env.TOKEN);