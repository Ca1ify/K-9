const { SlashCommandBuilder } = require("discord.js");
const { Collection } = require("discord.js");

const cooldowns = new Collection();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vortex")
    .setDescription("Stare into the Untempered Schism"),
  async execute(interaction) {
    //cooldown
    const now = Date.now();
    const cooldownAmount = 15 * 1000;

    if (cooldowns.has(interaction.user.id)) {
      const expirationTime =
        cooldowns.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return interaction.reply(
          `Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before using the \`${
            interaction.commandName
          }\` command again.`,
          { ephemeral: true }
        );
      }
    }

    cooldowns.set(interaction.user.id, now);
    setTimeout(() => cooldowns.delete(interaction.user.id), cooldownAmount);
    // cooldown section ends here
    await interaction.deferReply();
    await interaction.editReply(
      "https://cdn.discordapp.com/attachments/1107372848097546341/1233867395555135529/vortex.mp4?ex=662ea80f&is=662d568f&hm=adfbb4407b3e570698b6ab1adfeb6f55f2572181d868a43e20f1d3e6a911a610&"
    );
  },
};
