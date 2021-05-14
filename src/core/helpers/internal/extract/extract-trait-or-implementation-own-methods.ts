import { isNotReservedPropertyName, objectFreeze, objectGetOwnPropertyDescriptorsIterator } from '../../../../misc';
import { IMethod } from '../types/method.type';


/**
 * Extracts from a Trait or an Implementation the list of own methods
 */
export function extractTraitOrImplementationOwnMethods(
  target: any,
  errorPrefix: string,
): readonly IMethod[] {
  return objectFreeze(
    Array
      .from(objectGetOwnPropertyDescriptorsIterator(target))
      .filter(([propertyKey]: [PropertyKey, PropertyDescriptor, any]): boolean => isNotReservedPropertyName(propertyKey))
      .map(([propertyKey, descriptor]: [PropertyKey, PropertyDescriptor, any]): IMethod => {
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
