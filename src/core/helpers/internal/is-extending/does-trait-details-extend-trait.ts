import { ITraitDetails } from '../../../trait/internal/traits-map.constant';
import { IAbstractConstructor } from '../../../../types/class/abstract-class-constructor.type';

/**
 * Returns true if 'traitDetails' is or extends 'trait'
 */
export function doesTraitDetailsExtendTrait(
  traitDetails: ITraitDetails | undefined,
  trait: IAbstractConstructor,
): boolean {
  while (traitDetails !== void 0) {
    if (traitDetails.trait === trait) {
      return true;
    }
    traitDetails = traitDetails.parent;
  }
  return false;
}


