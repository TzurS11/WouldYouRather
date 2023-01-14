const { SlashCommandBuilder, messageLink } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Emoji,
} = require("discord.js");

const db = require("../database/index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggest")

    .setDMPermission(true)
    .setDescription("Suggest a Would you rather question.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Would you rather...")
        .setRequired(true)
    ),
  execute(interaction, client) {
    let question = interaction.options.getString("question");

    let questionEmbed = new EmbedBuilder()
      .setTitle(question)
      .setDescription(
        `Requested by: <@${interaction.user.id}> (${interaction.user.id})`
      );

    client.users.fetch("474645781786263552").then((dm) => {
      dm.send({ embeds: [questionEmbed] });
    });

    interaction.reply({ content: "Suggested the question!", ephemeral: true });
  },
};
