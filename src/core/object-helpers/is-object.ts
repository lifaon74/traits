/**
 * Returns true if 'input' is an object
 */
export function IsObject<GObject extends object = object>(
  input: any,
): input is GObject {
  return (input !== null)
    && (typeof input === 'object');
}
