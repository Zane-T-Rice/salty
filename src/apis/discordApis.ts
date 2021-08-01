import axios from "axios";

export abstract class DiscordApis {
  private baseUrl = "https://discordapp.com/api";

  public async get(endpoint: string): Promise<Array<unknown>> {
    const headers = { Authorization: `Bot ${process.env.TOKEN}` };
    const result = await axios.get(this.baseUrl + endpoint, { headers });
    return result.data;
  }

  public async post(endpoint: string, payload: unknown): Promise<unknown> {
    const headers = { Authorization: `Bot ${process.env.TOKEN}` };
    const result = await axios.post(this.baseUrl + endpoint, payload, {
      headers,
    });
    return result.data;
  }

  public async put(endpoint: string, payload: unknown): Promise<unknown> {
    const headers = { Authorization: `Bot ${process.env.TOKEN}` };
    const result = await axios.put(this.baseUrl + endpoint, payload, {
      headers,
    });
    return result.data;
  }
}
