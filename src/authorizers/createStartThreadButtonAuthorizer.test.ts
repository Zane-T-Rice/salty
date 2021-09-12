import { Collection, Message, Role, Snowflake } from "discord.js";
import { CreateStartThreadButtonAuthorizer } from "./createStartThreadButtonAuthorizer";

describe("CreateStartThreadButtonAuthorizer", () => {
  const createStartThreadButtonAuthorizer = new CreateStartThreadButtonAuthorizer();

  describe("authorize", () => {
    it("should return true if member has ThreaderButtons role", () => {
      const message = {
        member: {
          roles: {
            cache: new Collection<Snowflake, Role>(),
          },
        },
      } as Message;
      message.member.roles.cache.set("ThreaderButtons", {
        name: "ThreaderButtons",
      } as Role);
      const result = createStartThreadButtonAuthorizer.authorize(undefined, message);
      expect(result).toBe(true);
    });

    it("should return false if member does not have the ThreaderButtons role", () => {
      const message = {
        member: {
          roles: {
            cache: new Collection<Snowflake, Role>(),
          },
        },
      } as Message;
      message.member.roles.cache.find = jest.fn().mockReturnValueOnce(undefined);
      const result = createStartThreadButtonAuthorizer.authorize(undefined, message);
      expect(result).toBe(false);
    });

    it("should handle undefined member", () => {
      const message = {} as Message;
      const result = createStartThreadButtonAuthorizer.authorize(undefined, message);
      expect(result).toBe(false);
    });

    it("should handle undefined roles", () => {
      const message = { member: {} } as Message;
      const result = createStartThreadButtonAuthorizer.authorize(undefined, message);
      expect(result).toBe(false);
    });
  });
});
