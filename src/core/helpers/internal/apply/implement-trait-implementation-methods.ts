import { IImplementationDetails } from '../../../implementation/internal/implementations-map.constant';
import { implementTrait } from './implement-trait';
import { implementTraitImplementationOwnMethods } from './implement-trait-implementation-own-methods';

/**
 * Implements the own methods of an Implementation on 'target', and its extended trait methods
 */
export function implementTraitImplementationMethods(
  target: any,
  traitImplementation: IImplementationDetails,
): void {
  const implementedProperties: Set<PropertyKey> = new Set<PropertyKey>();
  implementTraitImplementationOwnMethods(
    target,
    traitImplementation,
    implementedProperties,
  );

  implementTrait(
    target,
    traitImplementation.forTrait,
    implementedProperties
  );
}
