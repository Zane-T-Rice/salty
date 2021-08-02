import {
  ButtonInteraction,
  Collection,
  GuildMemberRoleManager,
  Role,
  Snowflake,
} from "discord.js";
import { ArchiveThreadButtonInteractionAuthorizer } from "./archiveThreadButtonInteractionAuthorizer";

describe("ArchiveThreadButtonAuthorizer", () => {
  const archiveThreadButtonInteractionAuthorizer =
    new ArchiveThreadButtonInteractionAuthorizer();

  describe("authorize", () => {
    it("should return true if member has Threader role", () => {
      const buttonInteraction = {
        member: {
          roles: {
            cache: new Collection<Snowflake, Role>(),
          },
        },
      } as ButtonInteraction;
      (buttonInteraction.member.roles as GuildMemberRoleManager).cache.set(
        "Threader",
        { name: "Threader" } as Role
      );
      const result =
        archiveThreadButtonInteractionAuthorizer.authorize(buttonInteraction);
      expect(result).toBe(true);
    });

    it("should return false if member does not have the Threader role", () => {
      const buttonInteraction = {
        member: {
          roles: {
            cache: new Collection<Snowflake, Role>(),
          },
        },
      } as ButtonInteraction;
      const result =
        archiveThreadButtonInteractionAuthorizer.authorize(buttonInteraction);
      expect(result).toBe(false);
    });

    it("should handle undefined member", () => {
      const buttonInteraction = {} as ButtonInteraction;
      const result =
        archiveThreadButtonInteractionAuthorizer.authorize(buttonInteraction);
      expect(result).toBe(false);
    });

    it("should handle undefined roles", () => {
      const buttonInteraction = { member: {} } as ButtonInteraction;
      const result =
        archiveThreadButtonInteractionAuthorizer.authorize(buttonInteraction);
      expect(result).toBe(false);
    });
  });
});
