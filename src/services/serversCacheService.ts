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
    if (!this.serversCache.createdAt || Date.now() - this.serversCache.createdAt > 60_000) {
      // If cache is more than 60 seconds old, refresh it.
      // This is just to prevent a user interacting with the autocomplete from triggering a bunch of API calls.
      const accessToken = await getAccessToken();

      // Now get all the servers
      const response = JSON.parse(
        (
          await exec(`curl --request GET \
            --url ${process.env.SERVER_MANAGER_SERVICE_URL}/users/servers?isUpdatable=true \
            --header 'Authorization: Bearer ${accessToken}'`)
        ).stdout
      );
      if (!(response instanceof Array)) throw new Error(); // The server returned an error response instead of an array of servers.
      const servers: Server[] = response;
      this.serversCache.servers = servers;
      this.serversCache.createdAt = Date.now();
    }
    const servers: Server[] = this.serversCache.servers;

    return servers;
  }
}
