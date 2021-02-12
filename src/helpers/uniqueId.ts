const idCounter: { [prefix: string]: number } = {};

export default function uniqueId(prefix = 'id'): string {
  if (!idCounter[prefix]) {
    idCounter[prefix] = 0;
  }

  // eslint-disable-next-line no-plusplus
  const id = ++idCounter[prefix];
  if (prefix === 'id') {
    return `${id}`;
  }

  return `${prefix}${id}`;
}
