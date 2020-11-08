
/**
 * Used to filter some basis prototypes when iterating over the prototype chain of an object
 */

// common (but non exhaustive) list of prototypes that are native to js
export const PRIMITIVE_PROTOTYPES = new Set<any>(['', 0, {}, [], () => {}].map(_ => Object.getPrototypeOf(_)));

export function IsPrimitivePrototype(proto: any): boolean {
  return PRIMITIVE_PROTOTYPES.has(proto);
}

export function IsNotPrimitivePrototype(proto: any): boolean {
  return !IsPrimitivePrototype(proto);
}
