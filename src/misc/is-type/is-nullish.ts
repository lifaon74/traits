export type INullish = null | undefined;

export function isNullish(
  value: any,
): value is INullish {
  return (value === null)
    || (value === void 0);
}
