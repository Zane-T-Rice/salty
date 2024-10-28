import * as dotenv from "dotenv";
import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { exec as exec2 } from "child_process";
import { InteractionService } from "./interactionService";
import { promisify } from "util";
const exec = promisify(exec2);
dotenv.config();

type Server = {
  id: string;
  applicationName: string;
  containerName: string;
  createdAt: string;
  updatedAt: string;
};

export class RestartServerService implements InteractionService {
  async handleInteraction(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    await interaction.deferReply({ ephemeral: true });
    const messages = [];
    const serverId: string = interaction.options.getString("name")?.trim();
    try {
      // call restart server
      const server: Server = JSON.parse(
        (
          await exec(`curl --request POST \
          --url ${process.env.SERVER_MANAGER_SERVICE_URL}/servers/${serverId}/restart \
          --header 'Content-Type: application/json' \
          --data '{}'
        `)
        ).stdout
      );

      // Tell user it has been done
      if (server?.id) {
        messages.push(`The server ${server.applicationName}/${server.containerName} has been restarted.`);
      } else {
        messages.push(`Make sure you select an option rather than typing in the name directly.`);
        messages.push(
          `If you did that, then the server may not be restartable or maybe it is taking a really long time to restart.`
        );
        messages.push("This feature may not available right now.");
      }
    } catch (e) {
      // Probably server-manager-service is down. Not sure what to do.
      messages.push("This feature is not available right now. Sorry.");
    }

    await interaction.editReply({
      content: messages.join("\n"),
    });
  }

  async handleAutocomplete(interaction: AutocompleteInteraction): Promise<void> {
    const focusedValue = interaction.options.getFocused();
    const choices: { name: string; value: string }[] = [];
    try {
      const servers: Server[] = JSON.parse(
        (
          await exec(
            `curl --request GET --url ${process.env.SERVER_MANAGER_SERVICE_URL}/servers -H "Accept: application/json"`
          )
        ).stdout
      );
      choices.push(
        ...servers.map((server) => ({ name: `${server.applicationName}/${server.containerName}`, value: server.id }))
      );
    } catch (e) {
      // Probably server-manager-service is down. Not sure what to do.
      const message = "This feature is not available right now. Sorry.";
      choices.push({ name: message, value: message });
    }
    const filtered = choices.filter((choice) => choice.name.startsWith(focusedValue)).slice(0, 25);
    await interaction.respond(filtered);
  }
}