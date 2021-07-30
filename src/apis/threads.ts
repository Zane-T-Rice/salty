import axios from "axios";

export async function startThreadWithMessage(
  channelId: string,
  messageId: string,
  name: string
): Promise<void> {
  const headers = { Authorization: `Bot ${process.env.TOKEN}` };
  await axios.post(
    `https://discordapp.com/api/channels/${channelId}/messages/${messageId}/threads`,
    { name },
    { headers }
  );
}
