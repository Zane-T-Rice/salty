import {
  ActionRow,
  APIButtonComponentWithCustomId,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  InteractionUpdateOptions,
  MessageActionRowComponent,
} from "discord.js";
import { InteractionService } from "./interactionService";

export class VoteButtonInteractionService extends InteractionService {
  private memberInteractionMap: { [key: string]: boolean } = {};
  async handleInteraction(interaction: ButtonInteraction): Promise<void> {
    const [name, buttonIndex, messageId, label, emoji, voteCount, rowNumber] = interaction.customId.split(":");
    const buttons = interaction.message.components[rowNumber].components as ButtonBuilder[];
    const clickedButtonIndex = buttons.findIndex((component) => {
      return (component.data as APIButtonComponentWithCustomId).custom_id === interaction.customId;
    });
    const memberInteractionMapKey = `${interaction.member.user.id}:${buttonIndex}:${rowNumber}:${messageId}`;
    const newVoteCount = this.memberInteractionMap[memberInteractionMapKey]
      ? (parseInt(voteCount) - 1).toString()
      : (parseInt(voteCount) + 1).toString();
    this.memberInteractionMap[memberInteractionMapKey] = !this.memberInteractionMap[memberInteractionMapKey];
    const button = new ButtonBuilder()
      .setCustomId(`${name}:${buttonIndex}:${messageId}:${label}:${emoji}:${newVoteCount}:${rowNumber}`)
      .setLabel(`${label} ${newVoteCount}`)
      .setStyle(ButtonStyle.Primary);
    if (emoji) button.setEmoji(emoji);
    buttons[clickedButtonIndex] = button;

    const interactionUpdateOptions: InteractionUpdateOptions = {
      components: interaction.message.components as ActionRow<MessageActionRowComponent>[],
    };

    await interaction.update(interactionUpdateOptions);
  }
}
