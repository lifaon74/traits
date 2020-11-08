

/**
 * Returns the list of all own string properties of an object (including non-enumerable)
 */
export function GetOwnPropertyNames<GTarget>(target: GTarget): Extract<keyof GTarget, string>[] {
  return Object.getOwnPropertyNames(target) as Extract<keyof GTarget, string>[];
}

