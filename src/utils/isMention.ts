export function isMention(text: string): boolean {
  return /<@!?[0-9]+>/.test(text);
}
