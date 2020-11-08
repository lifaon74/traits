import { GetOwnPropertyDescriptor } from '../../object-helpers/object-get-own-property-descriptor';
import { CreateAbstractMethod } from './create-abstract-method';

/**
 * Creates an abstract method
 * INFO: DECORATOR
 */
export function AbstractMethod(): PropertyDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor | undefined = GetOwnPropertyDescriptor(target, propertyKey)
  ): void | PropertyDescriptor => {

    if (descriptor === void 0) {
      return {
        configurable: false,
        writable: false,
        value: CreateAbstractMethod(propertyKey),
      };
    } else {
      throw new TypeError(`@AbstractMethod: the property '${ String(propertyKey) }' should not be defined.`);
    }
  };
}
