

/**
 * Returns the list of all own symbol properties of an object (including non-enumerable)
 */
export function GetOwnPropertySymbol<GTarget>(target: GTarget): Extract<keyof GTarget, symbol>[] {
  return Object.getOwnPropertySymbols(target) as Extract<keyof GTarget, symbol>[];
}

