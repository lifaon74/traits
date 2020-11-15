import { IImplementationDetails } from './implementation-decorator';
import { TAbstractClass } from '../types/class-types';
import { ITraitDetails } from './trait-decorator';

/**
 * Returns true if 'traitDetails' is or extends 'trait'
 */
function TraitDetailsExtendsTrait(
  traitDetails: ITraitDetails | undefined,
  trait: TAbstractClass,
): boolean {
  while (traitDetails !== void 0) {
    if (traitDetails.trait === trait) {
      return true;
    }
    traitDetails = traitDetails.parent;
  }
  return false;
}

/**
 * Returns true if 'traitImplementationDetails' extends 'trait'
 */
export function ImplementationDetailsExtendsTrait(
  traitImplementationDetails: IImplementationDetails,
  trait: TAbstractClass,
): boolean {
  return TraitDetailsExtendsTrait(traitImplementationDetails.forTrait, trait);
}
