import { IImplementationDetails } from '../../../implementation/internal/implementations-map.constant';
import { IAbstractConstructor } from '../../../../types/class/abstract-class-constructor.type';
import { doesTraitDetailsExtendTrait } from './does-trait-details-extend-trait';

/**
 * Returns true if 'traitImplementationDetails' extends 'trait'
 */
export function doesImplementationDetailsExtendTrait(
  traitImplementationDetails: IImplementationDetails,
  trait: IAbstractConstructor,
): boolean {
  return doesTraitDetailsExtendTrait(traitImplementationDetails.forTrait, trait);
}
