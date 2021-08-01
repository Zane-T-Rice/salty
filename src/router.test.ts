import { PingController, StartThreadController } from "./controllers";
import { Message } from "discord.js";
import { routeMessage } from "./router";
import * as utils from "./utils";

jest.mock("./utils");
jest.mock("./controllers");
const pingControllerInstance = (PingController as any).mock.instances[0];
const startThreadControllerInstance = (StartThreadController as any).mock
  .instances[0];

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

    it("should route messages beginning with mentions as !t command", async () => {
      jest.spyOn(utils, "isMention").mockReturnValueOnce(true);
      const content = "";
      await routeMessage({ content } as Message);

      expect(startThreadControllerInstance.handleMessage).toHaveBeenCalledWith(
        ["!t", content],
        { content }
      );
    });
  });
});
