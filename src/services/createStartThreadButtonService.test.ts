import { CreateStartThreadButtonService } from "./createStartThreadButtonService";
import { Message } from "discord.js";

describe("createStartThreadButtonService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const createStartThreadButtonService =
        new CreateStartThreadButtonService();
      expect(createStartThreadButtonService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should edit to message", () => {
      const message = {
        id: "testMessageId",
        channel: {
          id: "testChannelId",
        },
        edit: jest.fn(),
      } as unknown as Message;
      const createStartThreadButtonService =
        new CreateStartThreadButtonService();
      createStartThreadButtonService.handleMessage([], message);
      expect(message.edit).toHaveBeenCalledWith(
        expect.objectContaining({
          components: [
            expect.objectContaining({
              components: [
                expect.objectContaining({
                  customId: `startThread:${message.channel.id}:${message.id}`,
                  label: "Reply",
                  style: 1,
                  type: 2,
                }),
              ],
              type: 1,
            }),
          ],
        })
      );
    });
  });
});
