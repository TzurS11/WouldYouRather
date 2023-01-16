const { SlashCommandBuilder } = require("@discordjs/builders");
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
    .setName("question")
    .setDMPermission(true)
    .setDescription("Get a random would you rather question"),
  execute(interaction, client) {
    let question = db.getQuestion(db.getRandId());

    let questionEmbed = new EmbedBuilder().setTitle(question.text);
    let answers = db.getAnswers(question.ID);
    questionEmbed.addFields(
      {
        name: "First Option",
        value: `${answers.left} people`,
        inline: true,
      },
      {
        name: "Second Option",
        value: `${answers.right} people`,
        inline: true,
      }
    );
    let questionActionRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`rate ${question.ID} 0`)
        .setStyle(ButtonStyle.Danger)
        .setLabel("◄"),
      new ButtonBuilder()
        .setCustomId(`rate ${question.ID} 1`)
        .setStyle(ButtonStyle.Primary)
        .setLabel("►")
    );

    return interaction.reply({
      embeds: [questionEmbed],
      components: [questionActionRow],
    });
  },
};
