export const commands = new Map();

export function registerCommand(cmd, fn) {
  commands.set(cmd, fn);
}
