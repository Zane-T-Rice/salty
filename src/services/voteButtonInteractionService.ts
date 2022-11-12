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
import { Mutex } from "async-mutex";

export class VoteButtonInteractionService extends InteractionService {
  private memberInteractionMap: { [key: string]: boolean } = {};
  private voteCountMap: { [key: string]: number } = {};
  private mutex: Mutex = new Mutex();

  async handleInteraction(interaction: ButtonInteraction): Promise<void> {
    await this.mutex.runExclusive(async () => {
      const [name, buttonIndex, messageId, label, emoji, rowNumber] = interaction.customId.split(":");
      const voteCount = this.voteCountMap[interaction.customId] || 0;
      const buttons = interaction.message.components[rowNumber].components as ButtonBuilder[];
      const clickedButtonIndex = buttons.findIndex((component) => {
        return (component.data as APIButtonComponentWithCustomId).custom_id === interaction.customId;
      });
      const memberInteractionMapKey = `${interaction.member.user.id}:${buttonIndex}:${rowNumber}:${messageId}`;
      const newVoteCount = this.memberInteractionMap[memberInteractionMapKey] ? voteCount - 1 : voteCount + 1;
      this.memberInteractionMap[memberInteractionMapKey] = !this.memberInteractionMap[memberInteractionMapKey];
      this.voteCountMap[interaction.customId] = newVoteCount;
      const button = new ButtonBuilder()
        .setCustomId(`${name}:${buttonIndex}:${messageId}:${label}:${emoji}:${rowNumber}`)
        .setLabel(`${label} ${newVoteCount}`)
        .setStyle(ButtonStyle.Primary);
      if (emoji) button.setEmoji(emoji);
      buttons[clickedButtonIndex] = button;

      const interactionUpdateOptions: InteractionUpdateOptions = {
        components: interaction.message.components as ActionRow<MessageActionRowComponent>[],
      };

      await interaction.update(interactionUpdateOptions);
    });
  }
}
