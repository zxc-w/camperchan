import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";

import { Command } from "../interfaces/Command";
import { Subcommand } from "../interfaces/Subcommand";
import { errorHandler } from "../utils/errorHandler";

import { handleCodeOfConduct } from "./subcommands/community/handleCodeOfConduct";
import { handleContribute } from "./subcommands/community/handleContribute";
import { handleForum } from "./subcommands/community/handleForum";
import { handleLeaderboard } from "./subcommands/community/handleLeaderboard";
import { handleProfile } from "./subcommands/community/handleProfile";
import { handleQuote } from "./subcommands/community/handleQuote";
import { handleTruism } from "./subcommands/community/handleTruism";

const handlers: { [key: string]: Subcommand } = {
  "code-of-conduct": handleCodeOfConduct,
  contribute: handleContribute,
  forum: handleForum,
  leaderboard: handleLeaderboard,
  quote: handleQuote,
  profile: handleProfile,
  truism: handleTruism
};

export const community: Command = {
  data: new SlashCommandBuilder()
    .setName("community")
    .setDescription("Commands related to our community.")
    .setDMPermission(false)
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("code-of-conduct")
        .setDescription(
          "Returns information on freeCodeCamp's Code of Conduct."
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("contribute")
        .setDescription(
          "Returns helpful links for folks interested in contributing."
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("forum")
        .setDescription("Returns the latest activity on the forum.")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("leaderboard")
        .setDescription("View the server leaderboard.")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("quote")
        .setDescription("Returns a motivational quote.")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("profile")
        .setDescription("See your community profile.")
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("truism")
        .setDescription(
          "Provides a random difficult-to-swallow truth about coding."
        )
    ),
  run: async (CamperChan, interaction) => {
    try {
      const handler = handlers[interaction.options.getSubcommand(true)];
      if (!handler) {
        await interaction.reply("Invalid subcommand.");
        return;
      }
      if (!handler.permissionValidator(interaction.member)) {
        await interaction.reply("You do not have permission to do this.");
        return;
      }
      await handler.execute(CamperChan, interaction);
    } catch (err) {
      await errorHandler(CamperChan, "community command", err);
    }
  }
};
