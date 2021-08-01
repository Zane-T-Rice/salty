import { Collection, Message, Role, Snowflake } from "discord.js";
import { StartThreadAuthorizer } from "./startThreadAuthorizer";

describe("StartThreadAuthorizer", () => {
  const startThreadAuthorizer = new StartThreadAuthorizer();

  describe("authorize", () => {
    it("should return true if member has Threader role", () => {
      const message = {
        member: {
          roles: new Collection<Snowflake, Role>(),
        },
      } as Message;
      message.member.roles.set("Threader", { name: "Threader" } as Role);
      const result = startThreadAuthorizer.authorize(undefined, message);
      expect(result).toBe(true);
    });

    it("should return false if member does not have the Threader role", () => {
      const message = {
        member: {
          roles: new Collection<Snowflake, Role>(),
        },
      } as Message;
      message.member.roles.find = jest.fn().mockReturnValueOnce(undefined);
      const result = startThreadAuthorizer.authorize(undefined, message);
      expect(result).toBe(false);
    });

    it("should handle undefined member", () => {
      const message = {} as Message;
      const result = startThreadAuthorizer.authorize(undefined, message);
      expect(result).toBe(false);
    });

    it("should handle undefined roles", () => {
      const message = { member: {} } as Message;
      const result = startThreadAuthorizer.authorize(undefined, message);
      expect(result).toBe(false);
    });
  });
});
