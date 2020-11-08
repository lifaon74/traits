/**
 * Creates an object from 'obj' without any prototype
 */
export function CreatePureObject<GObject>(obj: GObject): GObject {
  return Object.assign(Object.create(null), obj);
}
