import { DiscordApis } from "./discordApis";
import axios from "axios";
jest.mock("axios");

class DiscordApisImpl extends DiscordApis {
  constructor() {
    super();
  }
}

describe("DiscordApis", () => {
  describe("post", () => {
    it("should call axios.post", async () => {
      const discordApis = new DiscordApisImpl();
      discordApis.post("/test", { test: "test" });
      expect(axios.post).toBeCalledWith(
        "https://discordapp.com/api/test",
        { test: "test" },
        { headers: { Authorization: "Bot undefined" } }
      );
    });
  });
  describe("get", () => {
    it("should call axios.get", async () => {
      jest.spyOn(axios, "get").mockResolvedValue({ data: [] });
      const discordApis = new DiscordApisImpl();
      discordApis.get("/test");
      expect(axios.get).toBeCalledWith("https://discordapp.com/api/test", {
        headers: { Authorization: "Bot undefined" },
      });
    });
  });
});