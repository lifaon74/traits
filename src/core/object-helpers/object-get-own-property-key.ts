
import { GetOwnPropertySymbol } from './object-get-own-property-symbols';
import { GetOwnPropertyNames } from './object-get-own-property-names';

/**
 * Returns the list of all own properties of an object (including non-enumerable and symbols)
 */
export function GetOwnPropertyKeys<GTarget>(target: GTarget): (keyof GTarget)[] {
  return (GetOwnPropertyNames(target) as (keyof GTarget)[])
    .concat(GetOwnPropertySymbol(target) as (keyof GTarget)[]);
}

