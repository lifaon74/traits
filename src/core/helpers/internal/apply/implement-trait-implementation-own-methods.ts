import { implementMethod } from './implement-method';
import { IImplementationDetails } from '../../../implementation/internal/implementations-map.constant';
import { IMethod } from '../types/method.type';

/**
 * Implements the own methods of an Implementation on 'target'
 */
export function implementTraitImplementationOwnMethods(
  target: any,
  traitImplementation: IImplementationDetails,
  implementedProperties: Set<PropertyKey>,
): void {
  const ownMethods: readonly IMethod[] = traitImplementation.ownMethods;
  for (let i = 0, l = ownMethods.length; i < l; i++) {
    implementMethod(
      target,
      ownMethods[i],
      implementedProperties,
    );
  }
}
