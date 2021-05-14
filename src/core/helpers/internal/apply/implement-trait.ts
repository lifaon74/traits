import { ITraitDetails } from '../../../trait/internal/traits-map.constant';
import { implementMethod } from './implement-method';
import { IMethod } from '../types/method.type';

/**
 * Implements a Trait on 'target':
 *  - reflects the trait's methods (including parents) on 'target'
 */
export function implementTrait(
  target: any,
  trait: ITraitDetails | undefined,
  implementedProperties: Set<PropertyKey>,
): void {
  while (trait !== void 0) {
    const ownMethods: readonly IMethod[] = trait.ownMethods;
    for (let i = 0, l = ownMethods.length; i < l; i++) {
      implementMethod(
        target,
        ownMethods[i],
        implementedProperties,
      );
    }
    trait = trait.parent;
  }
}
