const fs = require("fs");
const {
  Client,
  Collection,
  messageLink,
  Partials,
  ChannelType,
  Status,
  ActivityType,
} = require("discord.js");
const client = new Client({
  intents: 32269,
  partials: [Partials.Channel, Partials.Message],
});
require("dotenv").config();

client.aliases = new Collection();
client.interactions = new Collection();

fs.readdir("./events/", (err, files) => {
  const eventHandler = require("./handler/eventHandler");
  eventHandler(err, files, client);
});

const db = require("./database/index.js");

client.on("interactionCreate", (interaction) => {
  if (!interaction.isButton()) return;
  let args = interaction.customId.split(" ");
  if (args[0] == "rate") {
    db.setAnswer(interaction.user.id, args[1], Number(args[2]));
    return interaction.reply({
      content: "Answer went through successfully!",
      ephemeral: true,
    });
  }
});

function removeFirstWord(str) {
  const indexOfSpace = str.indexOf(" ");

  if (indexOfSpace === -1) {
    return "";
  }

  return str.slice(indexOfSpace + 1);
}

client.on("messageCreate", (message) => {
  if (
    message.channel.type == ChannelType.DM &&
    message.author.id == "474645781786263552" &&
    message.content.split(" ")[0] == "!add"
  ) {
    let content = removeFirstWord(message.content);
    message.reply(`**Added question: **${content}`);
    return db.addQuestion(content);
  }
});

client.once("ready", () => {
  client.user.setPresence({
    status: "online",
    activities: [{ name: "Would You Rather", type: ActivityType.Playing }],
  });
});

client.login(process.env.DISCORD_TOKEN);
