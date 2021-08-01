import { isMention } from "./isMention";

describe("isMention", () => {
  it("should return true if text is a mention", async () => {
    expect(isMention("<@01234>")).toBe(true);
    expect(isMention("<@!01234>")).toBe(true);
  });

  it("should return false if text is not mention", async () => {
    expect(isMention("")).toBe(false);
    expect(isMention("<@012a>")).toBe(false);
    expect(isMention("<@!0a12>")).toBe(false);
  });
});
