export function isCustomEmoji(text: string): boolean {
  return /<:.*:[0-9]+>/.test(text);
}

export function parseCustomEmojiId(text: string): string {
  return text.substring(text.lastIndexOf(":") + 1, text.lastIndexOf(">"));
}
