import { AutocompleteInteraction } from "discord.js";

export const createAutocompleteInteraction = (overrides?: { [key: string]: string }): AutocompleteInteraction => {
  return {
    options: {
      getFocused: jest.fn(),
    },
    respond: jest.fn(),
    ...overrides,
  } as unknown as AutocompleteInteraction;
};
