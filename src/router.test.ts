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
    it("should route ping messages", () => {
      const content = "!ping";
      routeMessage({ content } as Message);

      expect(pingControllerInstance.handleMessage).toHaveBeenCalledWith(
        [content],
        { content }
      );
    });

    it("should handle messages that are not commands", () => {
      const content = "!notacommand";
      routeMessage({ content } as Message);

      expect(pingControllerInstance.handleMessage).not.toHaveBeenCalled();
    });
  });
});
