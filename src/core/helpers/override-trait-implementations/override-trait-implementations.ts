import {
  getManyImplementationDetails, IImplementationsCollection
} from '../../implementation/internal/get-many-implementation-details';
import { IImplementationDetails } from '../../implementation/internal/implementations-map.constant';
import { IConstructor } from '../../../types/class/class-constructor.type';
import { getImplementationDetailsOrThrow } from '../../implementation/internal/get-implementation-details-or-throw';
import { doesImplementationDetailsExtendTrait } from '../internal/is-extending/does-implementation-details-extend-trait';

/**
 * Removes from 'traitImplementations' (without modifying the original array) all implementations overridden (sharing similar traits) by 'newTraitImplementations'
 * and appends (concat) 'newTraitImplementations'
 * This is useful, if you want to create a class which implements some Implementations from another, and override some of them.
 */
export function overrideTraitImplementations(
  traitImplementations: IImplementationsCollection,
  newTraitImplementations: IImplementationsCollection,
): IImplementationsCollection {
  // list all new implementation details
  const newTraitImplementationsDetails: IImplementationDetails[] = getManyImplementationDetails(newTraitImplementations);
  return traitImplementations
    .filter((traitImplementation: IConstructor) => { // for each old implementations, remove ones already present in newTraitImplementationsDetails
      const traitImplementationDetails: IImplementationDetails = getImplementationDetailsOrThrow(traitImplementation);
      return newTraitImplementationsDetails
        .every((newTraitImplementationDetails: IImplementationDetails) => {
          return !doesImplementationDetailsExtendTrait(traitImplementationDetails, newTraitImplementationDetails.forTrait.trait);
        });
    })
    .concat(newTraitImplementations);
}
