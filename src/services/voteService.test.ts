import { Message } from "discord.js";
import { VoteService } from "./voteService";

describe("voteService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const voteService = new VoteService();
      expect(voteService).not.toBe(undefined);
    });
  });

  describe("handleMessage", () => {
    it("should reply with updated interaction", () => {
      const message = { reply: jest.fn(), id: "messageId" } as unknown as Message;
      const voteService = new VoteService();
      voteService.handleMessage(["!vote", "one", "|", "two", "|", "<:emoji:12345>"], message);
      expect(message.reply).toMatchInlineSnapshot(`
[MockFunction] {
  "calls": Array [
    Array [
      Object {
        "components": Array [
          Object {
            "components": Array [
              Object {
                "custom_id": "vote:0:messageId:one::0:0",
                "disabled": false,
                "emoji": null,
                "label": "one 0",
                "style": 1,
                "type": 2,
                "url": null,
              },
              Object {
                "custom_id": "vote:1:messageId:two::0:0",
                "disabled": false,
                "emoji": null,
                "label": "two 0",
                "style": 1,
                "type": 2,
                "url": null,
              },
              Object {
                "custom_id": "vote:2:messageId::12345:0:0",
                "disabled": false,
                "emoji": Object {
                  "animated": false,
                  "id": null,
                  "name": "12345",
                },
                "label": " 0",
                "style": 1,
                "type": 2,
                "url": null,
              },
            ],
            "type": 1,
          },
        ],
        "content": "Vote",
      },
    ],
  ],
  "results": Array [
    Object {
      "type": "return",
      "value": undefined,
    },
  ],
}
`);
    });
  });
});
