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
        customId: "voteButtonInteractionService:0:messageId:one::0:0",
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
                  data: {
                    custom_id: "voteButtonInteractionService:0:messageId:one::0:0",
                  },
                  label: "one 0",
                },
                {
                  data: {
                    custom_id: "voteButtonInteractionService:1:messageId:two::0:0",
                  },
                  label: "two 0",
                },
              ],
            },
          ],
        } as unknown as Message,
      } as unknown as ButtonInteraction;
      voteButtonInteractionService.handleInteraction(buttonInteraction);
      expect(buttonInteraction.update).toMatchInlineSnapshot(`
        [MockFunction] {
          "calls": Array [
            Array [
              Object {
                "components": Array [
                  Object {
                    "components": Array [
                      Object {
                        "custom_id": "voteButtonInteractionService:0:messageId:one::1:0",
                        "emoji": undefined,
                        "label": "one 1",
                        "style": 1,
                        "type": 2,
                      },
                      Object {
                        "data": Object {
                          "custom_id": "voteButtonInteractionService:1:messageId:two::0:0",
                        },
                        "label": "two 0",
                      },
                    ],
                  },
                ],
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

      const buttonInteractionTwo: ButtonInteraction = {
        customId: "voteButtonInteractionService:0:messageId:one::1:0",
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
                  data: {
                    custom_id: "voteButtonInteractionService:0:messageId:one::1:0",
                  },
                  label: "one 1",
                },
                {
                  data: {
                    custom_id: "voteButtonInteractionService:1:messageId:two::0:0",
                  },
                  label: "two 0",
                },
              ],
            },
          ],
        } as unknown as Message,
      } as unknown as ButtonInteraction;
      voteButtonInteractionService.handleInteraction(buttonInteractionTwo);
      expect(buttonInteractionTwo.update).toMatchInlineSnapshot(`
        [MockFunction] {
          "calls": Array [
            Array [
              Object {
                "components": Array [
                  Object {
                    "components": Array [
                      Object {
                        "custom_id": "voteButtonInteractionService:0:messageId:one::0:0",
                        "emoji": undefined,
                        "label": "one 0",
                        "style": 1,
                        "type": 2,
                      },
                      Object {
                        "data": Object {
                          "custom_id": "voteButtonInteractionService:1:messageId:two::0:0",
                        },
                        "label": "two 0",
                      },
                    ],
                  },
                ],
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

      const buttonInteractionThree: ButtonInteraction = {
        customId: "voteButtonInteractionService:0:messageId:one::1:0",
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
                  data: {
                    custom_id: "voteButtonInteractionService:0:messageId:one::1:0",
                  },
                  label: "one 1",
                },
                {
                  data: {
                    custom_id: "voteButtonInteractionService:1:messageId:two::0:0",
                  },
                  label: "two 0",
                },
              ],
            },
          ],
        } as unknown as Message,
      } as unknown as ButtonInteraction;
      voteButtonInteractionService.handleInteraction(buttonInteractionThree);
      expect(buttonInteractionThree.update).toMatchInlineSnapshot(`
        [MockFunction] {
          "calls": Array [
            Array [
              Object {
                "components": Array [
                  Object {
                    "components": Array [
                      Object {
                        "custom_id": "voteButtonInteractionService:0:messageId:one::2:0",
                        "emoji": undefined,
                        "label": "one 2",
                        "style": 1,
                        "type": 2,
                      },
                      Object {
                        "data": Object {
                          "custom_id": "voteButtonInteractionService:1:messageId:two::0:0",
                        },
                        "label": "two 0",
                      },
                    ],
                  },
                ],
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
  it("update should work with emoji", () => {
    const voteButtonInteractionService = new VoteButtonInteractionService();
    const buttonInteraction: ButtonInteraction = {
      customId: "voteButtonInteractionService:0:messageId::12345:0:0",
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
                data: {
                  custom_id: "voteButtonInteractionService:0:messageId::12345:0:0",
                },
                label: "one 0",
              },
              {
                data: {
                  custom_id: "voteButtonInteractionService:1:messageId::1234556:0:0",
                },
                label: "two 0",
              },
            ],
          },
        ],
      } as unknown as Message,
    } as unknown as ButtonInteraction;
    voteButtonInteractionService.handleInteraction(buttonInteraction);
    expect(buttonInteraction.update).toMatchInlineSnapshot(`
      [MockFunction] {
        "calls": Array [
          Array [
            Object {
              "components": Array [
                Object {
                  "components": Array [
                    Object {
                      "custom_id": "voteButtonInteractionService:0:messageId::12345:1:0",
                      "emoji": Object {
                        "animated": false,
                        "id": undefined,
                        "name": "12345",
                      },
                      "label": " 1",
                      "style": 1,
                      "type": 2,
                    },
                    Object {
                      "data": Object {
                        "custom_id": "voteButtonInteractionService:1:messageId::1234556:0:0",
                      },
                      "label": "two 0",
                    },
                  ],
                },
              ],
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
