import { GetOwnPropertyDescriptor } from '../object-helpers/object-get-own-property-descriptor';
import { TGenericFunction } from '../types/function-types';

/**
 * Creates a method from a decorator instead of a standard class method.
 * May be useful when we need to type a method like a property
 * INFO: DECORATOR
 */
export function PropertyMethod<GFunction extends TGenericFunction>(method: GFunction): PropertyDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor | undefined = GetOwnPropertyDescriptor(target, propertyKey)
  ): TypedPropertyDescriptor<GFunction> => {
    if (descriptor === void 0) {
      return {
        configurable: true,
        writable: false, // true on normal methods
        enumerable: false,
        value: method,
      };
    } else {
      throw new TypeError(`@PropertyMethod: the property '${ String(propertyKey) }' should not be defined.`);
    }
  };
}
