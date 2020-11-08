import { GetOwnPropertyDescriptors } from '../object-helpers/object-get-own-property-descriptors';
import { IsNotReservedPropertyName } from '../object-helpers/reserved-property-name';
import { TGenericFunction } from '../types/function-types';

/**
 * Structure which represents a method
 */
export interface IMethod {
  readonly propertyKey: PropertyKey,
  readonly descriptor: TypedPropertyDescriptor<TGenericFunction>;
}

/**
 * Extracts from a Trait or an Implementation the list of own methods
 */
export function ExtractTraitOrImplementationOwnMethods(target: any, errorPrefix: string): readonly IMethod[] {
  return Object.freeze(
    Array
      .from(GetOwnPropertyDescriptors(target))
      .filter(([propertyKey]) => IsNotReservedPropertyName(propertyKey))
      .map(([propertyKey, descriptor]) => {
        if (typeof descriptor.value === 'function') {
          return {
            propertyKey,
            descriptor,
          };
        } else {
          throw new TypeError(`${ errorPrefix }: for property '${ String(propertyKey) }' - only functions are accepted`);
        }
      }),
  );
}
