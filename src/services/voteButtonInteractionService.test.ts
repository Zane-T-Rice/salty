import { ButtonInteraction, Message } from "discord.js";
import { VoteButtonInteractionService } from "./voteButtonInteractionService";

describe("voteButtonInteractionService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const voteButtonInteractionService = new VoteButtonInteractionService();
      expect(voteButtonInteractionService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should update vote count", () => {
      const voteButtonInteractionService = new VoteButtonInteractionService();
      const buttonInteraction: ButtonInteraction = {
        customId: "voteButtonInteractionService:0:messageId:one:0",
        update: jest.fn(),
        member: {
          user: {
            id: "userId",
          },
        },
        message: {
          components: [
            {
              components: [
                {
                  customId: "voteButtonInteractionService:0:messageId:one:0",
                  label: "one 0",
                },
                {
                  customId: "voteButtonInteractionService:1:messageId:two:0",
                  label: "two 0",
                },
              ],
            },
          ],
        } as unknown as Message,
      } as unknown as ButtonInteraction;
      voteButtonInteractionService.handleInteraction(buttonInteraction);
      expect(buttonInteraction.update).toHaveBeenCalledWith({
        components: [
          {
            components: [
              { customId: "voteButtonInteractionService:0:messageId:one:1", label: "one 1", style: 1, type: 2 },
              { customId: "voteButtonInteractionService:1:messageId:two:0", label: "two 0", style: 1, type: 2 },
            ],
            type: 1,
          },
        ],
      });

      const buttonInteractionTwo: ButtonInteraction = {
        customId: "voteButtonInteractionService:0:messageId:one:1",
        update: jest.fn(),
        member: {
          user: {
            id: "userId",
          },
        },
        message: {
          components: [
            {
              components: [
                {
                  customId: "voteButtonInteractionService:0:messageId:one:1",
                  label: "one 1",
                },
                {
                  customId: "voteButtonInteractionService:1:messageId:two:0",
                  label: "two 0",
                },
              ],
            },
          ],
        } as unknown as Message,
      } as unknown as ButtonInteraction;
      voteButtonInteractionService.handleInteraction(buttonInteractionTwo);
      expect(buttonInteractionTwo.update).toHaveBeenCalledWith({
        components: [
          {
            components: [
              { customId: "voteButtonInteractionService:0:messageId:one:0", label: "one 0", style: 1, type: 2 },
              { customId: "voteButtonInteractionService:1:messageId:two:0", label: "two 0", style: 1, type: 2 },
            ],
            type: 1,
          },
        ],
      });

      const buttonInteractionThree: ButtonInteraction = {
        customId: "voteButtonInteractionService:0:messageId:one:1",
        update: jest.fn(),
        member: {
          user: {
            id: "userId2",
          },
        },
        message: {
          components: [
            {
              components: [
                {
                  customId: "voteButtonInteractionService:0:messageId:one:1",
                  label: "one 1",
                },
                {
                  customId: "voteButtonInteractionService:1:messageId:two:0",
                  label: "two 0",
                },
              ],
            },
          ],
        } as unknown as Message,
      } as unknown as ButtonInteraction;
      voteButtonInteractionService.handleInteraction(buttonInteractionThree);
      expect(buttonInteractionThree.update).toHaveBeenCalledWith({
        components: [
          {
            components: [
              { customId: "voteButtonInteractionService:0:messageId:one:2", label: "one 2", style: 1, type: 2 },
              { customId: "voteButtonInteractionService:1:messageId:two:0", label: "two 0", style: 1, type: 2 },
            ],
            type: 1,
          },
        ],
      });
    });
  });
});
