import { MessageFlags } from "discord.js";
import { PingService } from "./pingService";
import { createInteraction } from "../testUtils";

describe("pingService", () => {
  describe("constructor", () => {
    it("should construct successfully", () => {
      const pingService = new PingService();
      expect(pingService).not.toBe(undefined);
    });
  });

  describe("handleInteraction", () => {
    it("should reply with pong", () => {
      const pingService = new PingService();
      const interaction = createInteraction({});
      pingService.handleInteraction(interaction);
      expect(interaction.reply).toHaveBeenCalledWith({ content: "pong", flags: MessageFlags.Ephemeral });
    });
  });
});
