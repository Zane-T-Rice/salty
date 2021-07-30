import { PingController } from "./controllers";
import { Message } from "discord.js";
import { routeMessage } from "./router";

jest.mock("./controllers");
const pingControllerInstance = (PingController as any).mock.instances[0];

beforeEach(() => {
  pingControllerInstance.handleMessage.mockClear();
});

describe("router", () => {
  describe("routeMessage", () => {
    it("should route ping messages", async () => {
      const content = "!ping";
      await routeMessage({ content } as Message);

      expect(pingControllerInstance.handleMessage).toHaveBeenCalledWith(
        [content],
        { content }
      );
    });

    it("should handle messages that are not commands", async () => {
      const content = "!notacommand";
      await routeMessage({ content } as Message);

      expect(pingControllerInstance.handleMessage).not.toHaveBeenCalled();
    });

    it("should ignore bot messages", async () => {
      const content = "!ping";
      const author = { bot: true };
      await routeMessage({ content, author } as Message);

      expect(pingControllerInstance.handleMessage).not.toHaveBeenCalled();
    });
  });
});
