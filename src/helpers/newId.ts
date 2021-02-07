let lastId = 0;

export default function newId(prefix?: string): string {
  // eslint-disable-next-line no-plusplus
  lastId++;
  return `${prefix || ''}${lastId}`;
}
