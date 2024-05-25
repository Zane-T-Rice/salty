import { CacheType, ChatInputCommandInteraction } from "discord.js";

export const createInteraction = (
  options: { [key: string]: string },
  overrides?: { [key: string]: string }
): ChatInputCommandInteraction<CacheType> => {
  return {
    deferReply: jest.fn(),
    editReply: jest.fn(),
    options: {
      getString: (arg: string) => {
        return options[arg];
      },
    },
    reply: jest.fn(),
    ...overrides,
  } as unknown as ChatInputCommandInteraction<CacheType>;
};
