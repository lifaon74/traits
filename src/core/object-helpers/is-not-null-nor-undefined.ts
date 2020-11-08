
export type AnyExceptNullOrUndefined = string | number | boolean | symbol | bigint | object | any;

/**
 * Returns true if 'input' is not null nor undefined
 */
export function IsNotNullNorUndefined(
  input: any,
): input is AnyExceptNullOrUndefined {
  return (input !== null)
    &&  (input !== void 0);
}
