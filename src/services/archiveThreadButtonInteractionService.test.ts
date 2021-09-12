import { ButtonInteraction, ThreadChannel } from "discord.js";
import { ChannelResponse, Channels, Threads } from "../apis";
import { ArchiveThreadButtonInteractionService } from "./archiveThreadButtonInteractionService";

describe("archiveThreadButtonInteractionService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const archiveThreadButtonInteractionService = new ArchiveThreadButtonInteractionService(
        new Channels(),
        new Threads()
      );
      expect(archiveThreadButtonInteractionService).not.toBe(undefined);
    });
  });

  describe("handleInteraction", () => {
    const channels = new Channels();
    const threads = new Threads();
    const threadChannel = {
      id: "threadChannelId",
    } as ThreadChannel;
    const channelResponse = {
      thread_metadata: {
        archived: false,
      },
    } as ChannelResponse;
    threadChannel.send = jest.fn();

    beforeEach(() => {
      jest.resetAllMocks();
      jest.spyOn(threads, "archiveThread").mockResolvedValueOnce(threadChannel);
      jest.spyOn(threads, "unarchiveThread").mockResolvedValueOnce(threadChannel);
      jest.spyOn(channels, "getChannel").mockResolvedValueOnce(channelResponse);
    });

    it("should archive a thread that is unarchived", async () => {
      const channelId = "testId";
      const buttonInteraction = {
        customId: `archiveThreadButton:${channelId}`,
      } as ButtonInteraction;
      buttonInteraction.update = jest.fn();
      const archiveThreadButtonInteractionService = new ArchiveThreadButtonInteractionService(channels, threads);
      await archiveThreadButtonInteractionService.handleInteraction(buttonInteraction);
      expect(channels.getChannel).toHaveBeenCalledWith(channelId);
      expect(buttonInteraction.update).toHaveBeenCalledTimes(1);
      expect(threads.archiveThread).toHaveBeenCalledWith(channelId);
    });

    it("should unarchive a thread that is archived", async () => {
      jest
        .spyOn(channels, "getChannel")
        .mockReset()
        .mockResolvedValueOnce({
          thread_metadata: { archived: true },
        } as ChannelResponse);
      const channelId = "testId";
      const buttonInteraction = {
        customId: `archiveThreadButton:${channelId}`,
      } as ButtonInteraction;
      buttonInteraction.update = jest.fn();
      const archiveThreadButtonInteractionService = new ArchiveThreadButtonInteractionService(channels, threads);
      await archiveThreadButtonInteractionService.handleInteraction(buttonInteraction);
      expect(channels.getChannel).toHaveBeenCalledWith(channelId);
      expect(threads.unarchiveThread).toHaveBeenCalledWith(channelId);
      expect(buttonInteraction.update).toHaveBeenCalledTimes(1);
    });

    it("should do nothing if the channel is not a thread", async () => {
      jest
        .spyOn(channels, "getChannel")
        .mockReset()
        .mockResolvedValueOnce({} as ChannelResponse);
      const channelId = "testId";
      const buttonInteraction = {
        customId: `archiveThreadButton:${channelId}`,
      } as ButtonInteraction;
      buttonInteraction.update = jest.fn();
      const archiveThreadButtonInteractionService = new ArchiveThreadButtonInteractionService(channels, threads);
      await archiveThreadButtonInteractionService.handleInteraction(buttonInteraction);
      expect(channels.getChannel).toHaveBeenCalledWith(channelId);
      expect(threads.unarchiveThread).not.toHaveBeenCalled();
      expect(buttonInteraction.update).not.toHaveBeenCalled();
    });
  });
});
