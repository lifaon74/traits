import { objectGetOwnPropertySymbols } from './object-get-own-property-symbols';
import { objectGetOwnPropertyNames } from './object-get-own-property-names';

/**
 * Returns the list of all own properties of an object (including non-enumerable and symbols)
 */
export function objectGetOwnPropertyKeys<GTarget>(target: GTarget): (keyof GTarget)[] {
  return (objectGetOwnPropertyNames(target) as (keyof GTarget)[])
    .concat(objectGetOwnPropertySymbols(target) as (keyof GTarget)[]);
}

