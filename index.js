const dotenv = require("dotenv");
dotenv.config();
const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("Bot Online");
});
const reactionEmojis = [
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "🛑",
];
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
      default:
      //readInteractiveInput(message);
      //break;
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
    interactiveModeUsers.find(
      (user) =>
        user.author === message.author && user.channel === message.channel
    ) === undefined
  ) {
    const interactiveModeStart = new Discord.MessageEmbed()
      .setColor("#78A5BE")
      .setTitle("Mode Interactif")
      .setURL("https://discord.js.org/")
      .setAuthor(
        message.author.toString(),
        message.author.displayAvatarURL(),
        "https://discord.js.org"
      )
      .setDescription("Pour quitter, écrivez ```yaml\n%quit\n```")
      .setThumbnail("https://image.flaticon.com/icons/png/512/40/40031.png")
      .addFields(
        { name: "1️⃣", value: "Régler le titre" },
        { name: "2️⃣", value: "Régler le sous-titre" },
        { name: "3️⃣", value: "Régler l'auteur", inline: true },
        { name: "4️⃣", value: "Régler image de l'auteur", inline: true },
        { name: "5️⃣", value: "Régler la miniature" },
        { name: "6️⃣", value: "Régler le bas de page", inline: true },
        { name: "7️⃣", value: "Régler la couleur", inline: true },
        { name: "8️⃣", value: "Insérer un champ", inline: true },
        { name: "9️⃣", value: "Insérer une image", inline: true }
      )
      .setTimestamp()
      .setFooter(
        "Réagissez avec l'emoji correspondant",
        message.author.displayAvatarURL()
      );
    message.channel.send(interactiveModeStart).then((sentMsg) => {
      sentMsg.react("1️⃣");
      sentMsg.react("2️⃣");
      sentMsg.react("3️⃣");
      sentMsg.react("4️⃣");
      sentMsg.react("5️⃣");
      sentMsg.react("6️⃣");
      sentMsg.react("7️⃣");
      sentMsg.react("8️⃣");
      sentMsg.react("9️⃣");
      sentMsg.react("🛑");
      interactiveModeUsers.push({
        author: message.author,
        channel: message.channel,
        state: {
          currentState: "awaitingReact",
          trackedMessage: sentMsg,
          definedElements: [],
        },
      });
    });
  } else {
    message.channel.send("Déjà en mode interactif !");
  }
};

client.on("messageReactionAdd", (reaction, reactingUser) => {
  if (
    reactionEmojis.includes(reaction.emoji.toString()) &&
    interactiveModeUsers.find(
      (user) =>
        reaction.message === user.state.trackedMessage &&
        user.author === reactingUser
    ) !== undefined
  ) {
    switch (reaction.emoji.toString()) {
      case "1️⃣":
        const titleParsingQuery = new Discord.MessageEmbed()
          .setColor("#78A5BE")
          .setTitle("Title setting")
          .setDescription("Ecrivez votre Titre");
        interactiveModeUsers.map((user) => {
          if (
            reaction.message === user.state.trackedMessage &&
            user.author === reactingUser
          ) {
            user.state.currentState = "awaitingTitle";
          }
          reaction.message.delete();
          reaction.message.channel.send(
            titleParsingQuery
          );
        });
        break;
      case "2️⃣":
        reaction.message.channel.send("action 2 🤡🤡🤡");
        break;
      case "9️⃣":
        reaction.message.channel.send(
          `Look at me ! I'm ${reactingUser.toString()}, and I'm so special I chose option ${reaction.emoji.toString()}`
        );
        break;
      case "🛑":
        reaction.message.delete({ reason: "Action 1" });
        quitInteractiveMode(reactingUser, reaction.message.channel);
        break;
    }
  } else {
  }
});

const quitInteractiveMode = (author, channel) => {
  if (
    interactiveModeUsers.find(
      (user) => user.author === author && user.channel === channel
    ) === undefined
  ) {
    channel.send(
      `Vous n'êtes pas en mode interactif dans ${channel.toString()}`
    );
  } else {
    channel.send(`Vous quittez le monde interactif dans ${channel.toString()}`);
    interactiveModeUsers = interactiveModeUsers.filter(
      (user) => user.author !== author || user.channel !== channel
    );
  }
};

const readInteractiveInput = (message) => {};

client.login(process.env.TOKEN);
