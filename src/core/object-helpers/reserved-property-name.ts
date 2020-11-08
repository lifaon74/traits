
/**
 * Used to filter some basis property keys when iterating over the keys of an object
 */

export const INTERNAL_PROPERTY_NAME = new Set<PropertyKey>([
  '__defineGetter__',
  '__defineSetter__',
  '__lookupGetter__',
  '__lookupSetter__',
  '__proto__',
]);


// list of property names that are common to every objects (should probably not be changed)
export const RESERVED_PROPERTY_NAMES = new Set<PropertyKey>([
  'prototype',
  'constructor',
]);

export function IsReservedPropertyName(name: PropertyKey): boolean {
  return RESERVED_PROPERTY_NAMES.has(name)
    || INTERNAL_PROPERTY_NAME.has(name);
}

export function IsNotReservedPropertyName(name: PropertyKey): boolean {
  return !IsReservedPropertyName(name);
}
