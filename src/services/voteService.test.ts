import { createInteraction } from "../testUtils";
import { VoteService } from "./voteService";

describe("voteService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const voteService = new VoteService();
      expect(voteService).not.toBe(undefined);
    });
  });

  describe("handleInteraction", () => {
    it("should reply with updated interaction", () => {
      const voteService = new VoteService();
      const interaction = createInteraction({ args: "one|two|<:emoji:12345>" }, { id: "messageId" });
      voteService.handleInteraction(interaction);
      expect(interaction.reply).toMatchInlineSnapshot(`
        [MockFunction] {
          "calls": [
            [
              {
                "components": [
                  {
                    "components": [
                      {
                        "custom_id": "vote:0:messageId:one::0",
                        "emoji": undefined,
                        "label": "one 0",
                        "style": 1,
                        "type": 2,
                      },
                      {
                        "custom_id": "vote:1:messageId:two::0",
                        "emoji": undefined,
                        "label": "two 0",
                        "style": 1,
                        "type": 2,
                      },
                      {
                        "custom_id": "vote:2:messageId::12345:0",
                        "emoji": {
                          "animated": false,
                          "id": undefined,
                          "name": "12345",
                        },
                        "label": " 0",
                        "style": 1,
                        "type": 2,
                      },
                    ],
                    "type": 1,
                  },
                ],
                "content": "Vote",
              },
            ],
          ],
          "results": [
            {
              "type": "return",
              "value": undefined,
            },
          ],
        }
      `);
    });
  });
});
