import * as child_process from "child_process";
import * as dotenv from "dotenv";
import { ServersCacheService } from "./serversCacheService";
jest.mock("child_process");
jest.mock("node:fs");

const accessTokenObject = { access_token: "token" };

describe("ServersCacheService", () => {
  const servers = [
    {
      id: "0192d295-ac96-73a3-a58c-275aab322238",
      applicationName: "valheim",
      containerName: "valheim_container",
      createdAt: "2024-10-27T09:14:01.900Z",
      updatedAt: "2024-10-27T09:14:01.900Z",
    },
    {
      id: "0192d295-b022-708d-968a-68c794fc5f2e",
      applicationName: "valheim2",
      containerName: "valheim2_container",
      createdAt: "2024-10-27T09:14:51.134Z",
      updatedAt: "2024-10-27T09:14:51.134Z",
    },
  ];
  const expectedResult = servers;

  beforeAll(() => {
    dotenv.config();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("constructor", () => {
    it("should construct successfully", () => {
      const serversCacheService = new ServersCacheService();
      expect(serversCacheService).not.toBe(undefined);
    });
  });

  describe("handleAutocomplete", () => {
    it("Should suggest possible existing server names", async () => {
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(accessTokenObject) });
      });
      (child_process.exec as unknown as jest.Mock).mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(servers) });
      });

      const serversCacheService = new ServersCacheService();
      const responseServers = await serversCacheService.getServers();

      expect(responseServers).toEqual(expectedResult);
    });
  });

  it("Should use cached servers when available", async () => {
    (child_process.exec as unknown as jest.Mock)
      // First time getting servers
      .mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(accessTokenObject) });
      })
      .mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(servers) });
      })
      // Fail test if more calls are made.
      .mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(new Error()) }); // This should not happen in this test.
      });

    // This will populate the serversCache
    const serversCacheService = new ServersCacheService();
    let responseServers = await serversCacheService.getServers();

    // This will use the serversCache
    responseServers = await serversCacheService.getServers();

    expect(responseServers).toEqual(expectedResult);

    // Invalidate the serversCache
    serversCacheService.serversCache.createdAt = Date.now() - 10_000;

    // This will repopulate the serversCache
    responseServers = await serversCacheService.getServers();

    expect(responseServers).toEqual(expectedResult);

    // Twice the interaction does not use the cache, once the interaction does use the cache.
    expect(child_process.exec as unknown as jest.Mock).toHaveBeenCalledTimes(2);
  });

  it("Should handle errors when getting servers", async () => {
    (child_process.exec as unknown as jest.Mock)
      .mockImplementationOnce((_, callback) => {
        callback(null, { stdout: JSON.stringify(accessTokenObject) });
      })
      .mockImplementation((_, callback) => {
        callback(null, {
          stdout: JSON.stringify({
            name: "NotFoundError",
            message: `The server with id ${expectedResult[0].id} was not found.`,
          }),
        });
      });

    const serversCacheService = new ServersCacheService();
    await expect(async () => await serversCacheService.getServers()).rejects.toThrow();
  });
});
