import axios from "axios";

export abstract class DiscordApis {
  private baseUrl = "https://discordapp.com/api";

  public async gets(endpoint: string): Promise<Array<unknown>> {
    const headers = { Authorization: `Bot ${process.env.TOKEN}` };
    const result = await axios.get(this.baseUrl + endpoint, { headers });
    return result.data;
  }

  public async get(endpoint: string): Promise<unknown> {
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

  public async patch(endpoint: string, payload: unknown): Promise<unknown> {
    const headers = { Authorization: `Bot ${process.env.TOKEN}` };
    const result = await axios.patch(this.baseUrl + endpoint, payload, {
      headers,
    });
    return result.data;
  }
}
