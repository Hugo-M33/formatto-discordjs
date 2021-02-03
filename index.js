const dotenv = require("dotenv");
dotenv.config();
const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Bot Online");
});

let interactiveModeUsers = [];

client.on("message", (message) => {
  if (message.content.startsWith("%")) {
    const content = message.content.slice("%".length).trim().split(" ");
    const command = content.shift().toLowerCase();
    switch (command) {
      case "ptdrtki":
        presentation(message);
        break;
      case "interactive":
        interactiveMode(message);
        break;
      case "quit":
          quitInteractiveMode(message.author, message.channel);
          break;
      case "test":
        content.forEach((element) => {
          message.channel.send(element);
        });
        break;
    }
  }
});

const presentation = (message) => {
  const _presentation = new Discord.MessageEmbed()
    .setColor("#78A5BE")
    .setTitle("Formatto")
    .setURL("https://www.hugo-martin.me")
    .setAuthor(
      "Hugo Martin",
      "https://cdn.discordapp.com/avatars/286869385979887616/6560e420d520dcdeb30b77301a740f7c.png",
      "https://github.com/Hugo-M33/formatto-discordjs"
    )
    .setDescription(
      "Formatto est un bot qui servira à créer des cartes comme celle-ci pour les utilisateurs, afin de distinguer ce qui est important de ce qui ne l'est pas"
    )
    .setThumbnail(
      "https://cdn.discordapp.com/avatars/286869385979887616/6560e420d520dcdeb30b77301a740f7c.png"
    )

    .addField("En réponse à", message.author.toString(), true)
    .addField("Début du projet", "3/02/2021", true)
    .setImage(message.author.displayAvatarURL())
    .setTimestamp();

  message.channel.send(_presentation);
};

const interactiveMode = (message) => {
  if (
    interactiveModeUsers.find((user) => user.author === message.author && user.channel === message.channel) ===
    undefined
  ) {
    message.channel.send("Mode interactif ! \`%quit\` pour quitter à tout moment");
    interactiveModeUsers.push({
      author: message.author,
      channel: message.channel,
      state: {},
    });
  } else {
    message.channel.send("Déjà en mode interactif !");
  }
};

const quitInteractiveMode = (author, channel) => {
  if (
    interactiveModeUsers.find((user) => user.author === author && user.channel === channel) ===
    undefined
  ) {
      channel.send("Vous n'êtes pas en mode interactif dans ce channel");
    } else {
        channel.send("Vous quittez le monde interactif dans le channel " + channel.toString());
        interactiveModeUsers = interactiveModeUsers.filter(user => user.author !== author || user.channel !== channel);      
    }
};

client.login(process.env.TOKEN);
