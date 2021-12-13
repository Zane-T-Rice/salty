import { ButtonInteraction, InteractionUpdateOptions, MessageActionRowComponent } from "discord.js";
import { InteractionService } from "./interactionService";

export class VoteButtonInteractionService extends InteractionService {
  private memberInteractionMap = {};
  async handleInteraction(interaction: ButtonInteraction): Promise<void> {
    const components = interaction.message.components[0].components as MessageActionRowComponent[];
    const messageComponents = components.map((component) => {
      let [name, buttonIndex, messageId, label, voteCount] = component.customId.split(":");
      if (component.customId === interaction.customId) {
        const memberInteractionMapKey = `${interaction.member.user.id}:${name}:${buttonIndex}:${messageId}:${label}`;
        if (this.memberInteractionMap[memberInteractionMapKey]) {
          voteCount = (parseInt(voteCount) - 1).toString();
          delete this.memberInteractionMap[memberInteractionMapKey];
        } else {
          voteCount = (parseInt(voteCount) + 1).toString();
          this.memberInteractionMap[memberInteractionMapKey] = 1;
        }
      }
      return {
        customId: `${name}:${buttonIndex}:${messageId}:${label}:${voteCount}`,
        label: `${label} ${voteCount}`,
        style: 1,
        type: 2,
      };
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
