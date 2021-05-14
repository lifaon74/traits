export function isObject<GObject extends object>(
  value: any,
): value is GObject {
  return (typeof value === 'object')
    && (value !== null);
}
