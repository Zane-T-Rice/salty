import { ButtonInteraction, InteractionUpdateOptions, MessageActionRow, MessageButton } from "discord.js";
import { InteractionService } from "./interactionService";

export class VoteButtonInteractionService extends InteractionService {
  private memberInteractionMap = {};
  async handleInteraction(interaction: ButtonInteraction): Promise<void> {
    const buttons = interaction.message.components[0].components as MessageButton[];
    const clickedButtonIndex = buttons.findIndex((component) => {
      return component.customId === interaction.customId;
    });
    const [name, buttonIndex, messageId, label, emoji, voteCount] = buttons[clickedButtonIndex].customId.split(":");
    const memberInteractionMapKey = `${interaction.member.user.id}:${buttonIndex}:${messageId}`;
    const newVoteCount = this.memberInteractionMap[memberInteractionMapKey]
      ? (parseInt(voteCount) - 1).toString()
      : (parseInt(voteCount) + 1).toString();
    this.memberInteractionMap[memberInteractionMapKey] = !this.memberInteractionMap[memberInteractionMapKey];
    const button = new MessageButton()
      .setCustomId(`${name}:${buttonIndex}:${messageId}:${label}:${emoji}:${newVoteCount}`)
      .setLabel(`${label} ${newVoteCount}`)
      .setStyle("PRIMARY");
    if (emoji) button.setEmoji(emoji);
    buttons[clickedButtonIndex] = button;

    const interactionUpdateOptions: InteractionUpdateOptions = {
      components: interaction.message.components as MessageActionRow[],
    };

    await interaction.update(interactionUpdateOptions);
  }
}
