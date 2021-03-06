import axios from "axios";
import { DiscordApis } from "./discordApis";
jest.mock("axios");

class DiscordApisImpl extends DiscordApis {
  constructor() {
    super();
  }
}

describe("DiscordApis", () => {
  describe("post", () => {
    it("should call axios.post", async () => {
      jest.spyOn(axios, "post").mockResolvedValue({ data: {} });
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
      jest.spyOn(axios, "get").mockResolvedValue({ data: {} });
      const discordApis = new DiscordApisImpl();
      discordApis.get("/test");
      expect(axios.get).toBeCalledWith("https://discordapp.com/api/test", {
        headers: { Authorization: "Bot undefined" },
      });
    });
  });
  describe("gets", () => {
    it("should call axios.get", async () => {
      jest.spyOn(axios, "get").mockResolvedValue({ data: [] });
      const discordApis = new DiscordApisImpl();
      discordApis.gets("/test");
      expect(axios.get).toBeCalledWith("https://discordapp.com/api/test", {
        headers: { Authorization: "Bot undefined" },
      });
    });
  });
  describe("put", () => {
    it("should call axios.put", async () => {
      jest.spyOn(axios, "put").mockResolvedValue({ data: {} });
      const discordApis = new DiscordApisImpl();
      discordApis.put("/test", { test: "test" });
      expect(axios.put).toBeCalledWith(
        "https://discordapp.com/api/test",
        { test: "test" },
        { headers: { Authorization: "Bot undefined" } }
      );
    });
  });
  describe("patch", () => {
    it("should call axios.patch", async () => {
      jest.spyOn(axios, "patch").mockResolvedValue({ data: {} });
      const discordApis = new DiscordApisImpl();
      discordApis.patch("/test", { test: "test" });
      expect(axios.put).toBeCalledWith(
        "https://discordapp.com/api/test",
        { test: "test" },
        { headers: { Authorization: "Bot undefined" } }
      );
    });
  });
});
