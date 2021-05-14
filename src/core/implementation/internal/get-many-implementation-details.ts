import { IImplementationDetails } from './implementations-map.constant';
import { getImplementationDetailsOrThrow } from './get-implementation-details-or-throw';
import { IConstructor } from '../../../types/class/class-constructor.type';

export function getManyImplementationDetails(
  traitImplementations: IImplementationsCollection,
): IImplementationDetails[] {
  return traitImplementations
    .map((traitImplementation: IConstructor): IImplementationDetails => {
      return getImplementationDetailsOrThrow(traitImplementation);
    });
}


export type IImplementationsCollection = readonly IConstructor[];

