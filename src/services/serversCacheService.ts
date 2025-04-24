import * as dotenv from "dotenv";
import { exec as exec2 } from "child_process";
import { getAccessToken } from "../utils";
import { promisify } from "util";
const exec = promisify(exec2);
dotenv.config();

export type Host = {
  id: string;
  name: string;
  url: string;
};

export type Server = {
  id: string;
  hostId: string;
  applicationName: string;
  containerName: string;
};

export class ServersCacheService {
  serversCache: { servers?: Server[]; createdAt?: number } = {};

  async getServers(): Promise<Server[]> {
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

    return servers;
  }
}
