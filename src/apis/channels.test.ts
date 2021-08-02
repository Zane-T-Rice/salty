import { Channels } from "./channels";

const channels = new Channels();

describe("Channels", () => {
  describe("getChannel", () => {
    it("should call axios.get", async () => {
      const channelId = "channelId";
      jest.spyOn(channels, "get").mockResolvedValueOnce(undefined);
      await channels.getChannel(channelId);
      expect(channels.get).toBeCalledWith(`/channels/${channelId}`);
    });
  });
});
