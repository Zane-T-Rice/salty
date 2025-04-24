import * as dotenv from "dotenv";
import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction } from "discord.js";
import { exec as exec2 } from "child_process";
import { getAccessToken } from "../utils";
import { InteractionService } from "./interactionService";
import { promisify } from "util";
const exec = promisify(exec2);
dotenv.config();

type Host = {
  id: string;
  name: string;
  url: string;
};

type Server = {
  id: string;
  applicationName: string;
  containerName: string;
};

export class UpdateServerService implements InteractionService {
  serversCache: { servers?: Server[]; createdAt?: number } = {};

  async handleInteraction(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    await interaction.deferReply({ ephemeral: true });
    const messages = [];
    const serverId: string = interaction.options.getString("name").trim();
    try {
      // call update server
      const accessToken = await getAccessToken();
      const server: Server = JSON.parse(
        (
          await exec(`curl --request POST \
          --url ${process.env.SERVER_MANAGER_SERVICE_URL}/servers/${serverId}/update/ \
          --header 'Content-Type: application/json' \
          --header 'Authorization: Bearer ${accessToken}' \
          --data '{}'
        `)
        ).stdout
      );

      // Tell user it has been done
      if (server.id) {
        messages.push(`The server ${server.applicationName}/${server.containerName} has been updated.`);
      } else {
        messages.push(`Make sure you select an option rather than typing in the name directly.`);
        messages.push(
          `If you did that, then the server may not be updateable or maybe it is taking a really long time to update.`
        );
        messages.push("This feature may not be available right now.");
      }
    } catch (e) {
      // Probably server-manager-service is down. Not sure what to do.
      messages.push("This feature is not available right now.");
    }

    await interaction.editReply({
      content: messages.join("\n"),
    });
  }

  async handleAutocomplete(interaction: AutocompleteInteraction): Promise<void> {
    const focusedValue = interaction.options.getFocused();
    const choices: { name: string; value: string }[] = [];
    try {
      if (!this.serversCache.createdAt || Date.now() - this.serversCache.createdAt > 5_000) {
        // If cache is more than 5 seconds old, refresh it.
        // This is just to prevent a user interacting with the autocomplete from triggering a bunch of API calls.
        const accessToken = await getAccessToken();

        // First, get all the hosts
        const response = JSON.parse(
          (
            await exec(`curl --request GET \
            --url ${process.env.SERVER_MANAGER_SERVICE_URL}/hosts \
            --header 'Authorization: Bearer ${accessToken}'`)
          ).stdout
        );
        if (!(response instanceof Array)) throw new Error(); // The server returned an error response instead of an array of hosts.
        const hosts: Host[] = response;

        // Now get all the servers on all the hosts
        const responsePromises = hosts.map(async (host) => {
          return JSON.parse(
            (
              await exec(`curl --request GET \
            --url ${process.env.SERVER_MANAGER_SERVICE_URL}/hosts/${host.id}/servers?isUpdatable=true \
            --header 'Authorization: Bearer ${accessToken}'`)
            ).stdout
          );
        });
        const responses = await Promise.all(responsePromises);
        responses.forEach((response) => {
          if (!(response instanceof Array)) throw new Error(); // The server returned an error response instead of an array of servers.
        });
        const servers: Server[] = (responses as Server[][]).reduce((a, b) => [...a, ...b]);
        this.serversCache.servers = servers;
        this.serversCache.createdAt = Date.now();
      }
      const servers: Server[] = this.serversCache.servers;
      choices.push(
        ...servers.map((server) => ({ name: `${server.applicationName}/${server.containerName}`, value: server.id }))
      );
    } catch (e) {
      // Probably server-manager-service is down. Not sure what to do.
      const message = "This feature is not available right now.";
      choices.push({ name: message, value: message });
    }
    const filtered = choices.filter((choice) => choice.name.startsWith(focusedValue)).slice(0, 25);
    await interaction.respond(filtered);
  }
}
