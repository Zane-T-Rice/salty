import { ButtonInteraction, InteractionUpdateOptions, MessageActionRowComponent, MessageButton } from "discord.js";
import { InteractionService } from "./interactionService";

export class VoteButtonInteractionService extends InteractionService {
  private memberInteractionMap = {};
  async handleInteraction(interaction: ButtonInteraction): Promise<void> {
    const components = interaction.message.components[0].components as MessageActionRowComponent[];
    const messageComponents = components.map((component) => {
      const [name, buttonIndex, messageId, label, emoji, voteCount] = component.customId.split(":");
      let newVoteCount = voteCount;
      if (component.customId === interaction.customId) {
        const memberInteractionMapKey = `${interaction.member.user.id}:${name}:${buttonIndex}:${messageId}:${label}`;
        if (this.memberInteractionMap[memberInteractionMapKey]) {
          newVoteCount = (parseInt(voteCount) - 1).toString();
          delete this.memberInteractionMap[memberInteractionMapKey];
        } else {
          newVoteCount = (parseInt(voteCount) + 1).toString();
          this.memberInteractionMap[memberInteractionMapKey] = 1;
        }
      }
      const button = new MessageButton()
        .setCustomId(`${name}:${buttonIndex}:${messageId}:${label}:${emoji}:${newVoteCount}`)
        .setLabel(`${label} ${newVoteCount}`)
        .setStyle("PRIMARY");
      if (emoji) button.setEmoji(emoji);
      return button;
    });

    const interactionUpdateOptions = {
      components: [
        {
          type: 1,
          components: messageComponents,
        },
      ],
    } as InteractionUpdateOptions;

    await interaction.update(interactionUpdateOptions);
  }
}
